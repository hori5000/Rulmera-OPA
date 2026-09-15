---
title: 2026-09-14 M203(송풍기) Signal Master v0.9 Freeze
status: active
last_updated: 2026-09-14
---

# 2026-09-14 M203(송풍기) Signal Master v0.9 Freeze

## 완료

- 기존 Mapping CSV **56행 유지**
- Signal Master 필수 정본 컬럼 확장 완료
- `plc_data_type` 메모리 주소폭 기준 보강
- `sql_tag`, `scale`, `sample_cycle`, `target`, `historical_available`, `direct_plc_required` 보강
- `verification_status`를 `CONFIRMED / PARTIAL / HISTORICAL_MISSING / DIRECT_ONLY / OPEN` 체계로 정규화
- Canonical ID 중복 0, 필수값 QA PASS
- M203(송풍기) Signal Master v0.9 **FROZEN**

## 중요한 제한

- XG5000 주소폭으로 WORD/DWORD는 구분했지만 실제 `INT/REAL`, signedness, Direct Scale은 근거 없이 확정하지 않았다.
- AUTO/MANUAL 대표 장기이력 없음 → 과거 Dataset에서 AUTO 임의추론 금지, `UNKNOWN` 유지.
- Interlock Boolean식, DO band↔정지시간, AO_MOD=0, AO_MA_HZ, 최대 Hz는 Rule Book Open Item 유지.
- ORP 장기 Header 포함 여부는 전체 Batch Header 전수검사에서 닫는다.

## 다음 작업

**전체 장기 CLD Batch 변환 → M203(송풍기) Master Dataset v0.1 → Baseline → XGBoost/LightGBM 머신러닝 회귀모델 → 제약조건 기반 최적화 → Shadow Replay**

Collector는 병행 개발하고, Direct PLC↔Legacy 동시간검증 후 Signal Master v1.0으로 승격한다.
