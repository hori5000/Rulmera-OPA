---
doc_id: GW-EVIDENCE-POS11-HISTORY-20260909
title: 2026-09-09 POS11 Runtime History 실조회 사진근거
plant: 광암
category: 분석근거
status: confirmed
recorded_date: 2026-09-09
source_type: 현장사진
---

# 2026-09-09 POS11 Runtime `History` 실조회 사진근거

## 원본

![[99-첨부/2026-09-09-POS11-Runtime-History-실조회.jpg]]

## 사진에서 직접 확인되는 내용

### SQL Server / Database

SSMS Object Explorer와 Query Window에서:

```text
Server/Node : POS11
Database    : Runtime
```

Object Explorer에는 다음 Database가 보인다.

```text
A2ALMDB
Holding
ReportServer
ReportServerTempDB
Runtime
WWALMDB
```

### 실행 쿼리

사진에서 식별 가능한 핵심 부분:

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

상단 변수에서는 최근 약 5분 구간을 조회하도록 설정한 것이 보인다.

### 조회 결과

Result Grid에서 다음 컬럼이 확인된다.

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

`PCS5_HV1A_2_TA`에 대해 실제 여러 행이 반환된다.

---

## 판정

### 자료로 확인된 내용

1. **POS11에서 SQL Server가 운영되고 있다.**
2. **`Runtime` Database가 존재하고 실제 조회 대상으로 사용된다.**
3. **`History`를 대상으로 특정 Historian Tag의 DateTime/Value를 SQL로 조회할 수 있다.**
4. `wwRetrievalMode`, `wwCycleCount`, `wwQualityRule`, `wwVersion` 등 Wonderware Historian 전용 조회조건이 사용된다.
5. 따라서 광암 Historian의 실제 공정 시계열 값은 운영 POS11에서 접근 가능한 상태다.

### 합리적 추정

`Runtime.dbo.History`는 수년치 값을 일반 SQL Table Row로 직접 저장하는 테이블이라기보다, Wonderware Historian의 **History Storage/Storage Engine을 SQL 형태로 조회하게 해주는 인터페이스(View)** 역할일 가능성이 매우 높다.

이 추정은 기존 Runtime DB 분석에서 `History`가 View로 확인된 사실 및 `StorageLocation/StorageNode` 존재와도 일치한다.

### 추가 확인 필요

- 최신 `dbo.StorageLocation.Path`
- POS11의 실제 History Storage 물리 디렉터리
- 보존기간 최초/최종 시각
- 장기간 Query/Export 성능
- AI 대상 전체 Tag의 Quality/결측률
- 원본 History Storage 백업 가능 여부

---

## AI 학습 관점 정정

### 이전 표현

```text
AI 학습용 장기 Historian 값 데이터 존재 여부 = 미확정
```

### 현재 표현

```text
Historian 실제 시계열 값 존재/조회 가능 = 확인
AI 학습용 장기간 데이터 우리 측 확보   = 미완료
```

따라서 다음 1순위는 **데이터 존재 여부 조사**가 아니라 **실제 장기간 Export**다.

권장 Export 최소 컬럼:

```text
Timestamp
TagName
Value
Quality
```

가능하면 추가:

```text
MinRaw
MaxRaw
MinEU
MaxEU
Unit
```

관련:
- [[../30-데이터-분석/06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정]]
- [[../20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조]]
