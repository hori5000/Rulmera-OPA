---
doc_id: JN-EVID-M203-SIGNAL-FREEZE-20260914
title: 2026-09-14 M203(송풍기) Signal Master v0.9 Freeze QA
plant: 중랑
category: 근거기록
status: confirmed
recorded_date: 2026-09-14
---

# 2026-09-14 M203(송풍기) Signal Master v0.9 Freeze QA

## 대상

- 정본: `중랑/30-데이터-분석/04-M203-PLC-SCADA-Logger-Mapping.csv`
- 기준: A2 PILOT XG5000 원본 분석, A2O XG5000/전력 매핑, CIMON SCADA 매핑, 장기 Logger 확인결과
- 행 수: **56**

## 자동 QA 결과

- Canonical ID 중복: **0**
- 필수 정본 컬럼 수: **27**
- 필수 컬럼 누락: **0**
- `canonical_signal_id` 빈 값: **0**
- `signal_name` 빈 값: **0**
- `source_plc` 빈 값: **0**
- `plc_data_type` 빈 값: **0**
- `verification_status` 빈 값: **0**
- `evidence_source` 빈 값: **0**

## 검증상태 분포

- `CONFIRMED`: **18**
- `PARTIAL`: **5**
- `HISTORICAL_MISSING`: **27**
- `DIRECT_ONLY`: **6**
- `OPEN`: **0**

`HISTORICAL_MISSING`, `DIRECT_ONLY`, `PARTIAL`은 오류가 아니라 **현재 근거수준을 숨기지 않고 명시한 상태값**이다.

## XG5000 Data Type 판정 범위

주소체계로 메모리 폭을 판정했다.

- `%MWx.y`, `%IX...`: Bit/BOOL
- `%MW...`: 16-bit WORD memory class
- `%MD...`: 32-bit DWORD memory class
- 내부 Symbol: exact type OPEN

단, 아날로그/전력 값의 정확한 `INT/UINT/REAL`, signedness, Scale은 현재 Obsidian에 보존된 근거만으로 확정하지 않았다. Direct Collector가 가동되면 Legacy Logger와 동시간값을 비교하여 v1.0에서 닫는다.

## Freeze 판정

**PASS — M203(송풍기) Signal Master v0.9 Freeze 완료.**

이 판정은 전체 장기 CLD Batch 변환 착수를 허용한다. Rule Book의 5개 Open Item, ORP 장기 Header 전수확인, Direct Scale 검증은 후속 추적항목으로 유지한다.
