---
doc_id: GW-EVIDENCE-POS11-STORAGE-20260909
title: 2026-09-09 POS11 StorageLocation StorageNode 실조회 사진근거
plant: 광암
category: 근거기록
status: confirmed
last_updated: 2026-09-09
---

# 2026-09-09 POS11 `StorageLocation / StorageNode` 실조회 사진근거

## 원본

![[99-첨부/2026-09-09-POS11-StorageLocation-StorageNode-실조회.png]]

## 실행 SQL

사진에서 다음 두 조회가 실행된 것이 확인된다.

```sql
SELECT * FROM dbo.StorageLocation;
SELECT * FROM dbo.StorageNode;
```

Database 상태표시와 기존 맥락상 `Runtime` DB에서 조회한 결과로 본다.

## 현재 직접 확인된 StorageLocation

| StorageType | SortOrder | StorageNodeKey | Path | MaxMBSize | MinMBThreshold | MaxAgeThreshold | Status |
|---:|---:|---:|---|---:|---:|---:|---:|
| 1 | 1 | 1 | `D:\Historian\Data\Circular` | 0 | 1024 | 0 | 0 |
| 2 | 1 | 1 | `R:\Overflow\Data` | 0 | 1024 | 0 | 0 |
| 3 | 1 | 1 | `D:\Historian\Data\Buffer` | 0 | 1024 | 0 | 0 |
| 4 | 1 | 1 | `D:\Historian\Data\Permanent` | 0 | 1024 | 0 | 0 |

> 위 값은 **2026 현재 POS11의 Runtime 설정에서 직접 보이는 경로**다. 따라서 v9까지의 “현재 Path 추가 확인 필요” 항목은 해소한다.

## StorageNode

사진에서 다음이 확인된다.

```text
StorageNodeKey = 1
ComputerName   = POS11
DbRevision     = 81
```

그 외 상태 컬럼은 사진에 보이는 값을 그대로 기록하되, 각 상태값의 제품 의미를 현재 자료만으로 임의 해석하지 않는다.

## 확정 / 미확정 구분

### 자료로 확인된 내용

- POS11의 현재 Runtime DB에 StorageLocation 4개가 등록되어 있음
- `D:`에 Circular / Buffer / Permanent 경로가 등록되어 있음
- `R:`에 Overflow 경로가 등록되어 있음
- StorageNode의 ComputerName은 `POS11`

### 추가 확인 필요

- 각 경로의 실제 파일 존재 여부
- 각 경로의 실제 총용량과 파일수
- `R:`가 로컬 디스크인지 네트워크/매핑/별도 Storage인지
- 보존 가능한 최초/최종 데이터 기간
- 운영 중 파일 복제의 정합성/공식 백업 절차

## AI 데이터 확보에 주는 의미

이제 “Historian 데이터 저장경로를 찾아야 한다” 단계는 끝났다. 다음은 다음 순서다.

```text
현재 Storage 경로 확인 완료
→ 4개 경로 실제 용량/파일수 측정
→ 용량 감당 가능 여부 판단
→ 원본 Storage를 보험성 원본으로 확보할지 결정
→ AI 학습용 정식 데이터는 Runtime.dbo.History Query/Export로 생성
```

관련 문서:
- [[../30-데이터-분석/07-광암-Historian-현장-원본확보-절차]]
- [[../30-데이터-분석/08-광암-Historian-AI학습데이터-추출전략]]
