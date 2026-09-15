---
doc_id: JN-M203-SIGNAL-001
title: M203(송풍기) Signal Master v0.9
plant: 중랑
category: 데이터분석
status: frozen
revision: 0.9-FROZEN
last_updated: 2026-09-14
freeze_date: 2026-09-14
source_refs:
  - SRC-JN-A2PILOT-20260907
  - SRC-JN-CIMON-20260907
  - SRC-DATA-JN-LONG-01
related_wbs:
  - 1.1.1
  - 1.1.2
  - 2.2.1
---

# M203(송풍기) Signal Master v0.9 — FROZEN

## 현재 상태

`04-M203-PLC-SCADA-Logger-Mapping.csv`의 **기존 56행을 폐기하지 않고 확장·정제**하여 2026-09-14 기준 **M203(송풍기) Signal Master v0.9 정본**으로 Freeze했다.

Freeze의 의미는 모든 현장 의문점이 해결됐다는 뜻이 아니다. **현재 확보한 XG5000·CIMON·장기 Logger 근거를 기준으로 컬럼 구조, Canonical ID, 원천주소, 과거이력 상태, AI 사용구분을 고정**하여 전체 장기 CLD Batch 변환을 시작할 수 있다는 뜻이다. 미확인 항목은 `PARTIAL / HISTORICAL_MISSING / DIRECT_ONLY / OPEN` 원칙으로 숨기지 않고 남긴다.

## 정본 CSV 규격

최소 정본 컬럼은 다음과 같다.

`canonical_signal_id, equipment, signal_name, source_plc, plc_ip, plc_symbol, plc_address, plc_data_type, scada_tag, logger_group, logger_tag, sql_tag, unit, scale, sample_cycle, description, read_write, ai_input, ai_output, target, safety_related, control_related, historical_available, direct_plc_required, verification_status, evidence_source, note`

기존 Mapping의 추가 컬럼은 호환성과 근거보존을 위해 삭제하지 않았다.

### Data Type / Scale 판정 원칙

- `%MWx.y`, `%IX...`는 XG5000 주소체계상 **Bit/BOOL 메모리**로 기록했다.
- `%MW...`는 **16-bit WORD 메모리 클래스**, `%MD...`는 **32-bit DWORD 메모리 클래스**로 기록했다.
- 단, 이것만으로 `INT/UINT/REAL`, 부호, 소수 Scale을 확정하지 않는다.
- SCADA/Logger 공학단위는 기존 매핑 근거를 유지하되, **PLC Direct raw 값과 동일 Scale인지**는 Collector 겹침구간 검증 전까지 `OPEN`으로 둔다.
- 따라서 v0.9는 "주소/신호 의미 Freeze"이고, v1.0은 "Direct PLC 값 표현까지 검증된 Freeze"다.

## 핵심 Signal 연결

| Canonical ID | 의미 | PLC / 주소 | SCADA Tag | 과거이력 | AI | 안전/제어 | v0.9 상태 |
|---|---|---|---|---|---|---|---|
| `JN.M203.PROCESS.DO` | 반응조 DO | A2 PILOT `%MW106` | `PID.DO_205.AI_DO_205` | AI Logger 약 15초 | 입력 | 공정 핵심 | CONFIRMED |
| `JN.M203.PROCESS.MLSS` | 반응조 MLSS | A2 PILOT `%MW107` | `PID.MLSS_206.AI_MLSS_206` | AI Logger 약 15초 | 입력 | 공정 | CONFIRMED |
| `JN.M203.PROCESS.ORP` | 반응조 ORP | A2 PILOT `%MW105` | `PID.ORP_204.AI_ORP_204` | 장기 Header 전수확인 필요 | 입력후보 | 공정 | PARTIAL |
| `JN.M203.PROCESS.INFLOW` | 유입유량 | A2 PILOT `%MW100` | `PID.FM_100.AI_FL` | AI Logger 약 15초 | 입력 | 공정 | CONFIRMED |
| `JN.M203.PROCESS.AIR_FLOW` | 송풍량 | A2 PILOT `%MW103` | `PID.FM_202.AI_FL` | AI Logger 약 15초 | 입력/품질 | 공정 | CONFIRMED |
| `JN.M203.A.RUN` / `B.RUN` | M203A/B(송풍기 A/B) RUN | A2 PILOT `%MW11.3/.6` | `DI_RUN` | DI Logger 약 15초 | 입력 | 운전상태 | CONFIRMED |
| `JN.M203.MODE.AUTO_MANUAL` | M203(송풍기) AUTO/MANUAL | A2 PILOT `%MW21.3` | `PID.M_203A.DO_AMC` | 대표 CLD 없음 | 입력 | 안전/학습분리 | HISTORICAL_MISSING |
| `JN.M203.A.FAULT` / `B.FAULT` | M203A/B(송풍기 A/B) Fault | A2 PILOT `%MW11.4/.7` | `DI_FLT` | DI Logger 약 15초 | 입력 | 안전 | CONFIRMED |
| `JN.M203.INTERLOCK` | M203(송풍기) Interlock | 내부 `M203_INTLOCK` | 직접 Tag 미확인 | 없음 | 입력후보 | 안전 | DIRECT_ONLY / Boolean식 Open |
| `JN.M203.HZ_SET_INTERNAL` | PLC 내부 최종 Hz Set | 내부 `M203_HZ_SET` | 직접 Tag 미확인 | 없음 | 권고 비교 | 제어 | DIRECT_ONLY |
| `JN.M203.ACTUAL_HZ` | M203(송풍기) 실제 운전 Hz | A2 PILOT `%MW343` | `PID.M_203A.AI_HZ_IN` | AI Logger 약 15초 | 입력 | 운전결과 | CONFIRMED |
| `JN.M203.HZ_MIN` | M203(송풍기) 최저 Hz | A2 PILOT `%MW169` | `PID.M_203A.AI_HZ_LOW` | AI Logger 약 15초 | 입력 | 안전제약 | CONFIRMED |
| `JN.M203.POWER_W` | M203(송풍기) 유효전력 | A2O `%MD6075` | `AI.E_M_203.AI_UW` | AI Logger 약 15초 | **1차 Target** | 에너지 | CONFIRMED |
| `JN.M203.ENERGY_KWH` | M203(송풍기) 누적전력량 | A2O `%MD6070` | `AI.E_M_203.AI_UKWH` | AI Logger 약 15초 | M&V | 에너지 | CONFIRMED |
| `JN.M203.POWER_FACTOR` | M203(송풍기) 역률 | A2O `%MD6077` | `AI.E_M_203.AI_PF` | AI Logger 약 15초 | 입력후보 | 에너지 | CONFIRMED |

## 자동운전 선택 Bit

| Canonical ID | SCADA Tag | 주소 | 확인된 설명 |
|---|---|---|---|
| `JN.M203.MODE.COMMAND_SELF` | `PID.M_203A.AO_OP_SEL1` | `%MW161.0` | 지령운전 / 자체운전 선택 |
| `JN.M203.MODE.VVVF_TIMER` | `PID.M_203A.AO_OP_SEL2` | `%MW161.1` | 자체운전 시 VVVF / Timer 운전 선택 |
| `JN.M203.MODE.VVVF_AUTO_MANUAL` | `PID.M_203A.AO_OP_SEL3` | `%MW161.2` | VVVF 운전 시 자동 / 수동 선택 |

대표 장기 CLD에 없는 값은 실제 SQL 이력 또는 다른 Logger가 확인되기 전까지 과거 Dataset에 임의 생성하지 않는다. **AUTO로 채우지 않고 UNKNOWN을 유지한다.**

## Timer 주소계층

| 신호 | PLC Rule 내부 변수 | SCADA 노출주소 | v0.9 처리 |
|---|---|---|---|
| Timer ON 진행 | `M203_가동시간 %MW176` | `PID.M_203A.AI_TM_ONPV → %MW1012` | PARTIAL — 둘을 같은 주소로 합치지 않음 |
| Timer OFF 진행 | `M203_정지시간 %MW177` | `PID.M_203A.AI_TM_OFFPV → %MW1013` | PARTIAL — 둘을 같은 주소로 합치지 않음 |

`plc_internal_address`와 `scada_plc_address`를 분리 보존한다. Mirror/MOVE 관계는 Direct Collector 또는 XG5000 상세 Ladder/온라인 값으로 v1.0에서 닫는다.

## READ·WRITE / AI 원칙

- Water-AI Direct Collector는 **PLC READ-only**다.
- 기존 SCADA가 Write하는 Set Point/Command는 `READ/WRITE(SCADA); AI=READ`로 기록한다.
- AI의 Hz 결과는 현재 **권고값**이며 PLC Write 또는 인버터 우회제어를 뜻하지 않는다.
- Shadow → 운영자 승인형 → 검증범위 제한자동 순서를 유지한다.

## v0.9 Freeze Gate 결과

- [x] DO / MLSS / 유입량 / 송풍량 / RUN / Fault / 실제 Hz / kW Canonical ID·원천·단위 연결
- [x] AUTO/MANUAL / Interlock / Hz Set 과거이력 `Y/N/UNKNOWN` 구분
- [x] M203(송풍기) 전력 `%MD6075`, kWh `%MD6070`, PF `%MD6077`를 A2O 계통으로 연결
- [x] Timer `%MW176/177` vs `%MW1012/1013` 주소계층 분리
- [x] 56행 모두 `evidence_source` 및 표준 `verification_status` 보유
- [x] 정본 필수 컬럼 누락 0, Canonical ID 중복 0
- [x] 다음 Batch Converter 출력키를 `canonical_signal_id`로 고정

**결론: v0.9 Freeze 완료. 전체 장기 CLD Batch 변환 Gate 해제.**

## Freeze 후에도 남는 Open Item

Signal Master Freeze를 막지는 않지만 다음은 계속 추적한다.

1. `M203_INTLOCK` 접점별 정확한 Boolean 식
2. DO High/Middle/Low ↔ Long/Middle/Short 정지시간 최종 연결
3. `%MW1102 AO_MOD` 값 0의 정확한 HMI 명칭
4. `%MW1116 AO_MA_HZ` 정확한 Ladder 기능
5. 제작사/현장 승인 기준 최대 Hz
6. ORP 장기 Logger Header 전수확인
7. Direct PLC raw ↔ SCADA/Logger Scale·Delay·Average 동시간 검증

## v1.0 승격 조건

신규 Collector 가동 후 `PLC Direct ↔ 기존 SCADA/Logger` 겹침구간을 비교하여 Data Type 해석, Scale, Delay, Average/Mismatch를 검증한다. 이 결과까지 반영해야 **Direct-PLC Verified Signal Master v1.0**으로 승격한다.

## 관련

- `04-M203-PLC-SCADA-Logger-Mapping.csv` — **v0.9 정본 CSV**
- [[../20-현장-시스템/02-A2O-PLC-SCADA-매핑-상세]]
- [[../20-현장-시스템/03-A2-PILOT-SCADA-매핑-상세]]
- [[../20-현장-시스템/07-A2-PILOT-PLC-Rule-Book]]
- [[05-M203-Master-Dataset-정의]]
- [[../70-개발-검증/01-M203-AI-개발-실행순서-및-도구선정]]
- [[../90-근거-기록/2026-09-14-M203-Signal-Master-v0.9-Freeze-QA]]
