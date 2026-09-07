---
type: scope-wbs
project: Water AI
status: active
last_updated: 2026-09-06
---

# 범위·WBS

## 범위 경계

현재 WBS는 **파이브텍이 코이넷에 지시한 2차년도 실무 작업범위**를 중심으로 합니다. 공식 컨소시엄 전체 범위(DX/DT/DR/MRV/가이드라인/대학 공정모델)는 코이넷이 직접 개발하는 WBS가 아니라 **외부 의존성/인터페이스 요구사항**으로 [[06-요구사항추적표]]에서 추적합니다.

## WBS 자동목록

```dataview
TABLE WITHOUT ID wbs AS "WBS", file.link AS "작업", level AS "L", domain AS "영역", assignee AS "담당", assignee_org AS "소속", accountable AS "A", start AS "시작", end AS "종료", status AS "상태"
FROM "20-Water-AI/00-프로젝트관리/WBS"
WHERE wbs
SORT wbs ASC
```

## 범위 포함

- 하수 중소형/대형 및 정수 운영 데이터 수집, DB, 스토리지, 외부연계/SCADA 상호운용
- 하수 유입/에너지, 정수 에너지/수요 데이터 전처리 및 품질체계
- 정수 에너지 수요예측·최적화·수질 예측·통합 모델 I/O 아키텍처
- 현장 안전 Rule을 고려한 Shadow/승인형 연계 기반

## 외부기관 의존 범위(직접 개발 제외)

- 에이치코비 DX/DT/현장 시스템
- 서울시립대 하수 Process model/자동운전/공정 안정성
- 경기대 정수 공정/표준화 모델
- IDR DR/ESS-PV/Auto DR
- KTC MRV/신뢰성 검증
- 협회 가이드라인/성과 확산
