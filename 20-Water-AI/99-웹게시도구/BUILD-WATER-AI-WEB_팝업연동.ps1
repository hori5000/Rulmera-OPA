param(
    [switch]$PreviewAll
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Need([string]$cmd) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        throw "'$cmd' 명령이 필요합니다."
    }
}
foreach ($cmd in @("git","node","npm","npx")) { Need $cmd }

$nodeVer = (& node -p "process.versions.node").Trim()
$nodeMajor = [int]($nodeVer.Split('.')[0])
if ($nodeMajor -lt 22) {
    throw "Node.js 22 이상이 필요합니다. 현재: $nodeVer"
}

# Rulmera-OPA 바로 위에서 실행
$Base   = (Get-Location).Path
$Vault  = Join-Path $Base "Rulmera-OPA"
$Water  = Join-Path $Vault "20-Water-AI"
$Web    = Join-Path $Water ".web"

# Quartz 작업영역은 Vault 밖
$Local  = Join-Path $Base ".Water-AI-Web-Local"
$Quartz = Join-Path $Local "quartz"

# 완성된 정적 웹은 Water-AI 하위
$Public = Join-Path $Water ".web-public"

$Commit = "d25a6eabf96751ffca56f8a8139272def7a65041"
$Repo   = "https://github.com/jackyzha0/quartz.git"

if (-not (Test-Path -LiteralPath $Water -PathType Container)) {
    throw "현재 위치 바로 아래에 Rulmera-OPA\20-Water-AI가 없습니다.`n현재 위치: $Base"
}
if (-not (Test-Path -LiteralPath $Web -PathType Container)) {
    throw "Rulmera-OPA\20-Water-AI\.web가 없습니다. 먼저 INSTALL-WATER-AI-WEB.ps1을 실행하십시오."
}

if (-not (Test-Path (Join-Path $Quartz ".git"))) {
    New-Item -ItemType Directory -Force -Path $Quartz | Out-Null
    git -C $Quartz init -q
    git -C $Quartz remote add origin $Repo
    git -C $Quartz fetch --depth 1 origin $Commit
    git -C $Quartz checkout -q --detach FETCH_HEAD
}

$current = (git -C $Quartz rev-parse HEAD).Trim()
if ($current -ne $Commit) {
    Remove-Item $Quartz -Recurse -Force
    New-Item -ItemType Directory -Force -Path $Quartz | Out-Null
    git -C $Quartz init -q
    git -C $Quartz remote add origin $Repo
    git -C $Quartz fetch --depth 1 origin $Commit
    git -C $Quartz checkout -q --detach FETCH_HEAD
}

if (-not (Test-Path (Join-Path $Quartz "node_modules"))) {
    Push-Location $Quartz
    try { npm ci --no-audit --no-fund }
    finally { Pop-Location }
}

Copy-Item `
    -LiteralPath (Join-Path $Web "quartz.config.ts") `
    -Destination (Join-Path $Quartz "quartz.config.ts") `
    -Force

$mode = if ($PreviewAll) { "preview" } else { "production" }

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " WATER-AI STATIC WEB BUILD" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Source : $Water"
Write-Host "Mode   : $mode"
Write-Host "Output : $Public"

& node (Join-Path $Web "export.mjs") `
    --source $Water `
    --dest (Join-Path $Quartz "content") `
    --mode $mode

if ($LASTEXITCODE -ne 0) { throw "Water-AI Markdown export 실패" }

Push-Location $Quartz
try {
    npx quartz build
    if ($LASTEXITCODE -ne 0) { throw "Quartz build 실패" }
}
finally {
    Pop-Location
}

# 기존 결과를 새 결과로 완전 교체
if (Test-Path $Public) {
    Remove-Item $Public -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $Public | Out-Null

Get-ChildItem -LiteralPath (Join-Path $Quartz "public") -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $Public -Recurse -Force
}

if (-not (Test-Path (Join-Path $Public "index.html"))) {
    throw "정적 웹 생성 후 index.html을 찾지 못했습니다: $Public"
}

# 고객 변경사항 팝업 Feed 생성 + UI 주입
$UpdateFeed = Join-Path $Public "static\project-updates.json"
& node (Join-Path $Web "generate-updates.mjs") `
    --source $Water `
    --dest $UpdateFeed `
    --state (Join-Path $Web "update-state.json") `
    --release (Join-Path $Web "release-update.json")
if ($LASTEXITCODE -ne 0) { throw "Water-AI 변경사항 Feed 생성 실패" }

$PostScript = Join-Path $Public "postscript.js"
$UpdateJs   = Join-Path $Web "rulmera-updates.js"
if ((Test-Path $PostScript) -and (Test-Path $UpdateJs)) {
    Add-Content -LiteralPath $PostScript -Value "`r`n" -Encoding UTF8
    Get-Content -LiteralPath $UpdateJs -Raw | Add-Content -LiteralPath $PostScript -Encoding UTF8
}
else {
    throw "변경사항 팝업 JS 주입 파일을 찾지 못했습니다."
}

$marker = @"
generated_by: BUILD-WATER-AI-WEB.ps1
source: Rulmera-OPA/20-Water-AI
mode: $mode
generated_at: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
publish_flow: local-build -> PUBLISH-RULMERA-OPA.ps1 -> GitHub Water-AI -> Cloudflare Pages
"@
Set-Content `
    -LiteralPath (Join-Path $Public ".rulmera-static-site") `
    -Value $marker `
    -Encoding UTF8

Write-Host ""
Write-Host "[OK] 정적 웹 생성 완료" -ForegroundColor Green
Write-Host "     $Public" -ForegroundColor Green
Write-Host ""
Write-Host "다음:" -ForegroundColor Yellow
Write-Host "  .\PUBLISH-RULMERA-OPA.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host ".web-public도 Water-AI Git에 같이 올라갑니다." -ForegroundColor Green
