---
doc_id: GW-DATA-003
title: 광암 InTouch dde.cfg 통신매핑 분석
plant: 광암
category: 데이터분석
status: confirmed
revision: 0.1
last_updated: 2026-09-09
source_refs:
  - SRC-PREVISIT-HMI-GW-20260909
---

# 광암 InTouch `dde.cfg` 통신매핑 분석

## 1. 목적

현장 방문 전에 제공받았던 InTouch HMI 백업의 `dde.cfg`를 이용하여 **InTouch Source → Application → Topic → Tag → PLC Item**을 추출한다.

분석 대상:

```text
HMi backup\광암아리수정수센터_POS11_2024.03.29\dde.cfg
```

이 자료는 **2024-03-29 백업 시점의 HMI 구성 스냅샷**이다. 2026 현재 런타임 상태와 동일하다고 자동 가정하지 않는다.

---

## 2. 핵심 결과

- DDE/SuiteLink Source 정의: **20개**
- 전체 Point: **14,997개**
- `GFENet` Application Point: **14,983개**
- `GFENet` Source: **16개**
- 그중 2026 DeviceXPlorer 13개 Device와 이름이 정확히 같은 Source: **13개**
- FSGateway Source: **1개 / Point 0개**
- HistData Source: **1개 / Point 13개**
- InTouch VIEW Source: **1개 / Point 1개 + Secondary Source 존재**

---

## 3. GFENet Source 요약

| Source | Application | Topic | Point 수 | 2026 DXP 13개와 일치 |
|---|---|---|---:|---|
| P1 | `\\192.9.211.120\GFENet` | P1 | 2,563 | Yes |
| P2 | `\\192.9.211.120\GFENet` | P2 | 6,479 | Yes |
| P4 | `\\192.9.211.120\GFENet` | P4 | 914 | Yes |
| P6 | `\\192.9.211.120\GFENet` | P6 | 1,678 | Yes |
| P7 | `\\192.9.211.120\GFENet` | P7 | 618 | Yes |
| P8 | `\\192.9.211.120\GFENet` | P8 | 4 | Yes |
| P21 | `\\192.9.211.120\GFENet` | P21 | 209 | Yes |
| P22 | `\\192.9.211.120\GFENet` | P22 | 122 | Yes |
| P23 | `\\192.9.211.120\GFENet` | P23 | 243 | Yes |
| P25 | `\\192.9.211.120\GFENet` | P25 | 129 | Yes |
| P26 | `\\192.9.211.120\GFENet` | P26 | 277 | Yes |
| P27 | `\\192.9.211.120\GFENet` | P27 | 168 | Yes |
| P30 | `\\192.9.211.120\GFENet` | P30 | 1,089 | Yes |
| P52 | `\\192.9.211.120\GFENet` | P52 | 417 | No |
| P56 | `\\192.9.211.120\GFENet` | P56 | 72 | No |
| PLC3 | `\\192.9.211.120\GFENet` | PLC3 | 1 | No |

2026 현장 DeviceXPlorer Device:

```text
P1/P2/P4/P6/P7/P8/P21/P22/P23/P25/P26/P27/P30
```

즉 13개가 전부 겹치고 빠지는 항목이 없다.

---

## 4. Point 레코드의 의미

`dde.cfg`의 각 Point는 대략 다음 구조다.

```text
<TagName>;<InternalID>: <ItemName>
```

예:

```text
PCS2_AIR_STP_TMSV;3985: MW3781
PCS2_AIR_STT_TMSV;3984: MW3780
F1_T0_HOUR;2F00: MW5025
```

분석용 CSV에서는 다음 컬럼으로 분리했다.

```text
source
application
topic
secondary_application
secondary_topic
tag_name
internal_id
item_name
```

생성 파일:

```text
광암-InTouch-DDE-Point-Mapping-20240329.csv
광암-InTouch-DDE-Source-Summary-20240329.csv
```

---

## 5. 이 파일이 중요한 이유

기존에는 다음 연결을 위해 DBDump가 반드시 먼저 필요하다고 봤다.

```text
InTouch Tag
→ Access Name
→ Topic
→ Item
```

하지만 `dde.cfg` 자체에서 이미 다음을 대량으로 복구할 수 있다.

```text
InTouch Tag
→ DDE Source
→ Application
→ Topic
→ Item(MW 주소 등)
```

따라서 **PLC Address Dictionary와 연결할 수 있는 직접 후보 14,983개가 이미 존재**한다.

DBDump는 여전히 필요하지만 역할이 달라졌다.

```text
dde.cfg
→ 통신 연결/Item 매핑

DBDump/Tagname.x
→ Tag Type, Logged, Alarm, 단위, Description 등 전체 메타데이터 보강
```

---

## 6. FSGateway 판정

직접 확인값:

```text
Source Name = OPC
Application Name = \\localhost\FSGateway
Topic Name = OPC_DeviceGroup
SuiteLink = 1
Point = 0
```

해석:

- FSGateway가 InTouch Source로 정의된 것은 확정
- 그러나 이 백업에 연결된 Point는 0개
- 주 PLC Source는 `GFENet` 14,983 Point

따라서 **2024 백업 기준 FSGateway가 주 PLC 데이터 경로였다는 증거는 없다.**

---

## 7. HistData 판정

직접 확인값:

```text
Source Name = HistdataViewstr
Application Name = \\192.9.211.120\HistData
Topic Name = ViewStream1
Point = 13
```

대표 Point:

```text
Status
Error
WriteFile
Interval
Filename
Duration
DBDir
Tags
StartDate
StartTime
```

이 Source는 **History 조회/Export 스트림 기능**이 HMI에 구성돼 있었음을 보여준다.

단, 이것이 곧 Wonderware Historian Server의 실제 저장 Tag를 의미하는 것은 아니다.

---

## 8. 211/212 Primary/Secondary

`INTOUCH` Source:

```text
Primary:
Application = \\192.9.211.120\VIEW
Topic = TAGNAME

Secondary:
Application = \\192.9.212.120\VIEW
Topic = TAGNAME
```

이것은 HMI 계층에서 211/212 이중 Source가 실제 설정돼 있었음을 보여주는 직접 근거다.

---

## 9. 추가 Source `P52`, `P56`, `PLC3`

이 항목은 새로 확인됐지만 아직 성격을 확정하지 않는다.

### P52

Tag 예:

```text
PCS2_AIR_STP_TMSV
PCS2_AIR_STT_TMSV
FCCTIME_...
F1_T...
F2_T...
...
```

PCS2/FCC/여과와 밀접하다.

### P56

Tag 예:

```text
PCS6_AIR_STP_TMSV
PCS6_AIR_STT_TMSV
HF1_...
HF2_...
...
```

PCS6/활성탄 계열과 밀접하다.

### PLC3

```text
GA_YU1_TBD123 → MW2600
```

현재 판단:

```text
P52 = P2 보조/별도 Topic 가능성
P56 = P6 보조/별도 Topic 가능성
PLC3 = 과거/시험/보조 Source 가능성
```

모두 **추가 확인 필요**로 둔다.

---

## 10. 다음 작업

1. `item_name`의 MW 주소를 XG5000 Address Dictionary와 대조
2. 13개 공통 Topic의 PLC IP를 DeviceXPlorer 설정과 결합
3. `P52/P56/PLC3`의 실제 통신대상 추적
4. `tagname.x` 재수집 후 Tag Type/Logged/Alarm 메타데이터 보강
5. `dhistcfg.ini`로 InTouch History 설정 확인
6. Historian 실제 Tag/Storage와 연결
7. AI Canonical Feature 매핑

## 관련 문서

- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조]]
- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]
- [[02-광암-PLC-태그-Historian-데이터계보-구축]]
- [[../90-근거-기록/2026-09-09-사전제공-HMI-자료-대조-기록]]
