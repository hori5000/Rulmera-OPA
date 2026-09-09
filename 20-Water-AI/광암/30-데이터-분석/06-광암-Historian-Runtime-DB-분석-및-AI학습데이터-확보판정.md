---
doc_id: GW-DATA-006
title: 광암 Historian Runtime DB 분석 및 AI 학습데이터 확보 판정
plant: 광암
category: 데이터분석
status: action-required
revision: 1.2
last_updated: 2026-09-09
source_refs:
  - GWANGAM-HISTORIAN-DB-ANALYSIS-20260909-154026
  - Runtime.bak
  - Holding.bak
  - backup2.bak
---

# 광암 Historian Runtime DB 분석 및 AI 학습데이터 확보 판정

## 1. 결론

**광암 Wonderware Historian의 설정/메타 DB는 확보됐고, 현장 POS11에서 `Runtime.dbo.History`를 통해 실제 공정 시계열 값이 조회되는 것도 확인됐다. 다만 AI 학습에 필요한 장기간 데이터는 현재 인수한 BAK 안에 포함되지 않았으며, 장기 Export/History Storage 원본은 아직 우리 측에 확보되지 않았다.**

따라서 현재 상태를 다음처럼 기록한다.

```text
Historian 존재/구성                  = 확인
Historian Tag 메타데이터             = 확보
Runtime.dbo.History 실제 값 조회      = 확인
Historian Storage 구조               = 확보
AI 학습용 장기간 실데이터 우리 측 인수 = 미완료
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


## 2.6 2026-09-09 POS11 `History` 실조회 사진 근거

현장 SSMS 사진에서 `Runtime` Database가 선택된 상태로 다음 쿼리가 실행되고 있다.

```sql
FROM History
WHERE History.TagName IN ('PCS5_HV1A_2_TA')
  AND wwRetrievalMode = 'Cyclic'
  AND wwCycleCount = 100
  AND wwQualityRule = 'Extended'
  AND wwVersion = 'Latest'
  AND DateTime >= @StartDate
  AND DateTime <= @EndDate
```

결과 Grid에는 다음 컬럼이 보이며 실제 행이 반환된다.

```text
TagName
DateTime
vValue
MinRaw
MaxRaw
MinEU
MaxEU
Unit
Quality
```

### 판정

**자료로 확인된 내용**
- 서버/SQL 노드 이름 `POS11`
- Database `Runtime`
- `History` 조회가 실제 값 행을 반환
- `wwRetrievalMode / wwCycleCount / wwQualityRule / wwVersion`을 사용하는 Wonderware Historian 조회 형태
- 실제 태그 `PCS5_HV1A_2_TA`의 최근 값이 조회됨

**합리적 추정**
- `Runtime.dbo.History`는 일반 장기값 테이블이라기보다 Wonderware Historian Storage Engine/History Storage에 연결된 SQL 조회 인터페이스(View) 역할이다.
- 기존 `StorageLocation`과 2022 Historian Export의 `D:\Historian\Data\...` 경로가 실제 값 저장영역과 연결될 가능성이 높다.

**추가 확인 필요**
- 2026 현재 `dbo.StorageLocation.Path` 실제 값
- POS11 파일시스템의 현재 History Storage 디렉터리
- 보존 가능한 최초/최종 DateTime
- AI 대상 Tag 전체의 장기간 Export 가능 범위

> 따라서 기존의 “실제 Historian 값 존재 여부 미확정”은 폐기하고, **“실제 값은 POS11 Historian에서 조회 가능하나 장기간 학습데이터를 아직 우리 측에 인수하지 못했다”**로 정정한다.

![[99-첨부/2026-09-09-POS11-Runtime-History-실조회.jpg]]

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

현재 BAK 분석에서는 이 형태의 **수개월~수년치 실제 공정값 본체를 확인하지 못했다.** 그러나 현장 POS11에서는 `Runtime.dbo.History` SQL 조회로 실제 값이 반환되므로, **데이터 자체는 Historian 운영계층에 존재한다. 문제는 존재 여부가 아니라 장기간 학습용으로 우리 측에 추출·인수되지 않았다는 점**이다.

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

1. **POS11 `Runtime.dbo.History`에서 AI 대상 Tag 장기간 Export 확보**
2. 최신 Runtime `StorageLocation.Path` 실제 행 값 및 POS11 물리 저장경로 확인
3. 장기 데이터 최초/최종 시각, 저장간격, Quality 확인
4. AI 핵심 Tag 후보 추출
5. `MW주소 ↔ XG5000 Symbol/Program` JOIN
6. WWALMDB Alarm/Event와 동일 시간축 결합
7. 데이터 품질진단 후 정수 예측·최적화 모델 선정

---

## 9. 현재 판정 문구

보고/문서에는 다음 표현을 사용한다.

> **광암 POS11의 Wonderware Historian에서 `Runtime.dbo.History`를 통한 실제 공정 시계열 값 조회가 확인되었다. 다만 현재 인수한 BAK에는 장기간 값 본체가 포함되지 않았으므로, AI 학습을 위해 POS11 Historian에서 장기간 `Timestamp / TagName / Value / Quality` 데이터를 별도 Export하여 확보해야 한다.**

## 관련 문서

- [[01-WWALMDB-AlarmDB-vs-Historian]]
- [[02-광암-PLC-태그-Historian-데이터계보-구축]]
- [[05-광암-2026-HMI-DDE-Historian-통합매핑-결과]]
- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]


## 9. 현장 체류시간이 짧을 때의 현실적 확보방식 — 2026-09-09 추가

### 결론

현장에서 수개월~수년치 `History`를 SQL로 장시간 Export할 시간이 부족하다면, **먼저 실제 History Storage 위치와 용량만 확인한 뒤 원본 저장파일을 인수할 수 있는지 판단하는 방식**이 현실적이다.

단, 현재 우리가 가진 `Runtime.bak`만으로는 장기간 공정값 본체가 복원되지 않았으므로 **MSSQL `Runtime` 백업만 다시 받아오는 것은 목적에 충분하지 않다.**

### 현장에서 가장 먼저 실행할 SQL

```sql
USE Runtime;
SELECT * FROM dbo.StorageLocation;
SELECT * FROM dbo.StorageNode;
```

확인 목표:

```text
StorageLocation.Path
StorageNode 명칭
StorageType
MaxMBSize / MaxAgeThreshold 등 보존 관련 설정
```

2022 확보자료에는 다음 경로 근거가 이미 있다.

```text
D:\Historian\Data\Circular
D:\Historian\Data\Buffer
D:\Historian\Data\Permanent
```

그러나 **2026 현재 서버에서도 동일한지는 아직 확인되지 않았으므로 현재 `StorageLocation.Path`를 우선한다.**

### 실제 저장경로 용량 확인

`StorageLocation.Path`가 확인되면 POS11 PowerShell에서 읽기 전용으로 크기를 계산한다.

```powershell
$Path = "D:\Historian\Data"
$files = Get-ChildItem -LiteralPath $Path -File -Recurse -ErrorAction SilentlyContinue
$bytes = ($files | Measure-Object Length -Sum).Sum

[PSCustomObject]@{
    Path  = $Path
    GB    = [math]::Round($bytes / 1GB, 2)
    TB    = [math]::Round($bytes / 1TB, 3)
    Files = $files.Count
}
```

드라이브 총용량/여유공간도 동시에 확인한다.

```powershell
Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
Select-Object DeviceID,
@{N="TotalGB";E={[math]::Round($_.Size/1GB,1)}},
@{N="FreeGB";E={[math]::Round($_.FreeSpace/1GB,1)}}
```

### 의사결정 기준

```text
History Storage 용량 확인
    ↓
외장 SSD/이동매체로 감당 가능?
    ├─ YES → History Storage 원본 인수 우선 검토
    └─ NO  → POS11 Runtime.dbo.History에서 기간/Tag를 나눠 Export
```

AI 개발만 목적이라면 장기적으로는 `TagName / DateTime / Value / Quality` 형태 Export가 다루기 쉽다. 다만 **현장시간 절감과 원본 보존 측면에서는 Storage 원본을 우선 확보하고, 이후 사무실/분석환경에서 Export/변환 가능 여부를 검토하는 전략**이 유리할 수 있다.

### 원본 인수 시 같이 확보할 것

1. History Storage 전체 경로(가능한 경우)
2. 최신 `Runtime` DB 백업
3. `Holding` DB 백업
4. `StorageLocation` / `StorageNode` 조회 결과
5. Historian 버전 정보
6. 가능하면 현재 Historian 서비스/설정 정보

### 운영 안전 주의

**추가 확인 필요 / 현장 승인 필요**

- 운영 중 Historian Storage 파일은 계속 쓰기 중일 수 있다.
- 단순 탐색기 복사가 일관된 백업을 보장하는지는 현재 자료만으로 확정할 수 없다.
- Historian 서비스를 임의로 중지해서는 안 된다.
- 정식 Backup/Snapshot 또는 운영 영향 없는 복제 절차가 있는지 현장 담당자와 먼저 확인한다.

따라서 현장에서는 우선 **경로와 용량만 읽기 방식으로 확인**하고, 실제 복제 방법은 운영 승인 후 결정한다.

관련 절차: [[07-광암-Historian-현장-원본확보-절차]]
