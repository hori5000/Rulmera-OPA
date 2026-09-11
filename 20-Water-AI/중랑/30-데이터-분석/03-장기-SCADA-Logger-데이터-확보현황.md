---
doc_id: JN-DATA-LONG-001
title: 중랑 장기 SCADA Logger 데이터 확보현황
plant: 중랑
status: confirmed
revision: 1.0
last_updated: 2026-09-11
source_refs:
  - SRC-DATA-JN-LONG-01
---

# 중랑 장기 SCADA Logger 데이터 확보현황

## 확정 상태

중랑 AI 개발용 장기 운전데이터는 **이미 확보되어 있다.** 데이터가 없어서 AI 개발을 기다리는 상태가 아니다.

- 기간: `2025-09-24 ~ 2026-08-05`
- 수집 파일: 총 674개, CLD 665개
- AI Logger: 약 217 Tag, 약 15초 주기
- DI Logger: 약 120 Tag, 약 15초 주기
- DI2 Logger: 약 5 Tag, 약 1초 주기(M301 계통)
- 샘플링 패키지 생성 완료
- CLD 해석값과 CSV 비교 검증 완료(대표검증 58/58 일치)

## M203에서 즉시 사용 가능한 대표 Tag

- DO, MLSS, 유입유량, 송풍량
- M203 실제 Hz, 선택 DO Mode, Timer 진행값, 최저 Hz
- M203 A/B RUN·Fault
- M203 유효전력, 누적전력, PF 등

## SQL/운영 DB 문제와 구분

`junglang` ODBC 연결 실패 여부는 **장기데이터 확보 여부와 다른 문제**다. 기존 CLD/CSV 장기 Logger로 오프라인 분석·학습을 진행할 수 있으며, SQL/DB 확인은 향후 실시간 AI 연계와 Rule 파라미터 이력 보강을 위한 병행 과제로 관리한다.
