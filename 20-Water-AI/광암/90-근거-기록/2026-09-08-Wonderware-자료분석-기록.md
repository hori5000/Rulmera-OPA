---
doc_id: GW-EVIDENCE-WONDERWARE-20260908
title: 2026-09-08 Wonderware 자료분석 기록
plant: 광암
category: 분석근거
status: confirmed
recorded_date: 2026-09-08
source_id: SRC-WONDERWARE-GW-20260908
source_file: Wonderware.zip
---

# 2026-09-08 Wonderware 자료분석 기록

## 분석 대상

- 파일: `Wonderware.zip`
- 목적: 광암 HMI/SCADA/PLC 통신/Historian 구성 식별

## 직접 확인된 파일/근거

### 1. DeviceXPlorer 설정

```text
Wonderware/InTouch/DXPSV.dxp
```

직접 확인값:

- XML 주석: `DeviceXPlorer 5 Configuration File`
- `ProductVersion="5, 4, 0, 1"`
- PLC Device `LibType="LsisEthernet"`
- Ethernet Port 13개
- 설정 내 반복 로컬측 IP: `192.9.211.120`
- 원격 PLC/설비 주소: `192.9.211.10, .12, .14, .16, .18, .21, .22, .23, .25, .26, .28, .30, .32`
- TCP Port: 전 대상 `2004`

### 2. InTouch 버전

```text
Wonderware/InTouch/Readme.html
```

확인 내용:

- `InTouch HMI 2014 R2 (v11.1) Service Pack 1`
- FS Gateway 3.0 SP1이 해당 제품 설치에서 hidden feature로 설치될 수 있다는 설명 존재

### 3. Historian 버전

```text
Wonderware/Historian/ReadMe.html
```

확인 내용:

- `Wonderware Historian Server 2014 R2 (version 11.6.13100) SP1`

### 4. FSGateway 설치 구성

```text
Wonderware/DAServer/FSGateway/
```

확인 내용:

- `FSGateway.exe`
- OPC/DDE/SuiteLink 관련 DLL 구성
- 단, 이 ZIP에서는 FSGateway의 현장 런타임 연결 설정 파일은 확인되지 않음

### 5. InTouch Alarm DB Logger 구성요소

`InTouch` 폴더에 다음 파일들이 존재한다.

```text
wwalmlogger.exe
wwalmpurge.exe
wwalmrestore.exe
AlarmDBViewControl.chm
ITAlarmsAndEvents.pdf
```

`ITAlarmsAndEvents.pdf`는 Alarm DB Logger가 **historical alarms and events를 SQL Server alarm database에 저장**하는 구조를 설명한다.

## 분석 판단

### 확정

- DeviceXPlorer가 LSIS Ethernet 장치 13개를 대상으로 설정되어 있다.
- InTouch 2014 R2 SP1, Historian 2014 R2 SP1, FS Gateway 3.0 SP1 계열 구성이다.
- PLC 통신 설정은 원격 TCP 2004를 사용한다.

### 강한 판단

- 기존 분석한 `WWALMDB`는 InTouch Alarm DB Logger의 알람·이벤트 DB로 보는 것이 타당하다.
- AI 학습용 장기 공정 시계열은 `WWALMDB`가 아니라 Historian을 우선 조사해야 한다.

### 아직 미확정

- DeviceXPlorer가 InTouch와 직접 연결되는지, FSGateway를 경유하는지
- InTouch Access Name / Topic / I/O Item 설정
- Historian 실제 Tag 목록과 데이터 보존기간
- Historian 데이터 저장 위치와 Export 방식
- `192.9.211.120`이 실제 운영 PC/NIC 주소인지 여부

## 후속 확보 요청자료

- InTouch Application 전체 폴더 또는 Tag Dictionary Export
- InTouch Access Name 설정 화면/Export
- DeviceXPlorer 전체 운전 설정 및 Item 목록
- Historian Tag Export
- Historian Management Console 설정 화면 또는 설정 백업
- Historian 샘플 CSV/Query 결과

## 관련 문서

- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조]]
- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]
- [[../30-데이터-분석/01-WWALMDB-AlarmDB-vs-Historian]]

## 2026-09-08 추가 분석 — DeviceXPlorer 정체 및 실제 연결 확인 포인트

TAKEBISHI 자료를 대조한 결과 DeviceXPlorer는 **산업용 통신 미들웨어/OPC Server**이며 Wonderware InTouch와 DDE/SuiteLink로 직접 연결할 수 있다. Ver.5의 SuiteLink Application Name 기본값은 `DXPSV`이다.

광암 `DXPSV.dxp`의 추가 구조 확인:

```text
DEVICE 요소: 13개 현장 Device + SYSTEM
정적 TAG 요소: 1개
EnableUnknownItemID = 1
AutoAddItem = 0
```

TAKEBISHI 가이드상 InTouch Item Name에서 `M100`, `D123`과 같은 동적 PLC 주소 직접 지정이 가능하다. 따라서 **광암의 전체 PLC 주소는 DXPSV.dxp가 아니라 InTouch Tag Dictionary/DBDump의 Item Name에 있을 가능성이 높다.** 이 판단은 InTouch DBDump 확보 후 확정한다.

Wonderware Historian 11.6 계열에서는 SMC의 다음 위치가 InTouch 연결을 확인하는 핵심이다.

```text
Configuration Editor → System Configuration → Storage → Imported Nodes
Configuration Editor → Public Groups → InTouch Nodes
Configuration Editor → System Configuration → Tag Configuration
Configuration Editor → System Configuration → Storage → Storage Locations
Management Console → History Blocks
```

`Imported Nodes`의 Path가 광암 InTouch Application의 `Tagname.x` UNC 경로를 가리키는지 확인하면 InTouch→Historian 관계를 직접 증명할 수 있다.

세부 절차: [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]


## 2026-09-08 XG5000 원본 확보 후 연결

PLC 수집 패키지에서 `.xgwx` 155개가 확보되어 이제 `DXPSV.dxp`의 13개 PLC 대상과 **실제 XG5000 프로젝트/IP/통신메모리**를 대조할 수 있다.

주요 구조는 [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]에 별도로 관리한다.

다음 핵심 병목은 InTouch DBDump와 Historian Tag다.
