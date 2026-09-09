---
doc_id: GW-CHANGELOG-V7-20260909
title: 광암 Obsidian v7 Historian DB분석 업데이트내역
plant: 광암
category: 변경이력
status: completed
recorded_date: 2026-09-09
---

# 광암 Obsidian v7 Historian DB분석 업데이트내역

## 입력

- 기존 `광암_Obsidian_v6_2026-HMI-DDE-Historian_20260909`
- `GWANGAM-HISTORIAN-DB-ANALYSIS-20260909-154026`

## 핵심 변경

1. `Runtime.bak`, `Holding.bak`, `backup2.bak` 직접 복원분석 결과 반영
2. `backup2.bak`의 원래 DB가 **Runtime**임을 반영
3. 최신 Runtime 백업 시각 **2026-07-23 11:08:34** 반영
4. 최신 `Tag=2,434`, `AnalogTag=2,402` 반영
5. `StorageLocation/StorageNode/IOServer/Topic` 및 History View 존재 반영
6. `Manual*History=0`, 장기 실제 공정값 미확보 판정 반영
7. `TagHistory=917`은 공정값이 아니라 Tag 설정 변경이력으로 분리
8. `EventHistory=168`, 약 1주 구간으로 장기 학습데이터 아님을 반영
9. 기존 “Historian DB 확보” 표현을 **“Historian 메타 DB 확보 / 실제 History Storage 미확보”**로 정정
10. 다음 1순위를 **History Storage 또는 장기간 Timestamp/Value/Quality Export 확보**로 변경
11. 기존 홈의 `DXPSV` 중심 오래된 설명을 2026 `GFENet/SuiteLink` 직접근거에 맞춰 정리

## 신규 문서

- `30-데이터-분석/06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정.md`
- `90-근거-기록/2026-09-09-Historian-Runtime-Holding-backup2-분석기록.md`

## 신규 CSV

- `30-데이터-분석/광암-Historian-DB-판정요약-20260909.csv`

## 업데이트 문서

- `00-광암-홈.md`
- `20-현장-시스템/01-광암-데이터흐름-및-통신구조.md`
- `20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조.md`
- `20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치.md`
- `30-데이터-분석/01-WWALMDB-AlarmDB-vs-Historian.md`
- `30-데이터-분석/02-광암-PLC-태그-Historian-데이터계보-구축.md`
- `30-데이터-분석/05-광암-2026-HMI-DDE-Historian-통합매핑-결과.md`
- `90-근거-기록/2026-09-08-광암-Wonderware-추가확보-체크리스트.md`
