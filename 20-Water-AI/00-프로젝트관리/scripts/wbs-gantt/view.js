const folder = input?.folder ?? "00-프로젝트관리/WBS";
const chartTitle = input?.title ?? "Water-AI WBS 일정";
const showLevels = input?.showLevels ?? [2, 3];

function asText(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  return String(v);
}

function fmtDate(v) {
  if (!v) return "";
  if (typeof v?.toFormat === "function") return v.toFormat("yyyy-MM-dd");
  const s = asText(v);
  return s.length >= 10 ? s.substring(0, 10) : s;
}

function compareWbs(a, b) {
  const aa = asText(a).split(".").map(x => parseInt(x, 10));
  const bb = asText(b).split(".").map(x => parseInt(x, 10));
  const n = Math.max(aa.length, bb.length);
  for (let i = 0; i < n; i++) {
    const av = Number.isFinite(aa[i]) ? aa[i] : -1;
    const bv = Number.isFinite(bb[i]) ? bb[i] : -1;
    if (av !== bv) return av - bv;
  }
  return 0;
}

function safeLabel(s) {
  return asText(s)
    .replace(/[\r\n]+/g, " ")
    .replace(/[,:#;]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const all = dv.pages(`"${folder}"`)
  .where(p => p.wbs)
  .array()
  .sort((a, b) => compareWbs(a.wbs, b.wbs));

const tasks = all.filter(p => p.start && p.end && showLevels.includes(Number(p.level ?? asText(p.wbs).split(".").length)));

if (tasks.length === 0) {
  dv.paragraph("📅 아직 `start` / `end`가 입력된 WBS 작업이 없습니다. Task Gantt에서 날짜를 넣으면 이 간트가 같은 Markdown frontmatter를 읽어 자동 표시합니다.");
} else {
  const topTitles = {};
  for (const p of all) {
    if (Number(p.level) === 1) topTitles[asText(p.wbs)] = asText(p.title || p.file.name);
  }

  const lines = [
    "gantt",
    `    title ${safeLabel(chartTitle)}`,
    "    dateFormat YYYY-MM-DD",
    "    axisFormat %m/%d"
  ];

  let currentSection = null;
  for (const p of tasks) {
    const wbs = asText(p.wbs);
    const top = wbs.split(".")[0];
    if (top !== currentSection) {
      currentSection = top;
      const secTitle = topTitles[top] ? `${top}. ${topTitles[top]}` : `${top}. WBS`;
      lines.push("");
      lines.push(`    section ${safeLabel(secTitle)}`);
    }

    const level = Number(p.level ?? wbs.split(".").length);
    const indent = level >= 3 ? "└─ " : "";
    let title = safeLabel(p.title || p.file.name);
    if (title.length > 52) title = title.substring(0, 52) + "…";
    const label = `${indent}${wbs} ${title}`;
    const id = `wbs_${wbs.replace(/\./g, "_")}`;
    const status = asText(p.status);
    let flag = "";
    if (status === "done") flag = "done, ";
    else if (status === "in-progress") flag = "active, ";
    else if (status === "blocked") flag = "crit, ";

    lines.push(`    ${label} :${flag}${id}, ${fmtDate(p.start)}, ${fmtDate(p.end)}`);
  }

  dv.paragraph("```mermaid\n" + lines.join("\n") + "\n```");
}
