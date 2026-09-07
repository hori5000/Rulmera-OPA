$ErrorActionPreference = "Continue"

Write-Host "===== WINDOWS ====="
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber

Write-Host "`n===== NVIDIA ====="
nvidia-smi

Write-Host "`n===== WSL ====="
wsl --version
wsl -l -v

Write-Host "`n===== DOCKER ====="
docker --version
docker compose version
