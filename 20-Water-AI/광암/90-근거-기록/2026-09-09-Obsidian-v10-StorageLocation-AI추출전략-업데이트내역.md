---
doc_id: GW-CHANGE-V10-20260909
title: 2026-09-09 Obsidian v10 StorageLocation 및 AI 추출전략 업데이트
plant: 광암
category: 변경이력
status: completed
last_updated: 2026-09-09
---

# Obsidian v10 업데이트 내역

## 신규 근거

POS11에서 다음 SQL을 직접 실행한 사진을 반영했다.

```sql
SELECT * FROM dbo.StorageLocation;
SELECT * FROM dbo.StorageNode;
```

현재 Storage 경로 4개와 `ComputerName=POS11`을 확인했다.

## 확정으로 변경한 항목

- `D:\Historian\Data\Circular`
- `R:\Overflow\Data`
- `D:\Historian\Data\Buffer`
- `D:\Historian\Data\Permanent`
- StorageNode `POS11`

기존 v9의 “현재 `StorageLocation.Path` 추가 확인 필요”는 해소했다.

## 신규 개발/확보 전략

현장 체류시간이 짧다는 제약을 반영하여 다음 2단계 전략으로 정리했다.

1. 용량 감당 가능 시 History Storage 원본 + 최신 Runtime BAK를 보험성 원본으로 확보
2. AI 학습용 정식 데이터는 `Runtime.dbo.History` Query/Export로 생성

AI용 Query는:

- 연속형 수질/유량/약품/전력: `Cyclic` 기반 1분/5분 정규주기 검토
- 상태형 RUN/STOP/AUTO/MANUAL/Fault: `Full`/변화이력 중심 추출 후 동일 시간축 정합

모든 2,400여 Historian Tag를 무작정 전량 추출하지 않고 AI 대상 Tag를 먼저 선별한다.

## 추가 파일

- [[../30-데이터-분석/08-광암-Historian-AI학습데이터-추출전략]]
- [[2026-09-09-POS11-StorageLocation-StorageNode-실조회-사진근거]]
- `30-데이터-분석/광암-Historian-StorageLocation-현재값-20260909.csv`
- `99-첨부/2026-09-09-POS11-StorageLocation-StorageNode-실조회.png`

## 다음 1순위

1. 4개 Storage 실제 GB/TB·파일수 측정
2. `R:` 정체 확인
3. 원본 확보 가능성 판단
4. 최신 Runtime BAK/Tag 메타 확보
5. 대표 Tag Query 테스트
6. AI 대상 Tag 목록 확정 후 월별 자동 Export
