---
type: wbs-gantt-auto
project: Water AI
status: active
---

# WBS Gantt — 자동

> 이 간트는 별도 일정표를 저장하지 않습니다. WBS Markdown의 `start`, `end`, `status`를 DataviewJS가 읽어 Mermaid를 즉시 생성합니다.

> [!warning] 최초 1회 설정 필요
> `설정 → Dataview → Enable JavaScript Queries`를 **ON** 해야 아래 자동 Mermaid가 표시됩니다. OFF 상태에서는 `Dataview JS queries are disabled` 안내가 나옵니다.

```dataviewjs
await dv.view("20-Water-AI/00-프로젝트관리/scripts/wbs-gantt", {
  folder: "20-Water-AI/00-프로젝트관리/WBS",
  title: "Water-AI WBS 일정",
  showLevels: [1, 2, 3]
});
```

## 중요한 점

- Task Gantt에서 막대를 드래그 → 해당 작업 Markdown의 `start` / `end` 변경
- 이 페이지를 다시 보면 → DataviewJS가 변경된 값을 읽음
- Mermaid 간트 → 변경된 날짜로 자동 재생성
- 따라서 Mermaid 코드를 별도로 손으로 관리하지 않음
