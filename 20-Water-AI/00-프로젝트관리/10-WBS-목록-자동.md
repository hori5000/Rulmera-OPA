# WBS 자동 목록

> `20-Water-AI/00-프로젝트관리/WBS`의 단일 원본을 읽습니다.

```dataview
TABLE WITHOUT ID
  wbs AS "WBS",
  file.link AS "작업",
  assignee AS "담당",
  assignee_role AS "역할",
  start AS "시작",
  end AS "종료",
  progress AS "진행률",
  status AS "상태",
  requirement_id AS "REQ",
  deliverable_id AS "DEL",
  milestone_id AS "MS"
FROM "20-Water-AI/00-프로젝트관리/WBS"
WHERE wbs
SORT wbs ASC
```
