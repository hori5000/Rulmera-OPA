---
doc_id: GW-CHANGE-OBS-v8-20260909
title: 2026-09-09 Obsidian v8 POS11 Runtime History 실조회 반영
plant: 광암
category: 변경이력
status: complete
recorded_date: 2026-09-09
---

# Obsidian v8 업데이트 내역

## 신규 근거

현장 SSMS 사진에서 `POS11 / Runtime / FROM History` 쿼리와 실제 값 반환을 확인했다.

## 주요 정정

기존:

```text
Historian 실제 장기 시계열 값 존재 여부 = 미확정
```

v8:

```text
POS11 Historian 실제 시계열 값 존재 및 Runtime.dbo.History 조회 가능 = 확인
장기간 AI 학습용 데이터 우리 측 인수                              = 미완료
```

## 문서 변경

- `00-광암-홈.md`
- `20-현장-시스템/01-광암-데이터흐름-및-통신구조.md`
- `20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조.md`
- `30-데이터-분석/01-WWALMDB-AlarmDB-vs-Historian.md`
- `30-데이터-분석/06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정.md`

## 신규 문서/근거

- `90-근거-기록/2026-09-09-POS11-Runtime-History-실조회-사진근거.md`
- `99-첨부/2026-09-09-POS11-Runtime-History-실조회.jpg`

## 다음 1순위

1. POS11 `Runtime.dbo.History`에서 AI 핵심 Tag의 최소 1년 이상 Export
2. `StorageLocation.Path` 현재값 확인
3. 최초/최종 DateTime과 보존기간 확인
4. Quality/결측률 진단
5. AI Master DB 적재
