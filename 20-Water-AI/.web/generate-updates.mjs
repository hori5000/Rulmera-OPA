#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

function arg(name, def = null) {
  const i = process.argv.indexOf(name)
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : def
}

const sourceRoot = path.resolve(arg("--source", "."))
const destFile = path.resolve(arg("--dest", "./static/project-updates.json"))
const stateFile = path.resolve(arg("--state", path.join(sourceRoot, ".web", "update-state.json")))
const maxChanges = Math.max(1, Number(arg("--max", "12")) || 12)

const EXCLUDED_DIRS = new Set([
  ".git", ".web", ".web-public", ".obsidian", "node_modules", "_IMPORT", "_publish",
  "__pycache__", ".pytest_cache", ".mypy_cache", ".trash", "cache", "90-템플릿", "10-받은자료",
])

function walk(dir, rel = "") {
  const out = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory() && EXCLUDED_DIRS.has(ent.name)) continue
    const abs = path.join(dir, ent.name)
    const childRel = rel ? path.join(rel, ent.name) : ent.name
    if (ent.isDirectory()) out.push(...walk(abs, childRel))
    else if (ent.isFile() && ent.name.toLowerCase().endsWith(".md")) {
      out.push({ abs, rel: childRel.replaceAll("\\", "/") })
    }
  }
  return out
}

function parseFrontmatter(text) {
  const normalized = String(text ?? "").replace(/^\uFEFF/, "")
  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n")) return {}
  const lines = normalized.split(/\r?\n/)
  let end = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") { end = i; break }
  }
  if (end < 0) return {}
  const data = {}
  for (let i = 1; i < end; i++) {
    const m = lines[i].match(/^([A-Za-z0-9가-힣_.-]+):\s*(.*)$/)
    if (!m) continue
    let v = m[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
    if (v === "true") v = true
    else if (v === "false") v = false
    data[m[1]] = v
  }
  return data
}

function titleOf(text, fm, rel) {
  if (fm.title) return String(fm.title).trim()
  const body = String(text).replace(/^\uFEFF/, "")
  const m = body.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : path.basename(rel, ".md")
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex")
}

function hrefFor(rel) {
  return "/" + rel.replace(/\.md$/i, "")
}

function categoryFor(rel) {
  if (rel.startsWith("중랑/")) return "중랑"
  if (rel.startsWith("광암/")) return "광암"
  if (rel.startsWith("명장/")) return "명장"
  if (rel.startsWith("용인/")) return "용인"
  if (rel.startsWith("00-프로젝트관리/WBS/")) return "WBS"
  if (rel.startsWith("00-프로젝트관리/")) return "프로젝트관리"
  if (rel.startsWith("00-공통/")) return "공통"
  return rel.split("/")[0] || "기타"
}

function readPreviousState() {
  try {
    const x = JSON.parse(fs.readFileSync(stateFile, "utf8"))
    return x && x.files && typeof x.files === "object" ? x : null
  } catch {
    return null
  }
}

function parseRecentFromStatus(fileMap) {
  const statusPath = path.join(sourceRoot, "00-프로젝트관리", "00-고객-진행현황.md")
  if (!fs.existsSync(statusPath)) return []
  const txt = fs.readFileSync(statusPath, "utf8")
  const rows = []
  const re = /^\|\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})\s*\|\s*([^|]+?)\s*\|\s*$/gm
  let m
  while ((m = re.exec(txt))) {
    const rel = m[2].trim().replaceAll("\\", "/")
    if (!rel.toLowerCase().endsWith(".md")) continue
    const item = fileMap[rel]
    if (!item) continue
    rows.push({ rel, when: m[1] })
  }
  return rows
}

const files = {}
for (const f of walk(sourceRoot)) {
  const raw = fs.readFileSync(f.abs)
  const text = raw.toString("utf8")
  const fm = parseFrontmatter(text)
  if (fm.web_exclude === true || fm.auto_generated === true) continue
  const stat = fs.statSync(f.abs)
  files[f.rel] = {
    hash: sha256(raw),
    title: titleOf(text, fm, f.rel),
    mtime: stat.mtime.toISOString(),
    category: categoryFor(f.rel),
    href: hrefFor(f.rel),
    summary: fm.change_summary ? String(fm.change_summary) : "",
  }
}

const fingerprint = sha256(Buffer.from(
  Object.keys(files).sort().map(k => `${k}\0${files[k].hash}`).join("\n"), "utf8"
))
const version = `rev-${fingerprint.slice(0, 12)}`
const previous = readPreviousState()
let changes = []
let initial = false

if (previous) {
  const prevFiles = previous.files || {}
  for (const rel of Object.keys(files)) {
    if (!prevFiles[rel]) {
      changes.push({ type: "added", rel, ...files[rel] })
    } else if (prevFiles[rel].hash !== files[rel].hash) {
      changes.push({ type: "modified", rel, ...files[rel] })
    }
  }
  for (const rel of Object.keys(prevFiles)) {
    if (!files[rel]) {
      changes.push({
        type: "deleted",
        rel,
        hash: prevFiles[rel].hash || "",
        title: prevFiles[rel].title || path.basename(rel, ".md"),
        mtime: new Date().toISOString(),
        category: prevFiles[rel].category || categoryFor(rel),
        href: "",
        summary: "",
      })
    }
  }
} else {
  initial = true
  const recent = parseRecentFromStatus(files)
  if (recent.length) {
    changes = recent.map(x => ({ type: "current", rel: x.rel, ...files[x.rel], display_time: x.when }))
  } else {
    changes = Object.entries(files)
      .sort((a, b) => String(b[1].mtime).localeCompare(String(a[1].mtime)))
      .slice(0, maxChanges)
      .map(([rel, meta]) => ({ type: "current", rel, ...meta }))
  }
}

changes.sort((a, b) => String(b.display_time || b.mtime || "").localeCompare(String(a.display_time || a.mtime || "")))
changes = changes.slice(0, maxChanges).map(c => ({
  type: c.type,
  category: c.category,
  title: c.title,
  summary: c.summary || (c.type === "added" ? "새 문서가 추가되었습니다." : c.type === "deleted" ? "공개 문서에서 삭제되었습니다." : c.type === "current" ? "최근 갱신된 문서입니다." : "문서 내용이 수정되었습니다."),
  path: c.rel,
  href: c.href,
  changed_at: c.display_time || String(c.mtime || "").replace("T", " ").slice(0, 16),
}))

const counts = { added: 0, modified: 0, deleted: 0, current: 0 }
for (const c of changes) counts[c.type] = (counts[c.type] || 0) + 1

const output = {
  schema: 1,
  project: "water-ai",
  title: "Water-AI 프로젝트 변경사항",
  version,
  generated_at: new Date().toISOString(),
  initial,
  counts,
  total_changes: changes.length,
  changes,
  history_url: "/00-프로젝트관리/00-고객-진행현황",
  note: "브라우저별로 확인한 버전을 localStorage에 저장합니다.",
}

fs.mkdirSync(path.dirname(destFile), { recursive: true })
fs.writeFileSync(destFile, JSON.stringify(output, null, 2), "utf8")

const state = {
  schema: 1,
  project: "water-ai",
  version,
  generated_at: output.generated_at,
  fingerprint,
  files,
}
fs.mkdirSync(path.dirname(stateFile), { recursive: true })
fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8")

console.log(JSON.stringify({
  version,
  initial,
  changes: changes.length,
  added: counts.added,
  modified: counts.modified,
  deleted: counts.deleted,
  current: counts.current,
  destFile,
  stateFile,
}, null, 2))
