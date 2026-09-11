---
doc_id: JN-M203-RULE-001
title: M203 송풍기 PLC Rule Book
plant: 중랑
status: source-confirmed-with-open-items
revision: 1.0
last_updated: 2026-09-11
source_refs:
  - SRC-JN-A2PILOT-20260907
  - SRC-JN-CIMON-20260907
  - SRC-DATA-JN-LONG-01
related_wbs:
  - 1.1.1
  - 2.2.1
  - 2.5.2
---

# M203 송풍기 PLC Rule Book v1.0

## 기준

이 문서는 2026-09-07 확보한 `중랑처리장_A2O_Pilot_260508.xgwx`와 CIMON SCADA `DBX/PGX/SQL`을 교차대조한 결과다. **PLC 소스에서 확인한 Rule**과 **합리적 추정**, **추가 확인 항목**을 구분한다.

## 1. 소스 구조

A2 PILOT 원본에는 다음 4개 프로그램이 있다.

- `VVVF_통신`
- `CONTROL_MAIN`
- `Analog_Input`
- `VVVF_Control`

M203 제어는 주로 `CONTROL_MAIN + Analog_Input + VVVF_Control`에 걸쳐 있다.

## 2. M203 운전 입력과 상태

| 구분 | PLC Symbol | 주소 | SCADA Tag | 역할 | 상태 |
|---|---|---|---|---|---|
| AUTO/MANUAL | M203_Auto_Man | `%MW21.3` | `PID.M_203A.DO_AMC` | 자동/수동 선택 | 확정 |
| 수동 RUN | M203_M_ON | `%MW21.4` | `PID.M_203A.DO_RUC` | HMI 수동 RUN | 확정 |
| 수동 STOP | M203_M_OFF | `%MW21.5` | `PID.M_203A.DO_STC` | HMI 수동 STOP | 확정 |
| Remote A 선택 | M203_REM_A선택 | `%MW21.6` | `PID.M_203B.DO_203A` | A 선택 | 확정 |
| Remote B 선택 | M203_REM_B선택 | `%MW21.7` | `PID.M_203B.DO_203B` | B 선택 | 확정 |
| Local A 선택 | M203_LOC_A선택 | `%IX0.6.14` | - | 현장 Local A 선택 | 확정 |
| Local B 선택 | M203_LOC_B선택 | `%IX0.6.15` | - | 현장 Local B 선택 | 확정 |
| A RUN | M203A_Run | `%MW11.3` | `PID.M_203A.DI_RUN` | 실제 A 운전상태 | 확정 |
| A Fault | M203A_Fault | `%MW11.4` | `PID.M_203A.DI_FLT` | A 고장 | 확정 |
| B RUN | M203B_Run | `%MW11.6` | `PID.M_203B.DI_RUN` | 실제 B 운전상태 | 확정 |
| B Fault | M203B_Fault | `%MW11.7` | `PID.M_203B.DI_FLT` | B 고장 | 확정 |
| 통합 Fault | M203_Fault | `%MW347.3` | - | M203 통합 Fault | 확정 |
| Interlock | M203_INTLOCK | 내부변수 | - | 최종 운전 허용조건 계통 | 존재 확정 / 접점식 상세 확인 필요 |

### HMI 명령 방식

CIMON 송풍기 Popup은 `DO_RUC`, `DO_STC`에 **3,000 ms Pulse**를 전송한다. 따라서 SCADA 명령은 지속 Bit가 아니라 순간 명령으로 보고 PLC 내부 Sequence가 실제 운전을 유지하는 구조다.

## 3. DO 상태 판정 Rule

| 항목 | 주소 | 설명 |
|---|---|---|
| 실제 DO | `%MW106` | `PID.DO_205.AI_DO_205` |
| High Set | `%MW157` | `PID.DO_205.AO_DO_H_SET` |
| Middle Set | `%MW158` | `PID.DO_205.AO_M_SET` |
| Low Set | `%MW159` | `PID.DO_205.AO_DO_L_SET` |
| High 상태 | `%MW160.0` | `PID.DO_205.AI_DO_HI` |
| Middle 상태 | `%MW160.1` | `PID.DO_205.AI_DO_MID` |
| Low 상태 | `%MW160.2` | `PID.DO_205.AI_DO_LO` |

`Analog_Input`에서 DO High/Low 판정에 `T#10S` 시간요소가 사용된다. 즉 순간 노이즈만으로 바로 상태를 전환하지 않도록 지연/유지 논리가 들어간 구조로 판단한다. **정확한 비교 부호와 접점 극성은 XG5000 화면 확인 전까지 확정하지 않는다.**

## 4. 자동운전 Rule 계통

### 4.1 간헐/시간 운전

PLC에는 `간헐운전` Function Block과 다음 값이 있다.

| 항목 | 주소 | 소스 초기값/비고 |
|---|---|---|
| 가동시간 설정 | `%MW172` | `M203_가동설정` |
| 정지시간 Long | `%MW173` | 소스 초기값 `10` |
| 정지시간 Middle | `%MW174` | 소스 초기값 `5` |
| 정지시간 Short | `%MW175` | 소스 초기값 `0` |
| 가동 진행시간 | `%MW176` | `M203_가동시간` |
| 정지 진행시간 | `%MW177` | `M203_정지시간` |
| 시간기준 | - | `T#1M` 사용 확인 |

또한 DO High/Middle/Low 상태에 따라 정지시간 후보를 선택하는 MOVE 분기 구조가 존재한다. **High/Middle/Low ↔ L/M/S의 최종 1:1 대응은 그래픽 Ladder에서 한 번 더 확인 후 확정한다.**

### 4.2 DO Mode 운전

| 항목 | 주소 | SCADA Tag | 역할 |
|---|---|---|---|
| 자동운전 Mode | `%MW1102` | `PID.M_203A.AO_MOD` | 시간/DO 계통 선택 관련 |
| Mode-1 설정 | `%MW1105` | `...AO_DO_MOD1` | DO Mode-1 |
| Mode-3 설정 | `%MW1106` | `...AO_DO_MOD3` | DO Mode-3 |
| Mode-4 설정 | `%MW1107` | `...AO_DO_MOD4` | DO Mode-4 |
| Mode-1 Hz | `%MW1108` | `...AO_DO_MOD1_HZ` | Mode-1 적용 Hz |
| Mode-2 Hz | `%MW1109` | `...AO_DO_MOD2_HZ` | Mode-2 적용 Hz |
| Mode-3 Hz | `%MW1110` | `...AO_DO_MOD3_HZ` | Mode-3 적용 Hz |
| Mode-4 Hz | `%MW1111` | `...AO_DO_MOD4_HZ` | Mode-4 적용 Hz |
| 선택 Mode | `%MW1016` | `...AI_DO_MOD_SET` | 현재 선택된 1~4 Mode |

HMI Popup도 `AI_DO_MOD_SET == 1/2/3/4`에 따라 각각 Mode 1~4 화면/Hz를 표시한다. 따라서 **PLC가 DO 상태/제어조건을 이용해 Mode를 선택하고 그 Mode의 Hz를 적용하는 계통**은 확정할 수 있다.

## 5. Hz 결정과 VVVF 출력

| 단계 | 변수 | 주소 | 의미 |
|---|---|---|---|
| 수동 Hz | `M203_MAN_HZ` | `%MW163` | 수동 주파수 설정 |
| 내부 최종 Set | `M203_HZ_SET` | 내부 | CONTROL_MAIN의 최종 Hz 결정값 |
| VVVF 출력 | `M203_HZ_OUT` | `%MW340` | VVVF_Control 출력 Hz |
| 실제 피드백 | `AI_HZ_IN` | `%MW343` | SCADA/Logger 실제 운전 Hz |
| 최저 Hz | `AI_HZ_LOW` | `%MW169` | VVVF 최저 Hz 제약 |

`VVVF_Control`에 `M203_HZ_SET → M203_HZ_OUT` 경로가 존재한다. 최종적으로 과거 운전의 원인은 `AUTO/MANUAL + A/B + Fault/Interlock + 자동운전 전략 + DO Mode/시간운전 + Hz Set`의 조합으로 해석해야 한다.

## 6. 장기 Logger와의 결합

장기 SCADA Logger는 이미 확보되어 있으며, 대표 AI Header에서 다음이 실제 존재한다.

- `PID.M_203A.AI_HZ_IN`
- `PID.M_203A.AI_DO_MOD_SET`
- `PID.M_203A.AI_TM_ONPV`, `AI_TM_OFFPV`
- `PID.M_203A.AI_HZ_LOW`
- `PID.DO_205.AI_DO_205`
- `PID.MLSS_206.AI_MLSS_206`
- `PID.FM_100.AI_FL`, `PID.FM_202.AI_FL`
- `AI.E_M_203.AI_UW`, `AI_UKWH`, `AI_PF` 등

DI Logger에는 A/B RUN·FAULT가 존재한다. 따라서 **과거 운전 결과와 선택된 DO Mode를 PLC Rule에 대입해 운전사유를 상당부분 복원 가능**하다.

반면 AUTO/MANUAL, 일부 Set Point/Mode 파라미터는 대표 CLD Header에는 없다. 하지만 CIMON `.sql` 설정에는 `AO_OP_SEL1/2/3`, `AO_DOA_SV`, `AO_DOM_SV`, `AO_TM_*`, DO High/Mid/Low 및 설정값이 정의되어 있으므로, 실제 SQL 이력이 남아 있다면 추가 결합할 가치가 있다. 이것은 오프라인 AI 착수의 선행조건이 아니라 **Rule 재현 정확도를 높이는 보강자료**다.

## 7. AI용 Rule Reason Code 제안

Master Dataset에는 원시 Tag만 넣지 말고 다음 파생 컬럼을 만든다.

- `m203_selected_unit = A/B`
- `m203_auto_manual`
- `m203_do_band = HIGH/MIDDLE/LOW`
- `m203_do_mode = 1/2/3/4`
- `m203_interlock_ok`
- `m203_fault_any`
- `m203_timer_phase = RUN/OFF`
- `m203_rule_reason_code`
- `m203_hz_actual`
- `m203_power_w`

예시 Reason Code: `AUTO_DO_MODE_3`, `AUTO_TIMER_OFF`, `MANUAL_HZ`, `FAULT_BLOCK`, `A_FAILOVER_TO_B`.

## 8. AI 제어에서 고정할 안전경계

- AI가 인버터를 직접 제어하지 않는다.
- AUTO/MANUAL, Interlock, Fault, A/B 선택, 최저 Hz 등 기존 PLC Rule을 우회하지 않는다.
- 1단계는 Shadow Mode로 `현재 실제 Hz`와 `AI 권고 Hz`를 비교한다.
- 제한적 자동제어는 Rule Book의 미확정 항목과 현장 승인조건이 모두 닫힌 뒤 검토한다.

## 9. 아직 추가 확인이 필요한 것

1. `M203_INTLOCK` 구성 접점의 정확한 Boolean 식
2. DO High/Middle/Low와 정지시간 L/M/S의 최종 대응
3. `AO_MOD %MW1102` 값 0의 정확한 HMI 명칭
4. `%MW1116 AO_MA_HZ`의 정확한 Ladder 기능
5. 설비 제작사 기준 허용 최대 Hz와 현장 승인 상·하한

위 5개를 제외한 **M203의 주요 제어계층, 주소, SCADA Tag, DO Mode, Timer 계통, Hz 출력 경로는 원본 소스로 확인됐다.**
