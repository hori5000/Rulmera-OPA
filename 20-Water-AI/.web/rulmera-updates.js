/* RULMERA-WATER-AI-UPDATES-START */
(() => {
  if (window.__RULMERA_WATER_AI_UPDATES__) return
  window.__RULMERA_WATER_AI_UPDATES__ = true

  const ENDPOINT = "/static/project-updates.json"
  const STORAGE_KEY = "rulmera.water-ai.updates.lastSeen"
  const SESSION_KEY = "rulmera.water-ai.updates.sessionDismissed"
  let data = null
  let loading = null

  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]))

  const typeLabel = (t) => ({ added: "추가", modified: "수정", deleted: "삭제", current: "최근" }[t] || "변경")

  function addStyles() {
    if (document.getElementById("rulmera-update-style")) return
    const s = document.createElement("style")
    s.id = "rulmera-update-style"
    s.textContent = `
      .ru-bell{position:fixed;top:16px;right:18px;z-index:9997;width:42px;height:42px;border:1px solid var(--lightgray,#e5e7eb);border-radius:13px;background:var(--light,#fff);color:var(--dark,#111827);box-shadow:0 8px 24px rgba(15,23,42,.14);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;transition:.15s ease}
      .ru-bell:hover{transform:translateY(-1px);border-color:var(--secondary,#1f4e79)}
      .ru-badge{position:absolute;top:-6px;right:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#dc2626;color:#fff;font:700 11px/20px system-ui,sans-serif;text-align:center;border:2px solid var(--light,#fff)}
      .ru-panel{position:fixed;top:66px;right:18px;z-index:9998;width:min(390px,calc(100vw - 28px));max-height:min(72vh,620px);overflow:auto;border:1px solid var(--lightgray,#e5e7eb);border-radius:16px;background:var(--light,#fff);color:var(--dark,#111827);box-shadow:0 20px 55px rgba(15,23,42,.24);padding:16px;display:none}
      .ru-panel.open{display:block}.ru-head{display:flex;align-items:flex-start;gap:12px}.ru-head-main{flex:1;min-width:0}.ru-kicker{font-size:12px;font-weight:700;color:var(--secondary,#1f4e79);letter-spacing:.02em}.ru-title{font-size:18px;font-weight:800;margin:3px 0 2px}.ru-meta{font-size:12px;color:var(--gray,#6b7280)}
      .ru-close{border:0;background:transparent;color:inherit;font-size:22px;line-height:1;cursor:pointer;padding:2px 4px}.ru-list{display:grid;gap:9px;margin-top:14px}.ru-item{display:block;text-decoration:none!important;color:inherit!important;border:1px solid var(--lightgray,#e5e7eb);border-radius:12px;padding:11px 12px;background:color-mix(in srgb,var(--light,#fff) 92%,var(--secondary,#1f4e79) 8%)}.ru-item:hover{border-color:var(--secondary,#1f4e79)}
      .ru-row{display:flex;gap:7px;align-items:center;flex-wrap:wrap}.ru-chip{display:inline-flex;align-items:center;height:21px;padding:0 7px;border-radius:999px;font-size:11px;font-weight:800;background:var(--highlight,rgba(31,78,121,.12));color:var(--secondary,#1f4e79)}.ru-chip.type-added{background:#dcfce7;color:#166534}.ru-chip.type-deleted{background:#fee2e2;color:#991b1b}.ru-chip.type-modified{background:#dbeafe;color:#1d4ed8}.ru-item-title{font-weight:750;font-size:13px;line-height:1.45;margin-top:6px}.ru-item-summary{font-size:12px;line-height:1.45;color:var(--darkgray,#4b5563);margin-top:2px}.ru-path{font-size:10.5px;color:var(--gray,#6b7280);margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ru-empty{padding:18px 6px;color:var(--gray,#6b7280);font-size:13px}
      .ru-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:14px}.ru-btn{border:1px solid var(--lightgray,#e5e7eb);border-radius:10px;padding:9px 12px;background:var(--light,#fff);color:var(--dark,#111827);font-weight:700;font-size:12px;cursor:pointer;text-decoration:none!important}.ru-btn.primary{background:var(--secondary,#1f4e79);border-color:var(--secondary,#1f4e79);color:#fff!important}
      .ru-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.48);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:20px}.ru-overlay.open{display:flex}.ru-modal{width:min(720px,100%);max-height:min(82vh,760px);overflow:auto;border-radius:20px;background:var(--light,#fff);color:var(--dark,#111827);box-shadow:0 28px 90px rgba(0,0,0,.34);border:1px solid var(--lightgray,#e5e7eb);padding:22px}.ru-modal .ru-title{font-size:22px}.ru-modal .ru-list{grid-template-columns:1fr 1fr}.ru-modal-banner{margin-top:12px;border-radius:12px;padding:10px 12px;background:var(--highlight,rgba(31,78,121,.12));font-size:12px;line-height:1.5}
      @media(max-width:680px){.ru-bell{top:auto;bottom:16px;right:14px}.ru-panel{top:auto;bottom:68px;right:14px}.ru-modal{padding:17px}.ru-modal .ru-list{grid-template-columns:1fr}.ru-actions{flex-wrap:wrap}.ru-btn{flex:1;text-align:center}}
    `
    document.head.appendChild(s)
  }

  async function loadData() {
    if (data) return data
    if (loading) return loading
    loading = fetch(`${ENDPOINT}?t=${Date.now()}`, { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(j => (data = j))
      .catch(err => { console.warn("[Rulmera updates] load failed", err); return null })
      .finally(() => { loading = null })
    return loading
  }

  function isSeen(d) {
    try { return localStorage.getItem(STORAGE_KEY) === d.version } catch { return false }
  }
  function markSeen(d) {
    try { localStorage.setItem(STORAGE_KEY, d.version) } catch {}
    try { sessionStorage.removeItem(SESSION_KEY) } catch {}
    updateBadge(d)
  }
  function dismissedThisSession(d) {
    try { return sessionStorage.getItem(SESSION_KEY) === d.version } catch { return false }
  }
  function dismissSession(d) {
    try { sessionStorage.setItem(SESSION_KEY, d.version) } catch {}
  }

  function changeHtml(c) {
    const tag = `<span class="ru-chip type-${esc(c.type)}">${esc(typeLabel(c.type))}</span>`
    const cat = c.category ? `<span class="ru-chip">${esc(c.category)}</span>` : ""
    const body = `${tag}${cat}`
    const html = `<div class="ru-row">${body}</div><div class="ru-item-title">${esc(c.title)}</div><div class="ru-item-summary">${esc(c.summary)}</div><div class="ru-path">${esc(c.changed_at || "")} · ${esc(c.path || "")}</div>`
    if (!c.href) return `<div class="ru-item">${html}</div>`
    return `<a class="ru-item" href="${esc(encodeURI(c.href))}">${html}</a>`
  }

  function renderList(d, limit = 10) {
    const list = Array.isArray(d.changes) ? d.changes.slice(0, limit) : []
    return list.length ? list.map(changeHtml).join("") : `<div class="ru-empty">이번 배포에는 사용자에게 보여줄 문서 변경이 없습니다.</div>`
  }

  function updateBadge(d) {
    const badge = document.querySelector(".ru-badge")
    if (!badge) return
    const unseen = !isSeen(d) && Number(d.total_changes || 0) > 0
    badge.hidden = !unseen
    if (unseen) badge.textContent = String(Math.min(99, Number(d.total_changes || 0)))
  }

  function ensureBell(d) {
    let bell = document.querySelector(".ru-bell")
    if (!bell) {
      bell = document.createElement("button")
      bell.type = "button"
      bell.className = "ru-bell"
      bell.setAttribute("aria-label", "프로젝트 변경사항")
      bell.innerHTML = `🔔<span class="ru-badge" hidden></span>`
      bell.addEventListener("click", () => togglePanel())
      document.body.appendChild(bell)
    }
    updateBadge(d)
  }

  function ensurePanel(d) {
    let p = document.querySelector(".ru-panel")
    if (!p) {
      p = document.createElement("section")
      p.className = "ru-panel"
      p.setAttribute("aria-label", "프로젝트 변경사항 알림센터")
      document.body.appendChild(p)
    }
    p.innerHTML = `
      <div class="ru-head"><div class="ru-head-main"><div class="ru-kicker">PROJECT UPDATE</div><div class="ru-title">최근 변경사항</div><div class="ru-meta">${esc(d.generated_at?.replace("T", " ").slice(0,16) || "")} · ${esc(d.version || "")}</div></div><button class="ru-close" type="button" aria-label="닫기">×</button></div>
      <div class="ru-list">${renderList(d, 8)}</div>
      <div class="ru-actions"><a class="ru-btn" href="${esc(encodeURI(d.history_url || "/00-프로젝트관리/00-고객-진행현황"))}">전체 진행현황</a><button class="ru-btn primary ru-mark-seen" type="button">확인</button></div>`
    p.querySelector(".ru-close")?.addEventListener("click", () => p.classList.remove("open"))
    p.querySelector(".ru-mark-seen")?.addEventListener("click", () => { markSeen(d); p.classList.remove("open") })
  }

  function togglePanel() {
    if (!data) return
    ensurePanel(data)
    document.querySelector(".ru-panel")?.classList.toggle("open")
  }

  function ensureModal(d) {
    let overlay = document.querySelector(".ru-overlay")
    if (!overlay) {
      overlay = document.createElement("div")
      overlay.className = "ru-overlay"
      overlay.innerHTML = `<div class="ru-modal" role="dialog" aria-modal="true"></div>`
      overlay.addEventListener("click", e => {
        if (e.target === overlay) { dismissSession(d); overlay.classList.remove("open") }
      })
      document.body.appendChild(overlay)
    }
    const modal = overlay.querySelector(".ru-modal")
    modal.innerHTML = `
      <div class="ru-head"><div class="ru-head-main"><div class="ru-kicker">WATER-AI · UPDATE</div><div class="ru-title">프로젝트 변경사항</div><div class="ru-meta">새 배포에서 ${esc(d.total_changes || 0)}건의 문서 변경이 확인되었습니다.</div></div><button class="ru-close" type="button" aria-label="나중에 보기">×</button></div>
      <div class="ru-modal-banner">${d.initial ? "변경 알림 기능이 처음 적용되어 최근 갱신 문서를 기준으로 표시합니다." : "이 알림은 같은 브라우저에서 버전당 한 번만 표시됩니다. 우측 상단 🔔에서 언제든 다시 볼 수 있습니다."}</div>
      <div class="ru-list">${renderList(d, 10)}</div>
      <div class="ru-actions"><button class="ru-btn ru-later" type="button">나중에 보기</button><a class="ru-btn" href="${esc(encodeURI(d.history_url || "/00-프로젝트관리/00-고객-진행현황"))}">진행현황 보기</a><button class="ru-btn primary ru-confirm" type="button">확인</button></div>`
    const later = () => { dismissSession(d); overlay.classList.remove("open") }
    modal.querySelector(".ru-close")?.addEventListener("click", later)
    modal.querySelector(".ru-later")?.addEventListener("click", later)
    modal.querySelector(".ru-confirm")?.addEventListener("click", () => { markSeen(d); overlay.classList.remove("open") })
    overlay.classList.add("open")
  }

  async function mount() {
    addStyles()
    const d = await loadData()
    if (!d) return
    ensureBell(d)
    ensurePanel(d)
    if (Number(d.total_changes || 0) > 0 && !isSeen(d) && !dismissedThisSession(d) && !document.querySelector(".ru-overlay.open")) {
      setTimeout(() => ensureModal(d), 350)
    }
  }

  document.addEventListener("nav", () => {
    document.querySelector(".ru-panel")?.classList.remove("open")
    mount()
  })
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true })
  else mount()
})()
/* RULMERA-WATER-AI-UPDATES-END */
