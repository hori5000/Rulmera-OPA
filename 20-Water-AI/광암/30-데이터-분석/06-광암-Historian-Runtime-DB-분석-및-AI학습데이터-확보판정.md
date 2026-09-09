---
doc_id: GW-DATA-006
title: 광암 Historian Runtime DB 분석 및 AI 학습데이터 확보 판정
plant: 광암
category: 데이터분석
status: action-required
revision: 1.0
last_updated: 2026-09-09
source_refs:
  - GWANGAM-HISTORIAN-DB-ANALYSIS-20260909-154026
  - Runtime.bak
  - Holding.bak
  - backup2.bak
---

# 광암 Historian Runtime DB 분석 및 AI 학습데이터 확보 판정

## 1. 결론

**광암 Wonderware Historian의 설정/메타 DB는 확보됐다. 그러나 AI 학습에 필요한 장기간 공정 시계열 실데이터는 현재 확보 BAK 안에서 확인되지 않았다.**

따라서 현재 상태를 다음처럼 기록한다.

```text
Historian 존재/구성          = 확인
Historian Tag 메타데이터     = 확보
Historian Storage 구조       = 확보
AI 학습용 장기간 실데이터    = 미확보
```

---

## 2. 자료로 확인된 내용

### 2.1 BAK 3종 정체

| 파일 | 원래 DatabaseName | 원본 서버 | 최신 백업시각 | 판정 |
|---|---|---|---|---|
| `Runtime.bak` | `Runtime` | `POS11` | 2026-01-06 12:04:27 | Historian Runtime 메타 DB |
| `backup2.bak` | `Runtime` | `POS11` | **2026-07-23 11:08:34** | 더 최신 Runtime 백업 |
| `Holding.bak` | `Holding` | `POS11` | 2026-07-23 11:07:56 | Holding DB, 주요 테이블 0건 |

즉 `backup2.bak`는 이름 때문에 일반 백업처럼 보이지만 실제 원래 DB는 **`Runtime`**이다.

### 2.2 최신 Runtime(`backup2`) 테이블 행수

| 테이블 | 실제 행수 | 의미 |
|---|---:|---|
| `Tag` | **2,434** | Historian 등록 Tag 메타 |
| `AnalogTag` | **2,402** | Analog Tag 설정 |
| `TagHistory` | 917 | Tag 설정 변경 이력 |
| `AnalogSnapshot` | 336 | Snapshot 관련 |
| `EventHistory` | 168 | 이벤트성 기록 |
| `ManualAnalogHistory` | 0 | 수동 Analog History 없음 |
| `ManualDiscreteHistory` | 0 | 수동 Discrete History 없음 |
| `ManualStringHistory` | 0 | 수동 String History 없음 |

> 분석기 `A2_TABLE_SIZE.csv`는 인덱스 중복으로 일부 행수가 부풀 수 있어, 이 문서의 행수는 `A7_TIMESERIES_CANDIDATE_TABLES.csv` 기준을 사용한다.

### 2.3 EventHistory 기간

최신 Runtime 백업의 `EventHistory`는 168건이고:

```text
DateTime:       2025-12-30 13:00:00 ~ 2026-01-06 12:00:00
DetectDateTime: 2025-12-30 13:00:54 ~ 2026-01-06 12:00:33
```

약 1주 구간이다. 장기간 공정 PV 학습데이터로 볼 수 없다.

### 2.4 TagHistory의 의미

최신 Runtime의 `TagHistory`는 917건이며 `DateCreated` 범위가 2020-07-09 ~ 2024-07-11이다.

이것은 **공정값 History가 아니라 Historian Tag 설정/변경 이력**으로 본다.

### 2.5 Historian 구조 객체

Runtime DB에서 다음이 직접 확인됐다.

```text
Tag
AnalogTag
DiscreteTag
StringTag
IOServer
Topic
StorageNode
StorageLocation
History / AnalogHistory / DiscreteHistory / StringHistory View
```

`StorageLocation`에는 실제 `Path` 컬럼이 있다.

```text
StorageType
SortOrder
StorageNodeKey
Path
MaxMBSize
MinMBThreshold
MaxAgeThreshold
Status
```

따라서 실제 값은 Runtime SQL 테이블 자체가 아니라 **Historian Storage 계층과 연결되어 있을 가능성이 매우 높다.**

---

## 3. 대표 Historian Tag 샘플

최신 Runtime `Tag` 샘플에서 실제 정수공정 Tag가 확인된다.

| TagName | Description | ItemName | StorageRate |
|---|---|---|---:|
| `AE_901` | 오존처리수 탁도 | `MW128/U` | 1000 |
| `AE_902A` | 활성탄 처리수 탁도 | `MW129/U` | 1000 |
| `AE_902B` | 활성탄 처리수 TOC | `MW130/U` | 1000 |
| `AOP_INJQUAN_PV` | AOP 과산화수소 현재주입량(PV) | `MW2002` | 1000 |
| `AOP_INJQUAN_SV` | AOP 과산화수소 목표주입량(SV) | `MW2000` | 1000 |
| `AOP_INJRATE_PV` | AOP 과산화수소 현재주입률(PV) | `MW2003` | 1000 |

이 결과는 **Historian이 실제 정수 공정변수를 수집하도록 구성돼 있었다는 강한 근거**다.

---

## 4. 현재 확보되지 않은 것

AI 예측·최적화 모델 학습에 필요한 핵심은 아래 형식의 장기간 값이다.

```text
Timestamp
TagName
Value
Quality
```

예를 들어:

```text
2026-07-01 00:00:00, AE_901, 0.083, Good
2026-07-01 00:01:00, AE_901, 0.081, Good
...
```

현재 BAK 분석에서는 이 형태의 **수개월~수년치 실제 공정값 저장본을 확인하지 못했다.**

---

## 5. 왜 Runtime.bak만으로 AI 학습을 못 하는가

`Runtime` DB는 다음을 잘 알려준다.

```text
어떤 Tag인가
무슨 설명인가
어느 Item/MW 주소인가
저장주기 설정은 얼마인가
어느 IOServer/Topic인가
어느 StorageNode/Path를 쓰는가
```

하지만 우리가 학습에 필요한 것은:

```text
그 Tag가 실제로 1년 동안 어떤 값으로 변했는가
```

이다. 이 값 데이터가 별도 History Storage/History Block 쪽에 있어야 한다.

---

## 6. 추가 확인 필요

### 최우선

최신 `Runtime` 복원 DB에서 다음을 직접 조회한다.

```sql
SELECT * FROM dbo.StorageNode;
SELECT * FROM dbo.StorageLocation ORDER BY StorageType, SortOrder;
SELECT * FROM dbo.IOServer;
SELECT * FROM dbo.Topic;
```

특히 `StorageLocation.Path`의 현재 행 값을 확인한다.

### 현장 요청자료

요청 명칭을 다음처럼 구체화한다.

> **광암 Wonderware Historian의 실제 History Storage 원본 또는 장기간 Tag별 Timestamp/Value/Quality 데이터 Export**

가능하면 다음을 함께 요청한다.

- 전체 또는 최소 1년 이상
- 원수/처리수 수질
- 유량/정수량
- 약품 PV/SV
- 펌프 RUN/Hz/가동대수
- 설비별 전력
- Set Point
- AUTO/MANUAL
- Quality

---

## 7. 우리가 해야 할 일

### 데이터 확보 트랙

```text
StorageLocation.Path 확인
→ History Storage 확보 또는 Historian Export
→ 기간/주기/결측/Quality 진단
→ AI Master DB 구축
```

### 구조 매핑 트랙

```text
DDE Item(MW주소)
→ XG5000 Symbol/Comment/Program Block
→ Historian Tag
→ AI Canonical Feature
```

두 트랙은 병행한다.

---

## 8. 우선순위

1. **실제 Historian History Storage 또는 장기간 Export 확보**
2. 최신 Runtime `StorageLocation.Path` 실제 행 값 조회
3. 장기 데이터 최초/최종 시각, 저장간격, Quality 확인
4. AI 핵심 Tag 후보 추출
5. `MW주소 ↔ XG5000 Symbol/Program` JOIN
6. WWALMDB Alarm/Event와 동일 시간축 결합
7. 데이터 품질진단 후 정수 예측·최적화 모델 선정

---

## 9. 현재 판정 문구

보고/문서에는 다음 표현을 사용한다.

> **광암 Wonderware Historian의 Tag/Storage 메타데이터와 Runtime DB는 확보되었으나, AI 학습에 필요한 장기간 공정 시계열 History Storage 데이터는 현재 확보되지 않아 추가 수집이 필요하다.**

## 관련 문서

- [[01-WWALMDB-AlarmDB-vs-Historian]]
- [[02-광암-PLC-태그-Historian-데이터계보-구축]]
- [[05-광암-2026-HMI-DDE-Historian-통합매핑-결과]]
- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]
