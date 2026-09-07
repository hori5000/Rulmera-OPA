---
type: wbs-assignment
project: Water AI
status: active
last_updated: 2026-09-06
---

# WBS 담당자 배분

## 조직·역할 기준

| 이름 | 소속 | 역할 | 책임 성격 |
|---|---|---|---|
| 홍효헌 | 파이브텍 | PM / 백엔드 / 프론트엔드 | 코이넷 작업지시·수용·대외조정 + 직접 구현 |
| 윤석훈 | 코이넷 | AI / 시뮬레이터 | AI·전처리·예측·최적화·검증 |
| 정교석 | 코이넷 | 수집기 | PLC/SCADA/Logger/DB 수집 |
| 김광민 | 코이넷 | 하드웨어 / 임베디드 | 통신·장비·SCADA 상호운용·안전 Rule |

## WBS별 자동표

```dataview
TABLE WITHOUT ID
  wbs AS "WBS", file.link AS "작업", assignee AS "R/주담당", assignee_org AS "소속", accountable AS "A", assignee_role AS "역할", collaborators AS "협업", status AS "상태", start AS "시작", end AS "종료"
FROM "20-Water-AI/00-프로젝트관리/WBS"
WHERE wbs
SORT wbs ASC
```

## 사람별 보기

```dataview
TABLE WITHOUT ID
  assignee AS "담당",
  assignee_org AS "소속",
  wbs AS "WBS",
  file.link AS "작업",
  assignee_role AS "역할",
  status AS "상태",
  start AS "시작",
  end AS "종료"
FROM "20-Water-AI/00-프로젝트관리/WBS"
WHERE level = 3 AND assignee
SORT assignee ASC
```

> **A/R 원칙:** 코이넷 담당자가 R이어도 파이브텍 PM 홍효헌이 작업지시/수용의 A로 추적됩니다. 홍효헌이 직접 구현하는 백엔드·프론트엔드 WBS는 A/R이 동일인입니다.
