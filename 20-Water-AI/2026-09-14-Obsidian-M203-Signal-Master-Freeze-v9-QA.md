---
title: 2026-09-14 Obsidian M203(송풍기) Signal Master Freeze v9 QA
status: passed
last_updated: 2026-09-14
web_exclude: true
---

# 2026-09-14 Obsidian M203(송풍기) Signal Master Freeze v9 QA

## Source QA

- Markdown: **169개**
- YAML Frontmatter: **157개 파싱 / 오류 0**
- 중복 `doc_id`: **0**
- Markdown code fence 불균형: **0**
- Wiki Link: **973개 검사 / Broken 0**
- CSV: **14개 / 구조 오류 0**
- JSON: **7개 / 파싱 오류 0**

## M203(송풍기) Signal Master v0.9 QA

- 기존 Mapping 행 수 보존: **56 → 56**
- Canonical ID 순서/값 보존: **PASS**
- Canonical ID 중복: **0**
- 정본 필수 컬럼: **27개 / 누락 0**
- `plc_data_type` 빈 값: **0**
- `signal_name` 빈 값: **0**
- `verification_status` 빈 값: **0**
- `evidence_source` 빈 값: **0**
- 1차 머신러닝 Target: **`JN.M203.POWER_W` = M203(송풍기) 유효전력** (원천 단위 W)
- 상태 분포: `CONFIRMED 18 / PARTIAL 5 / HISTORICAL_MISSING 27 / DIRECT_ONLY 6 / OPEN 0`

`OPEN 0`은 미확정 사항이 없다는 뜻이 아니다. Timer 주소계층, ORP 장기이력, AO_MOD/AO_MA_HZ 기능 등은 `PARTIAL`, 과거이력이 없는 값은 `HISTORICAL_MISSING`, 내부 심볼/PLC 직접확인이 필요한 값은 `DIRECT_ONLY`로 분류했다.

## XG5000 근거 적용 원칙

- `%MWx.y`, `%IX...`는 **Boolean/bit 계열**로 반영했다.
- `%MW...`는 **16-bit WORD 메모리 계열**, `%MD...`는 **32-bit DWORD 메모리 계열**로 반영했다.
- XG5000 주소 폭만으로 `INT/UINT/REAL` 또는 Engineering Scale을 임의 확정하지 않았다.
- 정확한 수치 형식·Scale은 향후 **PLC Direct 원시값 ↔ 기존 SCADA/Logger 동시간 비교**에서 v1.0 항목으로 닫는다.

## Freeze Gate

- **M203(송풍기) Signal Master v0.9: PASS / FROZEN**
- `ACT-019`: 완료
- `MS-09B`: 완료/FROZEN
- `ACT-012`: 전체 장기 CLD Batch **착수 가능**
- Rule Book 5개 Open Item: 후속 유지, Batch 비차단

## Freeze 후에도 유지되는 확인 항목

1. `M203_INTLOCK` 접점별 Boolean 조건
2. DO High/Middle/Low ↔ Long/Middle/Short 정지시간 최종 연결
3. `%MW1102 AO_MOD` 값 0 정확한 HMI 명칭
4. `%MW1116 AO_MA_HZ` 정확한 기능
5. 제작사/현장 승인 기준 최대 Hz
6. ORP 장기 Logger Header 전수 확인
7. PLC Direct 원시값과 SCADA/Logger 값의 Scale·지연·평균화 검증

## Web 게시 준비

- `.web/export.mjs` production export: **PASS**
- Release ID: `2026-09-14-m203-signal-master-freeze-v9`
- `.web/update-state.json`: 이전 Release ID 유지 — 실제 Publish 시 신규 popup 1회 생성 목적
- Quartz 전체 Build: **현재 실행환경 DNS 제한으로 GitHub Quartz 소스 fetch 실패**. 기존 Publish 환경에서 전체 게시 필요.

## 다음 작업

**전체 장기 CLD Batch 변환 → M203(송풍기) Master Dataset v0.1 → 전체기간 Baseline → XGBoost/LightGBM 머신러닝 회귀모델 비교 → 제약조건 기반 최적화 → Shadow Replay**
