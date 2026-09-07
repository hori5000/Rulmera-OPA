---
type: integrated-traceability-view
project: Water AI
status: active
last_updated: 2026-09-06
---

# WBS · 요구사항 · 조직 · 일정 · 산출물 · 품질 통합 추적

> 핵심 추적 체인: **파이브텍 작업지시 → 코이넷/파이브텍 담당 → WBS → REQ → DEL → QA → Evidence → 파이브텍 수용 → 외부기관 연계**

```dataview
TABLE WITHOUT ID
  wbs AS "WBS", file.link AS "작업", assignee AS "R", assignee_org AS "소속", accountable AS "A", requirement_id AS "REQ", start AS "시작", end AS "종료", deliverable_id AS "DEL", quality_id AS "QA", risk_ids AS "Risk", status AS "상태"
FROM "20-Water-AI/00-프로젝트관리/WBS"
WHERE level = 3
SORT wbs ASC
```

## 프로그램 수준 외부 인터페이스

[[06-요구사항추적표#1. 프로그램 수준 요구사항]]

## 연결 관리문서

- 이해관계자: [[03-이해관계자등록부]]
- 조직/책임: [[04-RACI]]
- 이슈: [[10-이슈로그]]
- 리스크: [[09-리스크등록부]]
- 변경: [[13-변경로그]]
- 액션: [[14-액션아이템로그]]
- 품질: [[16-품질-인수기준]]
- 산출물: [[17-산출물등록부]]
