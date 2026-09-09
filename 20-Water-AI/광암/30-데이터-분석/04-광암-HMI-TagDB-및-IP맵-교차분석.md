---
doc_id: GW-DATA-004
title: 광암 HMI Tag DB 및 제어망 IP 맵 교차분석
plant: 광암
category: 데이터분석
status: confirmed
revision: 0.1
last_updated: 2026-09-09
source_refs:
  - SRC-GW-HUB-IPMAP-201609
  - SRC-GW-HMI-DATA-20240502
  - SRC-PREVISIT-HMI-GW-20260909
  - SRC-WONDERWARE-GW-20260908
---

# 광암 HMI Tag DB 및 제어망 IP 맵 교차분석

## 1. 이번에 추가 분석한 원본

### 제어망 IP 문서

```text
★광암정수장 제어실 HUB PORT별 정보(201609).xlsx
```

문서 속성:

```text
Created  : 2011-09-26
Modified : 2021-09-17
Sheet    : IP 번호(LINE A) / IP 번호(LINE B) / IP 번호(정보)
```

파일명은 `201609`이므로 **과거 제어망 관리문서**로 취급한다. 2026 현재 상태를 단독으로 확정하는 자료가 아니라, 2024/2026 설정과 교차검증하는 근거다.

### HMI 정리 문서

```text
광암정수센터_HMI자료정리.xlsx
```

문서 속성:

```text
Created  : 2024-04-12
Modified : 2024-05-02
Sheets   : 25
```

`광암_태그` Sheet는 단순 사람이 작성한 목록이 아니라 다음 InTouch Tag DB Export 계열 형식을 포함한다.

```text
:mode=ask
:IOAccess
:IODisc
:IOReal
```

즉 **InTouch DBDump/Tagname Export에 가까운 구조화 데이터**로 볼 수 있다.

---

## 2. 211 / 212 대역의 의미가 더 명확해짐

HUB 문서 Sheet 이름에서 직접:

```text
192.9.211.x = LINE A
192.9.212.x = LINE B
```

로 관리되어 있다.

따라서 기존 Obsidian의 `211/212 이중망` 표현은 유지하되, 이제는 최소한 **과거 제어망 문서에서 LINE A / LINE B로 명시되어 있었다**고 기록할 수 있다.

단 다음처럼 단순화하지 않는다.

```text
LINE A = 항상 Primary
LINE B = 항상 Standby
```

실제로 설비마다 구조가 다르다.

- PCS1: `.10 MASTER / .11 SLAVE`
- PCS2: `.12 MASTER / .13 SLAVE`
- PCS4: `.14 MASTER / .15 SLAVE`
- PCS-M: `.16 MASTER / .17 SLAVE`
- P23 오존: `.23 MASTER / .24 SLAVE`
- P30 중계펌프: `.30 MASTER / .31 SLAVE`
- P6 활성탄: `.32 MASTER / .33 SLAVE`
- P21/P22/P25/P26 등은 같은 장비가 LINE A/B 양쪽 IP를 갖는 형태로 보임
- P27 AOP는 과거 LINE B에 `192.168.80.2 예정`으로 기록되어 있어 모든 장비가 완전 대칭 구조는 아님

---

## 3. `192.9.211.120 / 192.9.212.120`의 정체

HUB 문서에서 두 주소 모두 다음으로 직접 적혀 있다.

```text
192.9.211.120 = 감시제어 OS POS 11
192.9.212.120 = 감시제어 OS POS 11
```

이것은 매우 중요하다.

기존 자료의:

```text
\\192.9.211.120\GFENet
\\192.9.211.120\VIEW
\\192.9.212.120\VIEW
```

이 단순한 미상 서버 주소가 아니라 **POS11 감시제어 HMI 노드의 LINE A/B 주소**라는 점을 교차검증한다.

따라서 현재 구조는 다음처럼 이해한다.

```text
PLC LINE A/B
→ POS11 통신/HMI 계층
   - 211.120
   - 212.120
→ InTouch
```

다만 `GFENet` 프로세스가 정확히 DeviceXPlorer인지 여부는 아직 별도 확인한다.

---

## 4. HMI `IOAccess`에서 다시 확인된 Source

2024 HMI 정리문서 `광암_태그`에는 총 20개 IOAccess가 있다.

주요 GFENet Source:

```text
P1, P2, P4, P6, P7, P8,
P21, P22, P23, P25, P26, P27, P30,
P52, P56, PLC3
```

모두:

```text
Application = \\192.9.211.120\GFENet
```

으로 정의되어 있다.

추가 Source:

```text
OPC             → \\localhost\FSGateway / OPC_DeviceGroup
Galaxy          → \\NA\NA / NA
HistdataViewstr → \\192.168.0.120\HistData / ViewStream1
INTOUCH         → Primary   \\192.9.211.120\VIEW / TAGNAME
                  Secondary \\192.9.212.120\VIEW / TAGNAME
```

### 중요한 History 주소 불일치

기존 2024-03-29 POS11 `dde.cfg` 분석에서는:

```text
\\192.9.211.120\HistData
```

였는데, 이번 `광암정수센터_HMI자료정리.xlsx`에는:

```text
\\192.168.0.120\HistData
```

로 기록돼 있다.

따라서 History Source 주소는 **2024 자료끼리도 차이가 있다.**

현재는 어느 하나를 오류라고 지우지 않고:

```text
서로 다른 HMI Node/Export 시점/환경 설정 차이 가능성
→ 현재 2026 런타임에서 재확인 필요
```

로 관리한다.

---

## 5. `광암_태그`에서 직접 얻은 Tag 규모

이번 Sheet에서 직접 파싱한 Tag Type은 다음 두 종류다.

| Tag Type | 수량 |
|---|---:|
| IODisc | 10,146 |
| IOReal | 4,724 |
| 합계 | **14,870** |

기존 `dde.cfg` GFENet Point 14,983개보다 적다.

이는 곧바로 서로 틀렸다는 뜻이 아니다. `광암_태그` Sheet에는 이번 확인 기준 `IODisc/IOReal`만 나타나므로, 다른 Tag Type 또는 보조 Point가 제외됐을 수 있다.

따라서:

```text
dde.cfg = 통신 Point 기준
광암_태그 = Tag DB 메타데이터 기준
```

으로 상호보완해서 사용한다.

---

## 6. History Logging 설정에서 새로 확인된 사실

### Analog / IOReal

총 4,724개 중:

```text
Logged = Yes : 4,214
Logged = No  :   510
```

즉 **대부분의 IOReal Tag가 HMI Tag DB에서 Logged=Yes**로 설정되어 있다.

이것은 광암에서 과거 수치 데이터가 저장됐을 가능성을 강하게 높인다.

다만 `Logged=Yes`가 곧:

```text
Wonderware Historian Server에 반드시 저장됨
```

을 뜻하지는 않는다.

InTouch 자체 Historical Logging일 수 있으므로 `dhistcfg.ini`, Historian Tag Export, 실제 시계열 데이터로 최종 확인한다.

### Digital / IODisc

총 10,146개 중:

```text
Logged = Yes : 12
Logged = No  : 10,134
```

반면 AlarmState는:

```text
On   : 3,498
Off  : 8
None : 6,640
```

이다.

즉 구조상:

```text
Analog → History Logging 중심
Digital → Alarm/Event 중심
```

성격이 강하게 보인다.

이는 기존 `WWALMDB = Alarm/Event DB` 판정과도 잘 맞는다.

---

## 7. P52 / P56 / PLC3의 역할이 더 구체화됨

### P52

```text
IOReal 417개
Logged=No 417개
```

`여과지동_P2P52` Sheet에서 P2와 함께 묶여 있고, FCC/여과 시간·상태 관련 Tag가 많다.

따라서 기존의 단순 `추가 Topic`보다 한 단계 더 구체적으로:

> **P52는 여과지동/PCS2 계열의 보조 또는 별도 Analog Topic으로 사용된 근거가 강하다.**

단 별도 PLC 여부는 아직 확정하지 않는다.

### P56

```text
IOReal 72개
Logged=No 72개
```

`활성탄여과지_P6P56` Sheet에서 P6와 함께 묶여 있다.

> **P56는 활성탄여과지/PCS6 계열의 보조 또는 별도 Analog Topic으로 사용된 근거가 강하다.**

### PLC3

```text
Tag     = GA_YU1_TBD123
Comment = 침전지 대표탁도
Item    = MW2600
Logged  = No
```

1 Point만 존재한다.

별도 PLC 1대로 해석하기보다 **침전지 대표탁도 1개를 가져오는 보조 Source** 가능성을 우선 둔다.

---

## 8. HMI 공정별 Sheet는 그대로 Ground Truth로 쓰지 않음

`광암정수센터_HMI자료정리.xlsx`의 공정별 Sheet는 사람이 보기 좋게 다시 묶은 자료다.

예를 들어 `CO2_P21` Sheet의 Analog 영역 후반에:

```text
PAC_SI_PP_C
PAC_SI_PP_B
PAC_SI_PP_A
PAC_FI_C
PAC_FI_B
PAC_FI_A
...
```

등 PAC 계열 Tag가 섞여 있다.

따라서 공정별 Sheet는 **업무 의미/화면 분류 참고용**으로 사용하고,

```text
AccessName / Item / Logged / Alarm
```

같은 원천 통신 메타데이터는 `광암_태그` Sheet를 기준으로 한다.

---

## 9. 화면 자료도 실제로 포함되어 있음

`*_화면` Sheet가 셀 기준으로는 비어 보이지만 Excel Drawing/Image가 포함돼 있다.

확인된 Embedded Image:

```text
26개
```

주요 화면 Sheet:

```text
약품투입동
여과지동
탈수기동
활성탄여과지
관리본관
CO2
PAC
오존투입설비
염소투입설비
중계펌프장
AOP
```

따라서 이 Workbook은 단순 Tag 목록이 아니라 **설비별 Tag + HMI 화면을 같이 정리한 사전 분석자료**다.

---

## 10. P8 / WaterNow 명칭은 다시 확인 필요

기존 2026 DeviceXPlorer 해석에서 P8 `.18`을 WaterNow 계열로 설명한 부분이 있었으나, 과거 HUB 문서에는 다음처럼 분리돼 있다.

```text
192.9.211.18 = 관리본관(PCS-M_XGI)
192.9.211.19 = 관리본관(PCS-M_XGI) WATER NOW / PLC(서버실)
```

따라서 P8 `.18`의 정확한 역할은 **현재 2026 DXP 설명 + 해당 XG5000 원본을 다시 대조하여 확정**한다.

기존 `P8 = WaterNow` 표현은 확정 표현에서 내린다.

---

## 11. 과거 최적제어/공정진단 계층 단서

HUB 문서에는 다음 장비가 있다.

```text
192.9.211.111 = NNSDB(공정진단용 DB서버)
192.9.212.111 = 공정진단용 DB서버
192.9.212.200 = 공정진단용 PC(최적제어)
```

이는 **과거 공정진단/최적제어 시스템이 존재했을 가능성**을 보여주는 역사적 단서다.

하지만 이것을 현재 RS-2025-02307821 과제의 AI 시스템 또는 파이브텍 수행범위로 연결하지 않는다.

현재 사용 여부, 제품명, 데이터 연계는 별도 확인한다.

---

## 12. 이번에 생성한 분석 CSV

```text
광암-HUB-IP-Map-201609_20210917.csv
광암-HMI-IOAccess-Summary-20240502.csv
광암-HMI-Tag-Master-Disc-Real-20240502.csv
광암-HMI-Tag-Logging-Summary-20240502.csv
```

특히 `광암-HMI-Tag-Master-Disc-Real-20240502.csv`는 14,870개 Tag에 대해 다음을 직접 연결한다.

```text
Tag Type
Tag Name
Comment
Logged
EventLogged
AccessName
ItemName
ReadOnly
Alarm 설정
Engineering Unit / EU 범위 일부
```

따라서 다음 단계에서 XG5000 Address Dictionary와 바로 JOIN할 수 있다.

---

## 13. 현재 우선순위

1. **HMI Tag Master 14,870개 ↔ XG5000 PLC Address Dictionary JOIN**
2. 2026 현재 InTouch DBDump와 비교하여 2024→2026 변경 Tag 확인
3. 현재 DeviceXPlorer SuiteLink Application Name 확인
4. `GFENet ↔ DeviceXPlorer` 관계 확정
5. `HistData` 주소 불일치 원인 확인
6. `dhistcfg.ini + historian.txt + 실제 Historian Export`로 장기 저장계층 확정
7. P8 `.18`의 현재 역할 확정
8. P52/P56의 실제 PLC/통신 Source 확인

## 관련 문서

- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조]]
- [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]
- [[02-광암-PLC-태그-Historian-데이터계보-구축]]
- [[03-광암-InTouch-dde-cfg-통신매핑-분석]]
- [[../90-근거-기록/2026-09-09-제어설비-IP-HMI자료정리-대조-기록]]
