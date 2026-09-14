---
doc_id: JN-PROBLEM-SQL-001
title: 중랑 CIMON junglang SQL 연결실패 조사
plant: 중랑
category: 문제해결
status: open
priority: high
last_updated: 2026-09-14
source_refs:
  - SRC-JN-PC-20260907
related_issue: ISSUE-012
related_risk: RISK-019
---

# 중랑 CIMON `junglang` SQL 연결실패 조사

## 현재 확인된 현상

2026-09-07 현장 PC 수집본의 2026-07-09~09-07 XLOG 61개 전부에서 다음 형태의 오류가 반복된다.

`SQL : junglang 데이터베이스의 연결 실패 : 데이터 원본 이름이 없고 기본 드라이버를 지정하지 않았습니다.`

이 로그는 **이미 발생한 Legacy 운영 연계 이슈**다. 그러나 중랑의 장기 SCADA Logger 데이터(CLD/CSV)는 이미 별도로 확보되어 있으므로, 이 오류를 **AI 학습용 장기데이터 미확보 문제로 해석하지 않는다.** 2026-09-14 DEC-012에 따라 신규 실시간 AI Source는 PLC Direct READ-only Collector로 결정했으며, 이 이슈의 목적은 기존 SQL/DB의 실제 위치·적재상태·Set Point/Mode 과거이력 보유 여부를 확인해 교차검증 자료로 쓰는 것이다.

## 원인 확인 순서

| 순서 | 확인 항목 | 완료 기준 |
|---|---|---|
| 1 | 이 HMI PC의 32/64bit ODBC DSN `junglang` 존재 여부 | DSN/Driver/Server/DB 정보 기록 |
| 2 | CIMON SQL 설정이 어떤 DSN/서버를 참조하는지 | SCADA 설정↔ODBC 연결표 완성 |
| 3 | 실제 DB/Logger가 별도 PC에서 동작하는지 | 서버명/IP/역할/담당자 확인 |
| 4 | 운영 DB의 현재 적재 테이블·최근 Timestamp | 실시간 적재 정상 여부 확인 |
| 5 | PLC Direct Collector와 SCADA Logger/운영 DB의 역할 대조 | Direct=신규 실시간, Legacy=과거이력·검증으로 역할 확인 |
| 6 | 장애 시 Buffer/재전송/복구 정책 | 실시간 연계 대응안 승인 |

## AI 개발 영향

- **장기간 실데이터는 이미 SCADA Logger(CLD/CSV)로 확보 완료**되어 있으며 이 이슈와 분리한다.
- M203 Dataset/Baseline 개발은 확보된 Logger 데이터로 진행한다.
- 이 이슈 미해결 시 영향은 **실시간 자동수집/운영 DB 연계 일정**에 집중된다.
- XLOG 자체를 AI 학습 Raw 데이터로 사용하지 않는다.

## 완료조건

**운영 DB 서버/DBMS/DSN/적재 테이블/실제 적재상태와 과거 Set Point/Mode 이력 보유 여부가 확인되고, PLC Direct Collector와의 교차검증 활용범위가 정리되면 종료한다.**
