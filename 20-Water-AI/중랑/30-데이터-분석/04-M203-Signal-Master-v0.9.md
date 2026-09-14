---
doc_id: JN-M203-SIGNAL-001
title: M203 Signal Master v0.9
plant: 중랑
category: 데이터분석
status: qa-in-progress
revision: 0.9
last_updated: 2026-09-14
source_refs:
  - SRC-JN-A2PILOT-20260907
  - SRC-JN-CIMON-20260907
  - SRC-DATA-JN-LONG-01
related_wbs:
  - 1.1.1
  - 1.1.2
  - 2.2.1
---

# M203 Signal Master v0.9

## 목적

M203 관련 신호를 **PLC Symbol / PLC 주소 / SCADA Tag / Logger / SQL / 단위 / READ·WRITE / AI 입력·출력 / 안전 관련 여부**까지 한 기준선으로 연결한다. 이후 장기 CLD Batch 변환, Master Dataset, Baseline, 모델, Replay는 이 Signal Master의 Canonical ID를 사용한다.

> 상세 전체표의 정본 후보는 `04-M203-PLC-SCADA-Logger-Mapping.csv`다. 현재 파일은 기존 Mapping을 폐기하지 않고 Signal Master 필드를 확장한 v0.9다.

## 핵심 Signal 연결

| Canonical ID | 의미 | PLC / 주소 | SCADA Tag | 과거이력 | AI | 안전/제어 | 상태 |
|---|---|---|---|---|---|---|---|
| `JN.M203.PROCESS.DO` | 반응조 DO | A2 PILOT `%MW106` | `PID.DO_205.AI_DO_205` | AI Logger | 입력 | 공정 핵심 | 확정 |
| `JN.M203.PROCESS.MLSS` | 반응조 MLSS | A2 PILOT `%MW107` | `PID.MLSS_206.AI_MLSS_206` | AI Logger | 입력 | 공정 | 확정 |
| `JN.M203.PROCESS.ORP` | 반응조 ORP | A2 PILOT `%MW105` | `PID.ORP_204.AI_ORP_204` | **장기 Header 전수확인 필요** | 입력후보 | 공정 | 매핑확정/이력확인필요 |
| `JN.M203.PROCESS.INFLOW` | 유입유량 | A2 PILOT `%MW100` | `PID.FM_100.AI_FL` | AI Logger | 입력 | 공정 | 확정 |
| `JN.M203.PROCESS.AIR_FLOW` | 송풍량 | A2 PILOT `%MW103` | `PID.FM_202.AI_FL` | AI Logger | 입력/품질 | 공정 | 확정 |
| `JN.M203.A.RUN` | M203A RUN | A2 PILOT `%MW11.3` | `PID.M_203A.DI_RUN` | DI Logger | 입력 | 운전상태 | 확정 |
| `JN.M203.B.RUN` | M203B RUN | A2 PILOT `%MW11.6` | `PID.M_203B.DI_RUN` | DI Logger | 입력 | 운전상태 | 확정 |
| `JN.M203.MODE.AUTO_MANUAL` | AUTO/MANUAL | A2 PILOT `%MW21.3` | `PID.M_203A.DO_AMC` | 대표 CLD에는 없음 / SQL 설정 존재 | 입력 | **안전/학습분리** | PLC/SCADA 확정, 과거이력 확인필요 |
| `JN.M203.A.FAULT` | A Fault | A2 PILOT `%MW11.4` | `PID.M_203A.DI_FLT` | DI Logger | 입력 | **안전** | 확정 |
| `JN.M203.B.FAULT` | B Fault | A2 PILOT `%MW11.7` | `PID.M_203B.DI_FLT` | DI Logger | 입력 | **안전** | 확정 |
| `JN.M203.INTERLOCK` | M203 Interlock | A2 PILOT 내부 `M203_INTLOCK` | 직접 Tag 미확인 | 과거이력 미확인 | 입력후보 | **안전** | 존재확정/Boolean식 Open |
| `JN.M203.HZ_SET_INTERNAL` | PLC 최종 Hz Set | A2 PILOT 내부 `M203_HZ_SET` | 직접 Tag 미확인 | 과거이력 미확인 | 향후 권고 비교 | **제어** | 내부심볼 확정 |
| `JN.M203.ACTUAL_HZ` | 실제 운전 Hz | A2 PILOT `%MW343` | `PID.M_203A.AI_HZ_IN` | AI Logger | 입력 | 운전결과 | 확정 |
| `JN.M203.HZ_MIN` | 최저 Hz | A2 PILOT `%MW169` | `PID.M_203A.AI_HZ_LOW` | AI Logger | 입력 | **안전제약** | 확정 |
| `JN.M203.POWER_W` | M203 유효전력 | A2O `%MD6075` | `AI.E_M_203.AI_UW` | AI Logger | **Target** | 에너지 | 확정 |
| `JN.M203.ENERGY_KWH` | M203 누적전력량 | A2O `%MD6070` | `AI.E_M_203.AI_UKWH` | AI Logger | M&V | 에너지 | 확정 |
| `JN.M203.POWER_FACTOR` | M203 역률 | A2O `%MD6077` | `AI.E_M_203.AI_PF` | AI Logger | 입력후보 | 에너지 | 확정 |

## 자동운전 선택 Bit

SCADA/PLC 자료에는 M203 자동운전 선택계통이 3개 Bit로 확인된다.

| Canonical ID | SCADA Tag | 주소 | 확인된 설명 |
|---|---|---|---|
| `JN.M203.MODE.COMMAND_SELF` | `PID.M_203A.AO_OP_SEL1` | `%MW161.0` | 지령운전 / 자체운전 선택 |
| `JN.M203.MODE.VVVF_TIMER` | `PID.M_203A.AO_OP_SEL2` | `%MW161.1` | 자체운전 시 VVVF / 타이머 운전 선택 |
| `JN.M203.MODE.VVVF_AUTO_MANUAL` | `PID.M_203A.AO_OP_SEL3` | `%MW161.2` | VVVF 운전 시 자동 / 수동 선택 |

대표 장기 CLD에 없는 값은 SQL 실제 이력 확인 전까지 과거 Dataset에 임의 생성하지 않는다.

## 주소계층 주의 — Timer 진행값

현재 자료에는 두 주소계층이 함께 존재한다.

| 신호 | PLC Rule Book 내부 변수 | SCADA 매핑 주소 | 처리 |
|---|---|---|---|
| Timer ON 진행 | `M203_가동시간 %MW176` | `PID.M_203A.AI_TM_ONPV → %MW1012` | **같다고 단정하지 않음**. Mirror/MOVE/노출주소 관계 확인 필요 |
| Timer OFF 진행 | `M203_정지시간 %MW177` | `PID.M_203A.AI_TM_OFFPV → %MW1013` | **같다고 단정하지 않음**. Mirror/MOVE/노출주소 관계 확인 필요 |

따라서 CSV에 `plc_internal_address`와 `scada_plc_address`를 분리했다. 이 불일치를 억지로 하나의 주소로 덮어쓰지 않는다.

## READ·WRITE / AI 원칙

- 새 Water-AI Collector는 **PLC READ-only**다.
- SCADA가 기존에 쓰는 Set Point/Command 주소는 Signal Master에 `READ/WRITE(SCADA); AI=READ`로 표시한다.
- AI의 `Hz Set`은 현재 단계에서 **권고값**이다. PLC Write 또는 인버터 직접제어를 의미하지 않는다.
- AI 출력 적용은 Shadow → 운영자 승인형 → 검증된 범위의 제한자동 순으로만 검토한다.

## 과거 AUTO/MANUAL 처리 원칙

`PID.M_203A.DO_AMC` 자체의 PLC/SCADA 매핑은 확정됐지만 대표 장기 CLD Header에는 없다. 따라서:

1. SQL 또는 다른 Logger에서 실제 과거 이력이 확인되면 timestamp로 결합한다.
2. 확인되지 않은 구간은 `MODE_UNKNOWN`으로 유지한다.
3. AUTO라고 추정해 채우지 않는다.
4. 1차 학습은 Mode가 신뢰 가능한 `AUTO_NORMAL` 구간을 우선 사용한다.
5. MANUAL 데이터는 버리지 않고 별도 비교/운전자 판단 분석에 보관한다.

## v0.9 Freeze Gate

전체 장기 CLD Batch 변환 전에 최소 다음을 통과한다.

- [ ] DO / MLSS / 유입량 / 송풍량 / RUN / Fault / 실제 Hz / kW의 Canonical ID·원천·단위가 연결됨
- [ ] AUTO/MANUAL / Interlock / Hz Set은 과거 이력 `있음/없음/미확인`이 구분됨
- [ ] M203 전력 `%MD6075`, kWh `%MD6070`, PF `%MD6077`가 A2O 계통으로 연결됨
- [ ] Timer `%MW176/177` vs `%MW1012/1013` 주소계층 차이가 명시됨
- [ ] 각 행에 근거 문서와 검증상태가 있음
- [ ] Batch Converter는 Canonical ID를 기준으로 출력함

## v1.0 승격 조건

신규 Collector가 동작한 뒤 일정 기간 `PLC Direct ↔ 기존 SCADA/Logger`를 동시에 비교하여 Scale/Delay/Average/Mismatch를 판정한다. 그 결과까지 반영해야 **Direct-PLC Verified Signal Master v1.0**으로 승격한다.

## 관련

- `04-M203-PLC-SCADA-Logger-Mapping.csv`
- [[../20-현장-시스템/02-A2O-PLC-SCADA-매핑-상세]]
- [[../20-현장-시스템/03-A2-PILOT-SCADA-매핑-상세]]
- [[../20-현장-시스템/07-A2-PILOT-PLC-Rule-Book]]
- [[05-M203-Master-Dataset-정의]]
- [[../70-개발-검증/01-M203-AI-개발-실행순서-및-도구선정]]
