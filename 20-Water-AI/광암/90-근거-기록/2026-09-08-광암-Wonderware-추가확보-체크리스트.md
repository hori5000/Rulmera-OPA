---
doc_id: GW-EVIDENCE-CHECK-WW-20260908
title: 광암 Wonderware 추가 확보 체크리스트
plant: 광암
category: 현장확보
status: open
last_updated: 2026-09-09
---

# 광암 Wonderware / PLC 연결 추가 확보 체크리스트

2026-09-09 사전 제공 HMI 백업을 다시 분석하면서 일부 항목은 **현장에 재요청하지 않고 기존 전달자료에서 확보 가능**한 것으로 바뀌었다.

## 이미 확보/확인

- [x] **XG5000 `.xgwx` 원본 수집** — 155개, 수집 오류 0. 단 현재본/구버전 정규화 필요
- [x] **InTouch Application 백업 존재 확인** — 2023.06.16 / 수정전 / 2024.03.29 3개 Project Root
- [x] **InTouch Application 이름** — `광암아리수정수센터`
- [x] **2024 InTouch DDE/SuiteLink Source 설정** — `dde.cfg`
- [x] **2024 PLC 통신 Application** — `\\192.9.211.120\GFENet`
- [x] **13개 주요 Topic** — P1/P2/P4/P6/P7/P8/P21/P22/P23/P25/P26/P27/P30
- [x] **GFENet Point Mapping 추출** — 14,983개
- [x] **FSGateway Source 정의 확인** — `\\localhost\FSGateway / OPC_DeviceGroup`, Point 0
- [x] **211/212 VIEW Primary/Secondary 확인**
- [x] **HistData ViewStream Source 확인** — 조회구성 확인. 단 자료별 주소 `211.120` / `192.168.0.120` 불일치
- [x] **제어망 LINE A/B 명칭** — `211.x=LINE A`, `212.x=LINE B`
- [x] **POS11 IP 식별** — `211.120/212.120 = 감시제어 OS POS11`
- [x] **InTouch Tag DB 메타데이터** — IODisc 10,146 + IOReal 4,724 확보
- [x] **Logging/Alarm 1차 집계** — IOReal Logged=Yes 4,214 / IODisc AlarmState=On 3,498

---

## 1순위 — 바로 진행 가능한 내부 분석

- [ ] **14,870개 HMI Tag Master ↔ 14,983개 dde.cfg Point 결합**
- [ ] **HMI Tag/Item ↔ XG5000 Address Dictionary JOIN**
- [ ] P8 `.18` 역할 재확인
- [ ] P52/P56 실제 Source/PLC 확인

## 2순위 — 기존 제공자료에서 선택 재수집

Upload-Lite `00_ALL_FILES.csv`에서 원본 트리에 존재가 확인됐다.

- [ ] **`dhistcfg.ini`**
- [ ] **`HMi backup\historian.txt`**
- [ ] **`alarm.cfg`**
- [ ] `tagname.x / tagnames.ndx` — 원본 검증/보강
- [ ] 2023 `dde.cfg` — 2024와 비교해 구성 변경 이력 확인

> 이 항목들은 우선 현장 재방문/재요청 항목이 아니라 **기존 제공자료에서 다시 수집할 항목**이다.

---

## 3순위 — 현재 2026 런타임 확인

- [ ] **DeviceXPlorer `Tools → Options → DDE/SuiteLink` Application Name**
- [ ] DeviceXPlorer 각 Device의 `DDE/SuiteLink Enable`, `Topic Name`, Update Cycle
- [ ] 현재 실제 사용 중인 `.dxp` 프로젝트 파일 경로/수정일
- [ ] `GFENet` 프로세스/서비스/설정 존재 여부
- [ ] 운영 PC `Get-NetIPAddress` 결과
- [ ] 운영 PC DeviceXPlorer/GFENet/FSGateway/Historian 관련 Process/Service 목록

이 단계에서 아래를 확정한다.

```text
2024 GFENet
↔
2026 DeviceXPlorer
```

이 관계가 동일 서버명 변경인지, 제품 전환인지, 병행 구성인지 판별한다.

---

## 4순위 — InTouch 현재 Tag 메타데이터 변경분

- [ ] **2026 현재 InTouch DBDump CSV**
- [ ] 2024 HMI Tag Master와 Added/Removed/Changed 비교
- [ ] Logged/Alarm/AccessName/ItemName 변경 추적

> 2024 기준 IODisc/IOReal 메타데이터는 이미 확보했으므로 현재 DBDump의 목적은 **변경분 확인**이다.

---

## 5순위 — Historian 실제 저장구조

- [ ] Historian SMC `Storage → Imported Nodes`
- [ ] Historian SMC `Public Groups → InTouch Nodes`
- [ ] Historian SMC `Tag Configuration`
- [ ] Historian SMC `Storage Locations`
- [ ] Historian `Management Console → History Blocks`
- [ ] Historian Tag Export
- [ ] 실제 데이터 샘플 Export
- [ ] 최초/최종 Timestamp
- [ ] 저장주기 / Quality / Deadband / 보존기간

---

## 6순위 — Alarm DB 최종 확정

- [ ] `alarm.cfg` 분석
- [ ] Alarm DB Logger Manager `Server Name`
- [ ] `Database = WWALMDB` 여부
- [ ] Alarm Query
- [ ] Logging Mode
- [ ] Service 실행 여부

---

## 내부 분석 병행 작업

- [ ] XGWX 155개 최신본/구버전/중복 후보 정규화
- [ ] PLC 통신 Matrix 작성 — 211/212망, 모듈, Station, 송수신 메모리
- [ ] PLC Address Dictionary 작성 — 주소/심볼/주석/프로그램
- [ ] PCS2 Station 1~24 ↔ FCC 24개 매핑 검증
- [ ] **14,870개 HMI Tag Master + 14,983개 GFENet Point ↔ PLC Address Dictionary JOIN**
- [ ] `P52/P56/PLC3`의 실제 대상 확인
- [ ] `211=LINE A / 212=LINE B` 기준 설비별 Master/Slave/듀얼NIC 구조 분류

---

## 최종 확정할 데이터계보

```text
현장 신호
→ PLC Project / Address
→ PLC IP
→ 2026 DeviceXPlorer Device
→ 2024/현재 InTouch Source
→ Application
→ Topic
→ InTouch Tag
→ Item/PLC Address
→ History/Historian Tag
→ Historian Storage
→ Alarm / WWALMDB
→ AI Canonical Feature
```

상세 절차:

- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]
- [[../30-데이터-분석/03-광암-InTouch-dde-cfg-통신매핑-분석]]
- [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]


신규 근거: [[2026-09-09-제어설비-IP-HMI자료정리-대조-기록]]
