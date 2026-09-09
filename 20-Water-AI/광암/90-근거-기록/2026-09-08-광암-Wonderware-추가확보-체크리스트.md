---
doc_id: GW-EVIDENCE-CHECK-WW-20260908
title: 광암 Wonderware 추가 확보 체크리스트
plant: 광암
category: 현장확보
status: open
last_updated: 2026-09-09
---

# 광암 Wonderware / PLC 연결 추가 확보 체크리스트

XG5000 원본은 2026-09-08 수집 완료했다. 이제 현장에서 아래 순서로 받으면 **PLC 주소 → SCADA Tag → Historian**을 확정할 수 있다.

- [x] **XG5000 `.xgwx` 원본 수집** — 155개, 수집 오류 0. 단 현재본/구버전 정규화 필요

- [ ] **InTouch Application Manager 화면** — Application 이름과 실제 폴더 경로
- [x] **InTouch DBDump CSV** — `DB_20260518.CSV` 확보/분석 완료
- [ ] InTouch `Special → Access Names` 전체 화면/값
- [ ] InTouch Tag Dictionary에서 대표 I/O Tag의 `Access Name`, `Item Name`, `Log Data`
- [ ] DeviceXPlorer `Tools → Options → DDE/SuiteLink` Application Name
- [ ] DeviceXPlorer 각 Device의 `DDE/SuiteLink Enable`, `Topic Name`, Update Cycle
- [ ] 실제 사용 중인 `.dxp` 프로젝트 파일 전체
- [ ] Historian SMC `Storage → Imported Nodes`와 각 Node Properties의 `Tagname.x` Path
- [ ] Historian SMC `Public Groups → InTouch Nodes` Tag 목록
- [x] Historian Tag Configuration Export — `historian.txt`(2022) + `Runtime` DB(2026)로 메타구조 확보
- [x] Historian Storage 구조/Path 컬럼 존재 확인 — 2022 Export의 `D:\Historian\Data\...` + Runtime `StorageLocation.Path` 구조 확인
- [ ] **2026 최신 `StorageLocation.Path` 실제 행 값 조회 및 해당 History Storage 원본 확보**
- [ ] **Historian `Management Console → History Blocks` 또는 실제 History Storage 파일 확보**
- [ ] Alarm DB Logger Manager `Server Name`, `Database`, Query, Logging Mode
- [ ] 운영 PC 전체 `.LGH/.IDX` 파일 목록
- [ ] 운영 PC `Get-NetIPAddress` 결과
- [ ] 운영 PC DeviceXPlorer/FSGateway/Historian 관련 Process/Service 목록

## 내부 분석 병행 작업

- [ ] XGWX 155개 최신본/구버전/중복 후보 정규화
- [ ] PLC 통신 Matrix 작성 — 211/212망, 모듈, Station, 송수신 메모리
- [ ] PLC Address Dictionary 작성 — 주소/심볼/주석/프로그램
- [ ] PCS2 Station 1~24 ↔ FCC 24개 매핑 검증

## 이 자료로 확정할 것

```text
현장 신호
→ PLC Project / Address
→ PLC IP
→ DeviceXPlorer Device
→ SuiteLink Application/Topic
→ InTouch Access Name
→ InTouch Tag
→ Item/PLC Address
→ Historian Tag
→ Historian Storage
→ Alarm / WWALMDB
```

상세 절차: [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]


관련 PLC 구조: [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]


## 2026-09-09 BAK 직접분석으로 완료/미완료 재정리

- [x] `Runtime.bak` 복원/분석 — Historian 메타 DB 확인
- [x] `backup2.bak` 복원/분석 — 원래 DB가 `Runtime`, 2026-07-23 최신 백업 확인
- [x] `Holding.bak` 복원/분석 — 주요 테이블 0건 확인
- [x] 최신 Runtime Tag 2,434 / AnalogTag 2,402 확인
- [x] `StorageLocation`, `StorageNode`, `IOServer`, `Topic`, History 계열 View 존재 확인
- [ ] **AI 학습용 실제 장기간 `Timestamp + Tag + Value + Quality` 데이터 확보**
- [ ] 실제 Historian 보존기간/최초~최종 시각 확인

> 현재 요청자료의 핵심 명칭은 **“Historian DB”가 아니라 “Historian History Storage 또는 장기간 Tag Export”**다.
