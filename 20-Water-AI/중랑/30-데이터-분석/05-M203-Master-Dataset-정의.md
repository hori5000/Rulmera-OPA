---
doc_id: JN-M203-DATASET-001
title: M203 Master Dataset 정의
plant: 중랑
status: ready-after-signal-freeze
revision: 0.3
last_updated: 2026-09-14
related_wbs:
  - 1.1.1
  - 1.1.2
  - 2.2.1
  - 2.2.2
---

# M203 Master Dataset 정의 v0.3

## 목적

장기 CIMON Logger와 A2 PILOT/A2O PLC Signal 기준을 동일 시간축으로 결합해 **운전결과뿐 아니라 가능한 범위의 운전문맥을 설명할 수 있는 M203 학습·Replay 데이터셋**을 만든다.

> **선행 Gate:** [[04-M203-Signal-Master-v0.9|M203 Signal Master v0.9]] QA/Freeze 후 전체 CLD Batch 변환을 수행한다. 컬럼 의미가 고정되기 전에 대량 변환부터 진행하지 않는다.

## 기준 기간

- 현재 확보 장기 Logger: `2025-09-24 ~ 2026-08-05`
- 총 674개 파일 중 CLD 665개
- 원본 CLD는 수정하지 않고 그대로 보존한다.

## 필수 컬럼

| 그룹 | 컬럼 | Canonical/원천 | 용도 | 과거 확보상태 |
|---|---|---|---|---|
| 시간 | `timestamp` | CLD/CSV | 기준시간 | 확보 |
| 공정 | `do_mg_l` | `JN.M203.PROCESS.DO` | 핵심 공정상태 | 확보 |
| 공정 | `mlss_mg_l` | `JN.M203.PROCESS.MLSS` | 공정상태 | 확보 |
| 공정 | `orp` | `JN.M203.PROCESS.ORP` | 공정상태 후보 | **장기 Header 전수확인 후 사용** |
| 공정 | `inflow` | `JN.M203.PROCESS.INFLOW` | 부하상태 | 확보 |
| 공정 | `air_flow` | `JN.M203.PROCESS.AIR_FLOW` | 송풍 결과/품질 | 확보 |
| 설비 | `m203_a_run / m203_b_run` | DI Logger | 실제 가동기 식별 | 확보 |
| 설비 | `m203_a_fault / m203_b_fault` | DI Logger | 고장/대체운전 구분 | 확보 |
| 제어 | `m203_auto_manual` | `%MW21.3 / PID.M_203A.DO_AMC` | Mode 분리 | **대표 CLD 미확보; 확인 전 UNKNOWN** |
| 안전 | `m203_interlock` | `M203_INTLOCK` | 안전상태 | **과거이력 미확인** |
| 제어 | `m203_do_mode` | `JN.M203.DO_MODE_SELECTED` | PLC 선택 Mode | 확보 |
| 제어 | `m203_timer_on_pv / off_pv` | AI Logger | 시간운전 단계 | 확보, 주소계층 관계 추가확인 |
| 제어 | `m203_hz_low` | `JN.M203.HZ_MIN` | 최저 Hz 제약 | 확보 |
| 제어 | `m203_hz_set` | 내부 `M203_HZ_SET` 또는 검증된 이력 Source | 당시 목표/제어값 | **임의 생성 금지** |
| 결과 | `m203_hz_actual` | `JN.M203.ACTUAL_HZ` | 실제 운전 Hz | 확보 |
| 에너지 | `m203_power_w` | A2O `%MD6075` | **1차 머신러닝 회귀모델 Target** | 확보 |
| 에너지 | `m203_kwh` | A2O `%MD6070` | M&V | 확보 |
| 에너지 | `m203_pf` | A2O `%MD6077` | 전력상태 후보 | 확보 |

## 상태·품질 Label

원본값은 삭제하지 않고 아래 파생 Label을 추가한다.

### `operation_label`

- `AUTO_NORMAL`: AUTO 근거가 있고 RUN/센서/안전상태가 정상인 구간
- `MANUAL`: MANUAL 근거가 있는 구간
- `STOP`: 비가동 구간
- `FAULT`: Fault 구간
- `INTERLOCK`: Interlock 이력이 확인되는 경우
- `MODE_UNKNOWN`: AUTO/MANUAL 과거값을 확인할 수 없는 구간

### `quality_label`

- `NORMAL`
- `MISSING`
- `DUPLICATE`
- `SENSOR_STUCK`
- `OUTLIER_REVIEW`
- `COMM_GAP`
- `SENSOR_ABNORMAL`

각 판정은 원본 행을 지우는 것이 아니라 별도 Flag로 기록하고 학습 필터에서 사용한다.

## 파생/설명 컬럼

- `do_band = HIGH/MIDDLE/LOW/UNKNOWN`
- `selected_unit = A/B/BOTH/NONE/UNKNOWN`
- `m203_fault_any`
- `m203_timer_phase = RUN/OFF/UNKNOWN`
- `rule_reason_code`
- `source_dataset_version`
- `signal_master_version`
- `rule_book_version`
- `source_lineage`

`rule_reason_code`는 근거가 있는 범위에서만 생성한다. AUTO/MANUAL 또는 Interlock 이력이 없는데 `AUTO_DO_MODE_3` 같은 원인코드를 억지로 만들지 않는다.

## 학습구간 필터 원칙

1. **AUTO와 MANUAL을 섞지 않는다.** Mode 이력이 신뢰 가능한 `AUTO_NORMAL`을 1차 학습 기준으로 한다.
2. `MODE_UNKNOWN`은 모델 개발 초기의 주학습세트와 분리하고 Baseline/데이터품질 분석에는 보존한다.
3. Fault/Interlock 구간은 정상운전 학습에서 제외하고 별도 예외/대체운전 분석세트로 보관한다.
4. MANUAL 데이터도 삭제하지 않고 운전자 판단과 AUTO 운전을 비교하는 분석자료로 보관한다.
5. 결측·고정값·통신중단·센서 이상은 `quality_label`로 분리한다.
6. 시계열 모델 검증 시 랜덤분할 대신 시간순 분할을 기본으로 한다.

## Batch 처리 순서

```text
Signal Master v0.9 QA/Freeze
        ↓
665개 CLD 원본 Inventory
        ↓
AI / DI / DI2 Header·Tag 검증
        ↓
CLD Batch 변환
        ↓
Parquet Staging
        ↓
시간정렬 / 품질 Flag
        ↓
M203 Master Dataset v0.1
        ↓
전체기간 Baseline
        ↓
XGBoost / LightGBM 머신러닝 회귀모델 비교
        ↓
Historical / Shadow Replay
```

## 저장·도구 원칙

- 원본: CLD 그대로 보존
- Batch/Staging: Parquet 권고
- 로컬 분석: DuckDB + Python/Polars/PyArrow 사용 가능
- Excel: 사람 검토/보고 Export 용도
- **DuckDB는 공식 운영/Canonical DB 선택을 의미하지 않는다.** 공식 DB는 공통 원천 DB 가이드의 4인 Gate로 확정한다.

## 1차 모델 목표

먼저 `M203 kW`를 예측하는 **머신러닝 회귀모델**을 만든다.

```text
운전 Hz + RUN + 유입량 + DO + 공정상태
        → M203 kW
```

Baseline 결과를 보고 Feature를 확정한 뒤 XGBoost/LightGBM을 동일 조건으로 비교한다. 동시에 별도 분석으로 공정상태 ↔ 필요한 Hz/송풍량 관계를 본다. 처음부터 LSTM이나 MPC로 가지 않는다.

## 다음 단계

Dataset v0.1 이후 순서는 **전체기간 Baseline → XGBoost/LightGBM 머신러닝 회귀모델 → 제약조건 기반 최적화 → Shadow Replay**다.
