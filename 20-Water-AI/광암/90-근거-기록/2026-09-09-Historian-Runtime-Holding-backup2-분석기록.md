---
doc_id: GW-EVIDENCE-HISTDB-20260909
title: 2026-09-09 Historian Runtime Holding backup2 분석기록
plant: 광암
category: 분석근거
status: confirmed
recorded_date: 2026-09-09
source_package: GWANGAM-HISTORIAN-DB-ANALYSIS-20260909-154026
---

# 2026-09-09 Historian Runtime / Holding / backup2 분석기록

## 분석 대상

```text
Runtime.bak
Holding.bak
backup2.bak
```

SQL Server에 분석용 임시 DB로 복원하여 테이블, 컬럼, 기간, 시계열 후보, 샘플을 추출했다.

## 직접 확인 결과

### Runtime.bak

- 원래 DatabaseName: `Runtime`
- ServerName: `POS11`
- 최신 포함 Backup: 2026-01-06 12:04:27
- `Tag=2,336`
- `AnalogTag=2,309`
- `TagHistory=13`
- `EventHistory=168`
- `ManualAnalog/Discrete/StringHistory=0`

### backup2.bak

- 원래 DatabaseName: **`Runtime`**
- ServerName: `POS11`
- 최신 포함 Backup: **2026-07-23 11:08:34**
- `Tag=2,434`
- `AnalogTag=2,402`
- `TagHistory=917`
- `EventHistory=168`
- `ManualAnalog/Discrete/StringHistory=0`

### Holding.bak

- 원래 DatabaseName: `Holding`
- 최신 Backup: 2026-07-23 11:07:56
- `DdeCfg`, `InTouchDB`, `histInfo`, `realVarInfo` 등 후보 테이블은 존재하지만 분석본에서는 주요 행 수 **0건**

## EventHistory 기간

`backup2` Runtime:

```text
2025-12-30 13:00:00 ~ 2026-01-06 12:00:00
168 rows
```

장기간 공정 PV가 아니라 이벤트성 기록으로 분류한다.

## Historian 구조 증거

Runtime DB에서 직접 확인:

```text
Tag / AnalogTag
IOServer / Topic
StorageNode / StorageLocation(Path)
History / AnalogHistory / DiscreteHistory / StringHistory View
```

대표 Tag 샘플:

```text
AE_901          오존처리수 탁도                MW128/U  StorageRate=1000
AE_902A         활성탄 처리수 탁도              MW129/U  StorageRate=1000
AOP_INJQUAN_PV  AOP 과산화수소 현재주입량(PV)   MW2002   StorageRate=1000
```

## 최종 판정

```text
Wonderware Historian Runtime 메타 DB = 확보
Historian 실제 장기 History Storage = 미확보
AI 학습용 장기 시계열 데이터         = 미확보
```

`Runtime`의 History View 존재만으로 BAK 안에 실제 장기 값이 포함됐다고 판단하지 않는다.

## 후속

1. 최신 Runtime의 `StorageLocation.Path` 실제 행 값 조회
2. 해당 경로 History Storage 원본 확보
3. 불가 시 Historian에서 장기간 `Timestamp/TagName/Value/Quality` Export 요청

상세: [[../30-데이터-분석/06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정]]
