---
doc_id: JN-M203-DATASET-001
title: M203 Master Dataset 정의
plant: 중랑
status: draft-for-batch-build
revision: 0.2
last_updated: 2026-09-11
---

# M203 Master Dataset 정의

## 목적

장기 SCADA Logger와 A2 PILOT PLC Rule을 동일 시간축으로 결합하여 **운전결과뿐 아니라 운전사유를 설명할 수 있는 학습 데이터셋**을 만든다.

## 필수 컬럼

| 그룹 | 컬럼 | 원천 | 용도 |
|---|---|---|---|
| 시간 | timestamp | CLD/CSV | 기준시간 |
| 공정 | do_mg_l | AI Logger | 핵심 공정상태 |
| 공정 | mlss_mg_l | AI Logger | 공정상태 |
| 공정 | inflow | AI Logger | 부하상태 |
| 공정 | air_flow | AI Logger | 송풍 결과 |
| 설비 | m203_a_run / b_run | DI Logger | 실제 가동기 식별 |
| 설비 | m203_a_fault / b_fault | DI Logger | 고장구간 제외/대체운전 |
| 제어 | m203_do_mode | AI Logger `%MW1016` | PLC가 선택한 DO Mode |
| 제어 | m203_timer_on_pv / off_pv | AI Logger | 시간운전 단계 |
| 제어 | m203_hz_low | AI Logger | 최저 Hz 제약 |
| 결과 | m203_hz_actual | AI Logger `%MW343` | 실제 운전 Hz |
| 에너지 | m203_power_w | AI Logger | 전력예측 Target |
| 에너지 | m203_kwh | AI Logger | M&V |
| 파생 | do_band | DO + PLC Rule | HIGH/MIDDLE/LOW |
| 파생 | selected_unit | RUN 상태 + A/B Rule | A/B |
| 파생 | rule_reason_code | PLC Rule + 상태 | 운전사유 |

## 보강 컬럼

AUTO/MANUAL, DO/Timer Set Point, Mode별 Hz가 SQL 이력에서 확보되면 동일 timestamp로 추가한다. 없더라도 현재 확보된 장기 Logger + PLC Rule로 Batch Dataset 생성은 진행한다.

## 학습구간 필터

- Fault 발생구간은 기본 학습에서 제외하고 별도 고장/대체운전 세트로 보관한다.
- RUN=0인데 Hz가 존재하는 경우 A/B 공통 주파수/피드백 구조 여부를 Rule로 판단한 뒤 사용한다.
- AUTO와 MANUAL을 가능한 한 분리하여 성능을 비교한다.
- 통신결측, 고정값, 센서 이상구간은 quality flag로 제외한다.

## 다음 처리

전체 2025-09-24~2026-08-05 장기 CLD를 일괄 변환한 뒤 이 Schema로 M203 Dataset v0.1을 생성한다. 이후 Baseline → XGBoost/LightGBM 머신러닝 회귀모델 → 제약조건 기반 최적화 순으로 진행한다.
