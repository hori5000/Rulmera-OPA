---
doc_id: GW-DATA-005
title: 광암 2026 HMI DDE Historian 통합매핑 결과
plant: 광암
category: 데이터분석
status: confirmed
revision: 1.1
last_updated: 2026-09-09
source_refs:
  - GWANGAM-ARCH-COLLECT-20260909-152414
  - DB_20260518.CSV
  - dde.cfg_20260622
  - tagname.x_20260622
  - historian.txt_20221206
---

# 광암 2026 HMI DDE Historian 통합매핑 결과

## 1. 결론부터

이번 수집본으로 광암의 **PLC 통신 Point → InTouch HMI Tag → 과거 Historian Tag** 연결을 실제 파일 기준으로 대량 교차검증했다.

현재 핵심 수치는 다음과 같다.

```text
2026-06-22 dde.cfg 전체 Point     = 15,153
  └ GFENet Point                 = 15,139

2026-05-18 InTouch DBDump IO Tag = 15,147
  ├ IODisc                       = 10,310
  ├ IOReal                       =  4,824
  ├ IOInt                        =      2
  └ IOMsg                        =     11

현재 DBDump의 15,147 IO Tag 전부가
2026-06-22 dde.cfg에서 TagName 기준으로 100% 매칭됨.
```

즉 이제 `dde.cfg`를 단순 참고파일이 아니라 **현재 InTouch I/O Tag의 통신 주소 매핑 근거**로 쓸 수 있다.

---

## 2. DDE가 여기서 의미하는 것

광암의 `dde.cfg`는 이름은 DDE지만 실제 Source 정의에는 `SuiteLink=1`이 들어 있고, 주요 PLC Source는 다음처럼 정의돼 있다.

```text
Application = \\192.9.211.120\GFENet
Topic       = P1 / P2 / P4 / ...
Item        = MWxxxx / MWxxxx.bit / MWxxxx/D / MWxxxx/U ...
```

따라서 광암에서 `dde.cfg`는 실무적으로 다음 역할을 한다.

```text
InTouch Tag
  ↕
AccessName / Topic
  ↕
GFENet SuiteLink Source
  ↕
PLC Item(메모리 주소)
```

`DDE`라는 이름 때문에 현재 통신이 반드시 구형 DDE Protocol이라고 해석하면 안 된다. 현재 주요 Source는 SuiteLink 방식으로 정의돼 있다.

---

## 3. 2026 현재 IOAccess Source

현재 `DB_20260518.CSV`와 `dde.cfg`에서 확인되는 GFENet Source는 18개다.

```text
P1, P2, P4, P6, P7, P8,
P16,
P21, P22, P23, P25, P26, P27, P30,
P52, P56,
PLC3, PLC10
```

이외 HMI 내부/보조 Source:

```text
INTOUCH
HistdataViewstr
Galaxy
OPC / FSGateway
```

`OPC / FSGateway`는 현재도 Source 정의는 있으나 Point가 0개다. 따라서 광암 PLC 주 통신경로라는 근거는 없다.

---

## 4. 2024 → 2026 통신 Point 변화

2024-03-29 POS11 `dde.cfg`의 GFENet Point는 14,983개였다.

2026-06-22 현재는 15,139개다.

```text
순증가 = +156 Point
실제 추가 = 177 Point
실제 제거 = 21 Point
```

Source별 주요 변화:

| Source | 2024 | 2026 | 증감 | 핵심 변화 |
|---|---:|---:|---:|---|
| P1 | 2,563 | 2,574 | +11 | 침전/수질 계열 일부 추가, 1개 주소 변경 |
| P2 | 6,479 | 6,576 | +97 | 여과지 정수밸브 개도 관련 Point 대량 추가 |
| P6 | 1,678 | 1,699 | +21 | 활성탄 공기/세척 상태 주소체계 변경 및 추가 |
| P21 | 209 | 211 | +2 | **CO2 AI 사용/통신이상** |
| P22 | 122 | 126 | +4 | **PAC AI 사용/통신이상/AI 시스템 상태** |
| P56 | 72 | 82 | +10 | 활성탄 공기+세척 시간 1~10지 추가 |
| P16 | 0 | 2 | +2 | 침전지/여과지 잔류염소 신규 Source |
| PLC10 | 0 | 9 | +9 | pH/알카리도/조류 측정 신규 Source |

상세 Point는 `광암-DDE-2024-vs-2026-Point-Diff.csv`에 저장했다.

---

## 5. 매우 중요한 신규 발견 — 2026 AI 연계 Tag가 실제 HMI에 들어가 있음

2026-06-22 `dde.cfg`에서 다음 6개가 새로 확인된다.

| Source | Tag | Item | 의미 |
|---|---|---|---|
| P21 | `CO2_AI_USE` | `MW260.0` | CO2 AI 투입량 사용 |
| P21 | `CO2_AI_COM_ERR` | `MW260.1` | CO2 AI 통신이상 |
| P22 | `PAC_AI_USE` | `MW20.12` | PAC 1계열 약품 AI 주입률 사용 |
| P22 | `PAC_AI_COM_ERR` | `MW20.13` | PAC AI 통신이상 |
| P22 | `AI_SYSTEM` | `MW300.0` | 약품 AI 시스템 상태 관련 |
| P22 | `AI_SYS_STOP` | `MW300.0` | AI SYSTEM STOP 관련 |

이 6개는 2026-05-18 DBDump에는 아직 없지만, **2026-06-22 현재 `tagname.x` 내부에도 실제 Tag Record가 존재**한다.

즉 단순 `dde.cfg` 잔재가 아니라, 2026-06-22 현재 InTouch Tag DB에도 들어간 구성이다.

추가로 XG5000 수집본에 다음 파일이 있다.

```text
Projects\약품투입P22_V9_6_20260515_AI\약품투입P22_V9_6_20260515_AI.xgwx
광암정수장CO2_260515\광암정수장CO2_260515.xgwx
```

따라서 **P21 CO2 / P22 PAC 쪽에서 AI 연계 작업이 실제로 진행된 흔적은 매우 강하다.**

단, 해당 XGWX가 현재 PLC에 다운로드된 최종 운전본인지 여부는 Online Compare/PLC Upload로 최종 확정해야 한다.

---

## 6. P16 / PLC10은 AI에 매우 유용한 신규 수질 Source

### P16

```text
CI_20240708_1 / MW127 / 침전지 잔류 염소 / Logged=Yes
CI_20240708_2 / MW128 / 여과지 잔류 염소 / Logged=Yes
```

### PLC10

```text
GA_HO_PH / MW505 / 혼화지 pH
GA_HO_AL / MW506 / 혼화지 알카리도
GA_CH_PH / MW508 / 침전지 pH
GA_CH_AL / MW509 / 침전지 알카리도
DATA_1 / MW400 / 조류측정기-녹조
DATA_2 / MW401 / 조류측정기-남조
DATA_3 / MW402 / 조류측정기-규조
DATA_4 / MW403 / 조류측정기-갈색편모조
```

이 Source들은 2024 `dde.cfg`에는 없고 2026에 새로 나타난다.

정수 AI Feature 후보로 가치가 높다.

---

## 7. Historian은 이제 '설치 추정'이 아니라 실제 구성 근거가 있음

`historian.txt`는 단순 메모가 아니라 **Wonderware Historian Import/Export 설정 형식**이다.

파일 수정시각:

```text
2022-12-06 18:20:40
```

직접 확인된 설정:

```text
IOServer Computer = 192.9.211.120
Application       = GFENet
ProtocolType      = SuiteLink
```

Historian Topic:

```text
P1, P2, P4, P6, P7, P8,
P21, P22, P23, P25, P26, P27, P30,
P52, P56, PLC3
```

Historian Tag 수:

```text
AnalogTag   = 2,224
DiscreteTag =    11
합계        = 2,235
```

Storage Location도 직접 정의돼 있다.

```text
D:\Historian\Data\Circular
R:\Overflow\Data
D:\Historian\Data\Buffer
D:\Historian\Data\Permanent
```

따라서 최소 2022년 시점에는:

> **Wonderware Historian이 `192.9.211.120\GFENet`을 SuiteLink로 직접 수집하도록 실제 구성되어 있었다.**

라고 판단할 수 있다.

이것은 `WWALMDB`와 완전히 다른 계층이다.

```text
WWALMDB   = Alarm/Event SQL DB
Historian = 공정 시계열 Tag 저장계층
```

---

## 8. InTouch 로컬 History와 중앙 Historian을 구분해야 함

현재 `dhistcfg.ini`에는:

```text
[History]
bLoggingEnabled=0

[InSQL]
bLoggingEnabled=0
```

가 확인된다.

즉 InTouch의 로컬 `D:\Histdata` 기록 설정이 켜져 있다고 볼 근거는 없다.

반면 `historian.txt`에는 중앙 Historian이 GFENet을 직접 수집하는 구성이 있다.

따라서 앞으로는:

```text
HMI Tag의 Logged=Yes
≠ 반드시 InTouch 로컬 History 저장
≠ 반드시 현재 중앙 Historian 저장
```

으로 관리한다.

실제 현재 Historian 저장 여부는 현재 Historian Tag Export/SMC와 데이터 조회로 확인해야 한다.

---

## 9. HistData 주소 충돌도 거의 정리됨

사전 정리 Excel 한 곳에는:

```text
\\192.168.0.120\HistData
```

가 있었지만,

2024 POS11 `dde.cfg`와 2026 현재 `dde.cfg`, 2026-05 DBDump는 모두:

```text
\\192.9.211.120\HistData
```

를 사용한다.

따라서 **현재 운용 근거는 `192.9.211.120` 쪽이 훨씬 강하다.**

`192.168.0.120`은 과거 다른 Node/정리 오류/별도망 가능성으로 보존하되 현재 주 주소로 쓰지 않는다.

---

## 10. 지금 실제로 완성된 JOIN 범위

`광암-2026-HMI-DDE-Historian-통합매핑.csv`에는 15,153개 DDE Point에 대해 다음을 한 줄로 붙였다.

```text
TagName
HMI Tag Type
HMI Group
Comment
AccessName
HMI ItemName
DDE Source/Application/Topic/Item
HMI Logged/EventLogged/ReadOnly
Alarm 설정
2022 Historian 등록 여부
Historian Topic/Item/StorageType/StorageRate
2024 DDE 존재 여부
2026 변화상태
```

현재 HMI IO Tag 15,147개는 DDE와 100% TagName 매칭됐다.

따라서 우리가 앞에서 말했던 `HMI Tag + dde.cfg JOIN`은 **이제 실제로 완료**됐다.

---

## 11. 아직 남은 핵심 — XG5000 내부 Symbol/Program과의 최종 JOIN

남은 것은:

```text
DDE Item = MWxxxx
        ↓
어느 XG5000 프로젝트의
어느 Symbol / Program Block / 네트워크에서 쓰는가
```

를 붙이는 작업이다.

XGWX는 전수 확보됐지만 동일 설비의 구버전/OLD/2026 수정본이 섞여 있다.

따라서 다음 순서가 안전하다.

1. Source(P1/P2/P21/P22...)별 XGWX 후보 정규화
2. 최신 후보와 현장 Online PLC Upload 비교
3. Symbol/Comment/Program/Network 추출
4. `DDE Item(MW...) ↔ XG5000 Symbol` JOIN
5. Historian 현재 Tag Export와 다시 JOIN

---

## 12. AI Master DB 관점의 현재 판단

이제 광암에서는 최소 다음 계보를 실제 근거로 만들 수 있다.

```text
PLC Memory Item
→ GFENet Topic
→ InTouch Tag
→ HMI Comment / Logging / Alarm
→ 2022 Historian 등록 여부
→ AI Canonical Feature
```

특히 P16/PLC10 신규 수질 Source와 P21/P22 AI 연계 Tag는 정수 AI 설계 시 우선 검토해야 한다.

## 관련 파일

- [[광암-2026-HMI-DDE-Historian-통합매핑.csv]]
- [[광암-2026-IOAccess-Source-요약.csv]]
- [[광암-DDE-2024-vs-2026-Point-Diff.csv]]
- [[광암-Historian-Tag-Export-20221206.csv]]
- [[광암-2026-AI-연계-신규태그.csv]]
- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조]]
- [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]


## 13. 2026-09-09 Runtime DB 백업 직접분석으로 Historian 현재상태 보강

기존 `historian.txt`는 2022 구성 Export였다. 이후 확보한 SQL BAK 3종을 직접 복원하여 2026 쪽 메타구성을 추가 확인했다.

### 13.1 BAK 정체

| 파일 | 원래 DB명 | 최신 포함 백업 | 판정 |
|---|---|---|---|
| `Runtime.bak` | `Runtime` | 2026-01-06 | Historian 메타/설정 DB |
| `backup2.bak` | `Runtime` | **2026-07-23 11:08:34** | 더 최신 Runtime 백업 |
| `Holding.bak` | `Holding` | 2026-07-23 | 주요 테이블 0건 |

### 13.2 최신 Runtime 핵심 수치

```text
Tag             = 2,434
AnalogTag       = 2,402
TagHistory      =   917   # Tag 설정 변경 이력
EventHistory    =   168   # 2025-12-30 ~ 2026-01-06 약 1주
ManualAnalogHistory   = 0
ManualDiscreteHistory = 0
ManualStringHistory   = 0
```

`TagHistory`는 공정값 시계열이 아니라 **Tag 설정 변경 이력**이다.

### 13.3 Runtime에 존재하는 Historian 구조

```text
Tag / AnalogTag
IOServer
Topic
StorageNode
StorageLocation(Path 포함)
History / AnalogHistory / DiscreteHistory / StringHistory View
```

대표 Tag 샘플:

```text
AE_901          / 오존처리수 탁도              / MW128/U / StorageRate=1000
AE_902A         / 활성탄 처리수 탁도            / MW129/U / StorageRate=1000
AOP_INJQUAN_PV  / AOP 과산화수소 현재주입량(PV) / MW2002  / StorageRate=1000
```

### 13.4 중요한 판정

**Runtime BAK는 Historian 설정/메타데이터 DB이고, AI 학습용 장기간 공정 시계열 원시값 자체가 아니다.**

따라서 현재 확보 상태는:

```text
PLC/HMI/DDE 매핑       = 상당 부분 확보
Historian Tag 메타      = 확보
Historian Storage 구조 = 확보
장기간 Timestamp/Value = 미확보
Quality 포함 실데이터   = 미확보
```

2026-09-09 `StorageLocation.Path` 현재값 4개는 직접 확인됐다. 다음 1순위는 **각 경로의 실제 용량/파일수 확인 → 원본 확보 가능성 판단 → AI 대상 Tag 장기간 Query Export 설계**다.

상세: [[06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정]]
