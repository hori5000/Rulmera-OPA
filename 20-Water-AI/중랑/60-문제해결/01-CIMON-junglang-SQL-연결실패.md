---
doc_id: JN-PROBLEM-SQL-001
title: 중랑 CIMON junglang SQL 연결실패 조사
plant: 중랑
category: 문제해결
status: open
priority: critical
last_updated: 2026-09-11
source_refs:
  - SRC-JN-PC-20260907
related_issue: ISSUE-012
related_risk: RISK-019
---

# 중랑 CIMON `junglang` SQL 연결실패 조사

## 현재 확인된 현상

2026-09-07 현장 PC 수집본의 2026-07-09~09-07 XLOG 61개 전부에서 다음 형태의 오류가 반복된다.

`SQL : junglang 데이터베이스의 연결 실패 : 데이터 원본 이름이 없고 기본 드라이버를 지정하지 않았습니다.`

이 로그는 **이미 발생한 이슈**다. 다만 이것만으로 중랑 전체 장기 DB가 해당 기간 모두 유실됐다고 확정하지 않는다. 실제 Logger/DB가 다른 PC 또는 서버에서 동작할 가능성이 남아 있기 때문이다.

## 원인 확인 순서

| 순서 | 확인 항목 | 완료 기준 |
|---|---|---|
| 1 | 이 HMI PC의 32/64bit ODBC DSN `junglang` 존재 여부 | DSN/Driver/Server/DB 정보 기록 |
| 2 | CIMON SQL 설정이 어떤 DSN/서버를 참조하는지 | SCADA 설정↔ODBC 연결표 완성 |
| 3 | 실제 DB/Logger가 별도 PC에서 동작하는지 | 서버명/IP/역할/담당자 확인 |
| 4 | 실제 테이블의 최초·최종 Timestamp와 보존기간 | 학습 가능 기간 확정 |
| 5 | 일보·월보와 Raw DB의 값/기간 교차검증 | 대표일 기준 일치 확인 |
| 6 | 누락기간 존재 시 대체자료와 재수집 정책 | Gap List/대응안 승인 |

## AI 개발 영향

- 이 이슈가 닫히기 전에는 “장기간 실데이터 확보 완료”라고 보고하지 않는다.
- M203 Shadow Dataset은 실제 장기 DB의 위치와 시간범위를 확인한 후 고정한다.
- XLOG 자체를 AI 학습 Raw 데이터로 사용하지 않는다.

## 완료조건

**실제 DB 서버/DBMS/DSN/테이블/보존기간/샘플조회 결과가 하나의 근거문서로 확인되고, 필요한 학습기간의 확보 가능 여부가 확정되면 종료한다.**
