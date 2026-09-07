#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

function arg(name, def = null) {
  const i = process.argv.indexOf(name)
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : def
}

const sourceRoot = path.resolve(arg("--source", "."))
const destRoot = path.resolve(arg("--dest", "./content"))
const mode = arg("--mode", "production")
const previewAll = mode === "preview"

const EXCLUDED_DIRS = new Set([
  ".git", ".web", ".obsidian", "node_modules", "_IMPORT", "_publish",
  "__pycache__", ".pytest_cache", ".mypy_cache", ".trash", "cache",
])

const BLOCKED_EXT = new Set([
  ".xlsx", ".xls", ".docx", ".pptx", ".pdf", ".zip", ".7z", ".rar",
  ".hwp", ".hwpx", ".csv", ".db", ".sqlite", ".sqlite3",
  ".xgwx", ".dbx", ".dvx", ".scx", ".mmd",
])

function walk(dir, rel = "") {
  const result = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name)
    const childRel = rel ? path.join(rel, ent.name) : ent.name
    if (ent.isDirectory()) {
      if (EXCLUDED_DIRS.has(ent.name)) continue
      result.push(...walk(abs, childRel))
    } else if (ent.isFile()) {
      result.push({ abs, rel: childRel.replaceAll("\\", "/") })
    }
  }
  return result
}

function parseScalar(v) {
  const s = String(v ?? "").trim()
  if (!s) return ""
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.slice(1, -1)
  }
  if (s === "true") return true
  if (s === "false") return false
  if (s === "null" || s === "~") return null
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s)
  if (s.startsWith("[") && s.endsWith("]")) {
    const body = s.slice(1, -1).trim()
    if (!body) return []
    return body.split(",").map(x => parseScalar(x))
  }
  return s
}

function parseFrontmatter(text) {
  const normalized = text.replace(/^\uFEFF/, "")
  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n")) {
    return { data: {}, body: normalized, raw: "" }
  }
  const lines = normalized.split(/\r?\n/)
  let end = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      end = i
      break
    }
  }
  if (end < 0) return { data: {}, body: normalized, raw: "" }

  const data = {}
  let currentKey = null
  for (let i = 1; i < end; i++) {
    const line = lines[i]
    if (!line.trim() || line.trim().startsWith("#")) continue

    const top = line.match(/^([A-Za-z0-9가-힣_.-]+):\s*(.*)$/)
    if (top) {
      currentKey = top[1]
      const val = top[2]
      data[currentKey] = val === "" ? [] : parseScalar(val)
      continue
    }

    const listItem = line.match(/^\s*-\s*(.*)$/)
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [data[currentKey]].filter(Boolean)
      data[currentKey].push(parseScalar(listItem[1]))
    }
  }

  return {
    data,
    body: lines.slice(end + 1).join("\n"),
    raw: lines.slice(0, end + 1).join("\n"),
  }
}

function titleOf(doc) {
  if (doc.fm.title) return String(doc.fm.title)
  const m = doc.body.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : path.basename(doc.rel, ".md")
}

function normalizePath(p) {
  return p.replaceAll("\\", "/").replace(/^\/+/, "")
}

function relWithoutExt(rel) {
  return normalizePath(rel).replace(/\.md$/i, "")
}

function naturalParts(s) {
  return String(s).split(/(\d+)/).map(x => /^\d+$/.test(x) ? Number(x) : x.toLowerCase())
}
function naturalCompare(a, b) {
  const aa = naturalParts(a), bb = naturalParts(b)
  const n = Math.max(aa.length, bb.length)
  for (let i = 0; i < n; i++) {
    if (aa[i] === undefined) return -1
    if (bb[i] === undefined) return 1
    if (aa[i] === bb[i]) continue
    if (typeof aa[i] === "number" && typeof bb[i] === "number") return aa[i] - bb[i]
    return String(aa[i]).localeCompare(String(bb[i]), "ko")
  }
  return 0
}

function mdCell(v) {
  if (v === undefined || v === null) return ""
  if (Array.isArray(v)) return v.map(mdCell).join("<br>")
  return String(v).replaceAll("|", "\\|").replace(/\r?\n/g, "<br>")
}

function mdTable(headers, rows) {
  const h = `| ${headers.map(mdCell).join(" | ")} |`
  const s = `| ${headers.map(() => "---").join(" | ")} |`
  const body = rows.map(r => `| ${r.map(mdCell).join(" | ")} |`).join("\n")
  return [h, s, body].filter(Boolean).join("\n")
}

function wbsLink(w) {
  const title = w.fm.title || path.basename(w.rel, ".md")
  return `[[${relWithoutExt(w.rel)}|${title}]]`
}

function statusFlag(status) {
  if (status === "done") return "done, "
  if (status === "in-progress") return "active, "
  if (status === "blocked") return "crit, "
  return ""
}

function cleanMermaid(s) {
  return String(s ?? "").replace(/[,:#;]/g, " ").replace(/\s+/g, " ").trim()
}

function gantt(wbs, title = "Water-AI WBS 일정") {
  const items = wbs.filter(w => w.fm.start && w.fm.end)
  const groups = new Map()
  for (const w of items) {
    const key = String(w.fm.domain || "공통")
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(w)
  }
  const lines = [
    "```mermaid",
    "gantt",
    `    title ${cleanMermaid(title)}`,
    "    dateFormat YYYY-MM-DD",
    "    axisFormat %m/%d",
  ]
  let idx = 1
  for (const [group, list] of groups) {
    lines.push(`    section ${cleanMermaid(group)}`)
    list.sort((a,b) => naturalCompare(a.fm.wbs || a.rel, b.fm.wbs || b.rel))
    for (const w of list) {
      const label = cleanMermaid(`${w.fm.wbs || ""} ${w.fm.title || path.basename(w.rel, ".md")}`)
      const id = `wbs_${idx++}`
      lines.push(`    ${label} :${statusFlag(w.fm.status)}${id}, ${String(w.fm.start).slice(0,10)}, ${String(w.fm.end).slice(0,10)}`)
    }
  }
  lines.push("```")
  return lines.join("\n")
}

function replaceFencedBlocks(content, lang, replacements) {
  let idx = 0
  const re = new RegExp("```" + lang + "\\s*\\n[\\s\\S]*?```", "g")
  return content.replace(re, () => {
    const rep = replacements[idx++]
    return rep ?? "> [!note] 웹 공개본에서는 이 동적 블록을 정적 출력으로 대체하지 못했습니다."
  })
}

function staticsFor(rel, content, wbs, allDocs) {
  const leaf = wbs.filter(w => Number(w.fm.level) === 3)
  const sorted = [...wbs].sort((a,b) => naturalCompare(a.fm.wbs || a.rel, b.fm.wbs || b.rel))
  const leafSorted = [...leaf].sort((a,b) => naturalCompare(a.fm.wbs || a.rel, b.fm.wbs || b.rel))

  const link = w => wbsLink(w)
  const tableAllBasic = () => mdTable(
    ["WBS","작업","L","영역","담당","소속","A","시작","종료","상태"],
    sorted.map(w => [w.fm.wbs, link(w), w.fm.level, w.fm.domain, w.fm.assignee, w.fm.assignee_org, w.fm.accountable, w.fm.start, w.fm.end, w.fm.status])
  )

  if (rel === "00-프로젝트관리/00-PM-대시보드.md") {
    content = content
      .replace(/> \[!info\] Dataview 기본 쿼리만 사용[\s\S]*?자동 Mermaid Gantt\(\[\[20-WBS-Gantt-자동\]\]\)만 JavaScript Queries가 필요합니다\./,
        "> [!info] 웹 공개본\n> Obsidian Dataview는 웹에서 실행하지 않습니다. 빌드 시 WBS Frontmatter를 읽어 아래 표를 정적 Markdown으로 생성합니다.")
    const byStatus = new Map()
    for (const w of leaf) byStatus.set(String(w.fm.status || ""), (byStatus.get(String(w.fm.status || "")) || 0) + 1)
    const byAssignee = new Map()
    for (const w of leaf) byAssignee.set(String(w.fm.assignee || ""), (byAssignee.get(String(w.fm.assignee || "")) || 0) + 1)

    const reps = [
      mdTable(["상태","WBS 수"], [...byStatus].sort().map(([k,v]) => [k,v])),
      mdTable(["담당","WBS 수"], [...byAssignee].sort((a,b)=>a[0].localeCompare(b[0],"ko")).map(([k,v]) => [k,v])),
      mdTable(["WBS","작업","담당","마감","상태","진행률"],
        leafSorted.filter(w => w.fm.status !== "done").sort((a,b)=>String(a.fm.end||"").localeCompare(String(b.fm.end||"")))
          .map(w => [w.fm.wbs, link(w), w.fm.assignee, w.fm.end, w.fm.status, w.fm.progress]))
    ]
    return replaceFencedBlocks(content, "dataview", reps)
  }

  if (rel === "00-프로젝트관리/10-WBS-목록-자동.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["WBS","작업","담당","역할","시작","종료","진행률","상태","REQ","DEL","MS"],
      sorted.map(w => [w.fm.wbs,link(w),w.fm.assignee,w.fm.assignee_role,w.fm.start,w.fm.end,w.fm.progress,w.fm.status,w.fm.requirement_id,w.fm.deliverable_id,w.fm.milestone_id])
    )])
  }

  if (rel === "00-프로젝트관리/07-범위-WBS.md") {
    return replaceFencedBlocks(content, "dataview", [tableAllBasic()])
  }

  if (rel === "00-프로젝트관리/05-WBS-담당자-배분.md") {
    const r1 = mdTable(
      ["WBS","작업","R/주담당","소속","A","역할","협업","상태","시작","종료"],
      sorted.map(w => [w.fm.wbs,link(w),w.fm.assignee,w.fm.assignee_org,w.fm.accountable,w.fm.assignee_role,w.fm.collaborators,w.fm.status,w.fm.start,w.fm.end])
    )
    const r2 = mdTable(
      ["담당","소속","WBS","작업","역할","상태","시작","종료"],
      leafSorted.filter(w=>w.fm.assignee).sort((a,b)=>String(a.fm.assignee).localeCompare(String(b.fm.assignee),"ko"))
        .map(w => [w.fm.assignee,w.fm.assignee_org,w.fm.wbs,link(w),w.fm.assignee_role,w.fm.status,w.fm.start,w.fm.end])
    )
    return replaceFencedBlocks(content, "dataview", [r1,r2])
  }

  if (rel === "00-프로젝트관리/08-마일스톤계획.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["MS","WBS","작업","R","소속","A","종료","상태"],
      sorted.filter(w=>w.fm.milestone_id).sort((a,b)=>{
        const x=String(a.fm.milestone_id).localeCompare(String(b.fm.milestone_id)); return x || naturalCompare(a.fm.wbs,b.fm.wbs)
      }).map(w=>[w.fm.milestone_id,w.fm.wbs,link(w),w.fm.assignee,w.fm.assignee_org,w.fm.accountable,w.fm.end,w.fm.status])
    )])
  }

  if (rel === "00-프로젝트관리/06-요구사항추적표.md") {
    const missing = leafSorted.filter(w => !w.fm.requirement_id || !w.fm.requirement || !w.fm.acceptance_criteria || !w.fm.deliverable_id || !w.fm.quality_id)
    const r1 = missing.length ? mdTable(
      ["WBS","작업","REQ","DEL","QA","담당"],
      missing.map(w=>[w.fm.wbs,link(w),w.fm.requirement_id,w.fm.deliverable_id,w.fm.quality_id,w.fm.assignee])
    ) : "> **누락 없음:** 현재 공개본 기준 Leaf WBS의 필수 추적 필드가 연결되어 있습니다."
    const r2 = mdTable(
      ["REQ","WBS/작업","요구사항","담당","소속","DEL","QA","검증","상태"],
      leafSorted.filter(w=>w.fm.requirement_id).map(w=>[
        w.fm.requirement_id,link(w),w.fm.requirement,w.fm.assignee,w.fm.assignee_org,
        w.fm.deliverable_id,w.fm.quality_id,w.fm.verification_method,w.fm.status
      ])
    )
    return replaceFencedBlocks(content, "dataview", [r1,r2])
  }

  if (rel === "00-프로젝트관리/16-품질-인수기준.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["QA","WBS","수용기준","검증","증빙","책임","상태"],
      leafSorted.filter(w=>w.fm.quality_id).map(w=>[
        w.fm.quality_id,link(w),w.fm.acceptance_criteria,w.fm.verification_method,w.fm.evidence,w.fm.assignee,w.fm.status
      ])
    )])
  }

  if (rel === "00-프로젝트관리/09-리스크등록부.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["WBS","작업","Risk","담당","소속","시작","종료"],
      sorted.filter(w=>w.fm.risk_ids && (Array.isArray(w.fm.risk_ids) ? w.fm.risk_ids.length : true))
        .map(w=>[w.fm.wbs,link(w),w.fm.risk_ids,w.fm.assignee,w.fm.assignee_org,w.fm.start,w.fm.end])
    )])
  }

  if (rel === "00-프로젝트관리/17-산출물등록부.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["DEL","산출물","WBS","책임","소속","계획일","REQ","QA","상태"],
      leafSorted.filter(w=>w.fm.deliverable_id).map(w=>[
        w.fm.deliverable_id,w.fm.deliverable,link(w),w.fm.assignee,w.fm.assignee_org,w.fm.end,w.fm.requirement_id,w.fm.quality_id,w.fm.status
      ])
    )])
  }

  if (rel === "00-프로젝트관리/04-RACI.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["WBS","작업","R/주담당","소속","A","C/협업","시작","종료"],
      sorted.map(w=>[w.fm.wbs,link(w),w.fm.assignee,w.fm.assignee_org,w.fm.accountable,w.fm.collaborators,w.fm.start,w.fm.end])
    )])
  }

  if (rel === "00-프로젝트관리/21-WBS-추적-통합뷰.md") {
    return replaceFencedBlocks(content, "dataview", [mdTable(
      ["WBS","작업","R","소속","A","REQ","시작","종료","DEL","QA","Risk","상태"],
      leafSorted.map(w=>[
        w.fm.wbs,link(w),w.fm.assignee,w.fm.assignee_org,w.fm.accountable,w.fm.requirement_id,w.fm.start,w.fm.end,
        w.fm.deliverable_id,w.fm.quality_id,w.fm.risk_ids,w.fm.status
      ])
    )])
  }

  if (rel === "00-프로젝트관리/20-WBS-Gantt-자동.md") {
    content = content
      .replace("> 이 간트는 별도 일정표를 저장하지 않습니다. WBS Markdown의 `start`, `end`, `status`를 DataviewJS가 읽어 Mermaid를 즉시 생성합니다.",
        "> 이 웹 간트는 별도 일정표를 저장하지 않습니다. **웹 빌드 시 WBS Markdown의 `start`, `end`, `status`를 읽어 Mermaid를 정적 생성**합니다.")
      .replace(/> \[!warning\] 최초 1회 설정 필요[\s\S]*?안내가 나옵니다\./,
        "> [!info] 웹 공개본\n> Dataview JavaScript 실행 없이 빌드 단계에서 Mermaid를 생성합니다.")
      .replace("- 이 페이지를 다시 보면 → DataviewJS가 변경된 값을 읽음",
        "- 웹을 다시 빌드하면 → 변경된 WBS Frontmatter를 읽음")
    return replaceFencedBlocks(content, "dataviewjs", [gantt(sorted)])
  }

  if (rel === "00-프로젝트관리/98-WBS-3중연동-테스트.md") {
    content = content
      .replace(/> \[!warning\][\s\S]*?켜져 있어야 합니다\./,
        "> [!info] 웹 공개본에서는 Dataview/DataviewJS를 실행하지 않고 빌드 시 정적 표와 Mermaid로 변환합니다.")
      .replace("## 2. 같은 원본을 Dataview가 읽는 표", "## 2. 같은 원본에서 웹 빌드가 생성한 정적 표")
      .replace("## 3. 같은 원본을 Mermaid Gantt로 자동 표시", "## 3. 같은 원본에서 웹 빌드가 생성한 Mermaid Gantt")
    const sample = allDocs.filter(d=>d.rel.startsWith("00-프로젝트관리/98-연동-예제/") && d.rel.endsWith(".md"))
      .sort((a,b)=>String(a.fm.start||"").localeCompare(String(b.fm.start||"")))
    let c = replaceFencedBlocks(content, "dataview", [mdTable(
      ["작업","시작","종료","상태","진행률"],
      sample.map(d=>[`[[${relWithoutExt(d.rel)}|${titleOf(d)}]]`,d.fm.start,d.fm.end,d.fm.status,d.fm.progress])
    )])
    const fakeWbs = sample.map((d,i)=>({ ...d, fm: {...d.fm, wbs: `DEMO-${i+1}`, domain: "예제"} }))
    c = replaceFencedBlocks(c, "dataviewjs", [gantt(fakeWbs, "단일 원본 연동 예제")])
    return c
  }

  if (content.includes("```dataview")) {
    return content.replace(/```dataview(?:js)?\s*\n[\s\S]*?```/g,
      "> [!note] 웹 공개본에서는 Obsidian Dataview를 실행하지 않고 정적 Markdown으로 변환합니다.")
  }

  return content
}

function shouldPublish(doc) {
  // Water-AI 전체 공개가 기본값.
  // 정말 숨겨야 할 문서만 web_exclude: true 로 명시한다.
  return doc.fm.web_exclude !== true
}

function ensureFrontmatterForWeb(doc, content) {
  if (!doc.raw) return content
  return content
}

function resolveWikiTarget(targetRaw, doc, allByPath, byStem) {
  let target = targetRaw
  const hash = target.indexOf("#")
  const anchor = hash >= 0 ? target.slice(hash) : ""
  target = hash >= 0 ? target.slice(0, hash) : target
  target = target.replace(/^20-Water-AI\//, "")
  if (target === "Rulmera-OPA") return { mapped: "index" + anchor, sourceRel: null, special: true }

  const normalized = normalizePath(target)
  const candidates = []
  const exactNoExt = normalized.replace(/\.md$/i, "")
  if (allByPath.has(exactNoExt)) candidates.push(allByPath.get(exactNoExt))

  if (!normalized.includes("/")) {
    const stem = path.basename(exactNoExt)
    const arr = byStem.get(stem) || []
    if (arr.length === 1) candidates.push(arr[0])
  } else {
    const currentDir = path.posix.dirname(doc.rel)
    const relResolved = path.posix.normalize(path.posix.join(currentDir, exactNoExt))
    if (allByPath.has(relResolved)) candidates.push(allByPath.get(relResolved))
  }

  const unique = [...new Set(candidates)]
  if (unique.length === 1) return { mapped: relWithoutExt(unique[0].rel) + anchor, sourceRel: unique[0].rel, special: false }
  return { mapped: normalized + anchor, sourceRel: null, special: false }
}

function sanitizeLinks(content, doc, publishedSet, allByPath, byStem) {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (full, targetRaw, label) => {
    const r = resolveWikiTarget(targetRaw.trim(), doc, allByPath, byStem)
    const display = (label || targetRaw.split("#")[0].split("/").pop() || "문서").trim()

    if (r.special) return `[[${r.mapped}|${display === "Rulmera-OPA" ? "Water-AI 홈" : display}]]`
    if (r.sourceRel && !publishedSet.has(r.sourceRel)) return display
    return `[[${r.mapped}${label ? `|${label}` : ""}]]`
  })
}

function makeIndex(publishedDocs) {
  const groups = new Map()
  for (const d of publishedDocs) {
    const top = d.rel.includes("/") ? d.rel.split("/")[0] : "기타"
    if (!groups.has(top)) groups.set(top, [])
    groups.get(top).push(d)
  }

  const lines = [
    "---",
    "title: Water-AI 프로젝트 공유 포털",
    "web_publish: true",
    "tags:",
    "  - water-ai",
    "  - customer-web",
    "---",
    "",
    "# Water-AI 프로젝트 공유 포털",
    "",
    "> 이 사이트는 `Rulmera-OPA/20-Water-AI`의 **모든 Obsidian Markdown 문서**를 자동 게시하는 읽기전용 공개본입니다.",
    "",
    `- 생성 모드: **Water-AI 전체 공개**`,
    `- 공개 문서 수: **${publishedDocs.length}개**`,
    "",
  ]

  for (const [group, docs] of [...groups].sort((a,b)=>a[0].localeCompare(b[0],"ko"))) {
    lines.push(`## ${group}`, "")
    docs.sort((a,b)=>a.rel.localeCompare(b.rel,"ko"))
    for (const d of docs) {
      lines.push(`- [[${relWithoutExt(d.rel)}|${titleOf(d)}]]`)
    }
    lines.push("")
  }
  return lines.join("\n")
}

// ----- load docs -----
const files = walk(sourceRoot)
const mdFiles = files.filter(f => f.rel.toLowerCase().endsWith(".md"))
const docs = mdFiles.map(f => {
  const text = fs.readFileSync(f.abs, "utf8")
  const parsed = parseFrontmatter(text)
  return { ...f, text, fm: parsed.data, body: parsed.body, raw: parsed.raw }
})

const allByPath = new Map()
const byStem = new Map()
for (const d of docs) {
  allByPath.set(relWithoutExt(d.rel), d)
  const stem = path.basename(relWithoutExt(d.rel))
  if (!byStem.has(stem)) byStem.set(stem, [])
  byStem.get(stem).push(d)
}

const published = docs.filter(shouldPublish)
const visibleDocs = published
const publishedSet = new Set(published.map(d => d.rel))

const wbsAll = docs
  .filter(d => d.rel.startsWith("00-프로젝트관리/WBS/") && d.fm.wbs)
  .sort((a,b)=>naturalCompare(a.fm.wbs,b.fm.wbs))

const wbs = visibleDocs
  .filter(d => d.rel.startsWith("00-프로젝트관리/WBS/") && d.fm.wbs)
  .sort((a,b)=>naturalCompare(a.fm.wbs,b.fm.wbs))

fs.rmSync(destRoot, { recursive: true, force: true })
fs.mkdirSync(destRoot, { recursive: true })

let written = 0
let convertedDataview = 0
for (const d of published) {
  let content = d.text.replace(/^\uFEFF/, "")
  const before = content
  content = staticsFor(d.rel, content, wbs, visibleDocs)
  if (content !== before) convertedDataview++

  content = content.replaceAll("20-Water-AI/", "")
  content = sanitizeLinks(content, d, publishedSet, allByPath, byStem)

  const out = path.join(destRoot, d.rel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, content, "utf8")
  written++
}

fs.writeFileSync(path.join(destRoot, "index.md"), makeIndex(published), "utf8")

const report = {
  mode,
  sourceRoot,
  destRoot,
  totalMarkdown: docs.length,
  publishedMarkdown: written,
  dataviewPagesConverted: convertedDataview,
  totalWbsCount: wbsAll.length,
  visibleWbsCount: wbs.length,
  generatedIndex: true,
}
fs.writeFileSync(path.join(destRoot, "_WEB-BUILD-REPORT.json"), JSON.stringify(report, null, 2), "utf8")
console.log(JSON.stringify(report, null, 2))
