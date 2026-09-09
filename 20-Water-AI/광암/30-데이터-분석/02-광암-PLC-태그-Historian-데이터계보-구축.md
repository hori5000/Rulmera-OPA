---
doc_id: GW-DATA-002
title: 광암 PLC-Tag-Historian 데이터계보 구축
plant: 광암
category: 데이터분석
status: action-required
revision: 0.3
last_updated: 2026-09-09
source_refs:
  - SRC-XG5000-GW-20260908
  - SRC-WONDERWARE-GW-20260908
  - SRC-PREVISIT-HMI-GW-20260909
  - SRC-GW-HUB-IPMAP-201609
  - SRC-GW-HMI-DATA-20240502
  - SRC-WWALMDB-BAK-ANALYSIS
---

# 광암 PLC → InTouch Tag → Historian → AI 데이터계보 구축

## 1. 목적

광암 정수 AI 학습데이터는 단순히 DB 컬럼만 확보해서는 안 된다. **센서가 어느 PLC 주소에 들어오고, HMI에서 어떤 Tag로 사용되며, 어느 History/Historian 계층에 어떤 이름으로 저장되는지**를 한 행으로 연결해야 한다.

또한 이번 대조에서 2024 HMI 백업과 2026 현장 설정이 함께 존재하므로 **시점(Snapshot)을 반드시 분리**한다.

최종 목표:

```text
Physical Signal
→ PLC Project / Address
→ PLC Network Transfer
→ 2026 DeviceXPlorer Device
→ 2024 InTouch Source/Application/Topic/Item
→ Current InTouch/Historian
→ AI Canonical Feature
```

---

## 2. 최종 Master Mapping 컬럼

| 구분 | 컬럼 예시 | 설명 |
|---|---|---|
| 시점 | `source_snapshot_date` | 2024-03-29 / 2026-09-07 등 |
| 근거 | `source_evidence` | XGWX / dde.cfg / Historian Export 등 |
| 현장 | `plant` | GWANGAM |
| 공정 | `process` | 착수/혼화/침전/여과/활성탄/약품 등 |
| 설비 | `equipment_id` | 펌프/밸브/계측기/주입설비 |
| PLC | `plc_id` | PCS1, PCS2, FCC1_1 등 |
| PLC 프로젝트 | `xg5000_project` | 근거 XGWX 파일 |
| PLC 주소 | `plc_address` | `%MW`, `%MX`, `%IX`, `%QX` 등 |
| PLC 심볼 | `plc_symbol` | XG5000 Symbol |
| PLC 프로그램 | `program_block` | AUTO/PID/통신/고속링크 등 |
| 네트워크 | `network_path` | 211/212 FEnet, FCC 통신 등 |
| DXP Device | `dxp_device` | P1, P2, P21 등 |
| HMI Source | `intouch_source` | P1/P2/P52 등 |
| Application | `application_server` | `GFENet`, `FSGateway`, `HistData` 등 |
| Topic | `topic_name` | P1/P2/... |
| InTouch Tag | `intouch_tag` | HMI Tag |
| Item | `item_name` | `MW3781` 등 |
| Historian | `historian_tag` | 실제 장기 시계열 Tag |
| Alarm | `alarm_source` | WWALMDB 연계 여부 |
| AI 표준변수 | `canonical_feature` | `RAW_TURBIDITY`, `PUMP_HZ`, `POWER_KW` 등 |
| 품질 | `quality_rule` | Bad/Uncertain 처리 |
| 단위 | `unit` | NTU, m3/h, Hz, kW 등 |
| 확인상태 | `mapping_status` | confirmed/inferred/open |

---

## 3. 데이터 소스별 역할

### XG5000 원본

```text
- PLC 역할
- 메모리 주소
- Symbol/주석
- 프로그램 블록
- AUTO/PID/Interlock/통신 로직
- PLC 간 송수신 메모리
```

### 2024 InTouch `dde.cfg`

```text
- DDE/SuiteLink Source
- Application Name
- Topic
- InTouch Tag
- Item(MW 주소)
```

현재 추출된 GFENet Point:

```text
14,983개
```

따라서 PLC 주소와 HMI Tag를 연결하는 **첫 번째 대량 매핑 자료**로 사용한다.

### DeviceXPlorer 2026 설정

```text
- 13개 주요 PLC 논리 Device
- 각 원격 IP
- LsisEthernet
- TCP 2004
```

2024 GFENet의 13개 주요 Topic과 이름이 완전히 일치한다.

### HMI Tag DB / DBDump 계열

`광암정수센터_HMI자료정리.xlsx`의 `광암_태그` Sheet에서 이미 다음을 확보했다.

```text
IODisc 10,146
IOReal 4,724
Tag Type / Comment / Logged / EventLogged
AccessName / ItemName / ReadOnly
Alarm 설정 / EU 일부
```

따라서 기본 데이터계보 구축은 바로 시작할 수 있다. `tagname.x`는 원본 검증/2026 변경분 보강용으로 활용한다.

### Historian

```text
- 실제 장기 저장 Tag
- Timestamp / Quality / 저장주기
- 보존기간
- 실제 AI 학습용 과거 데이터 존재 여부
```

### WWALMDB

```text
- Alarm/Event 발생
- ACK/복귀/상태변경
- 공정 PV 시계열의 보조 이벤트 데이터
```

---

## 4. 1차 우선 추적 대상

광암 정수 AI 기준:

1. 원수/정수량 및 주요 유량
2. 원수 탁도 및 주요 수질
3. 약품 주입량 및 관련 Set Point
4. 중계/송수/공정 펌프 RUN, Hz, 가동대수
5. 설비별 전력 kW
6. 여과/역세 관련 운전상태
7. AUTO/MANUAL
8. Alarm/Fault
9. 실제 Set Point와 적용값

사전 HMI 백업에는 다음 화면/기능 명칭도 존재하므로 우선 추적 후보 선정에 활용할 수 있다.

```text
전력감시
중계펌프장
PAC투입
CO2
오존
염소
여과지
활성탄
원수유량제어
역세척
```

---

## 5. 작업 순서 — 2026-09-09 기준 수정

```text
1. XGWX 155개 프로젝트 정규화
2. PLC Canonical ID 부여
3. PLC 주소/심볼/프로그램 추출
4. PLC 간 네트워크 이동주소 추출

5. 2024 dde.cfg 14,983 GFENet Point 로드
6. Topic 13개 ↔ 2026 DeviceXPlorer 13개 Device 연결
7. MW Item ↔ XG5000 PLC Address 대조

8. 2024 HMI Tag Master 14,870개를 dde.cfg Point와 결합
9. `211=LINE A / 212=LINE B`, POS11 `211.120/212.120` 네트워크 근거 반영
10. 현재 2026 InTouch DBDump / DeviceXPlorer Application Name 확인
11. GFENet ↔ DeviceXPlorer 관계 확정

12. dhistcfg.ini / historian.txt / Historian Tag Export 연결
13. 샘플 시계열 값 시간대조
14. AI Canonical Feature 부여
15. Master DB 컬럼/ETL 명세 확정
```

---

## 6. 현재 생성된 분석파일

```text
광암-InTouch-DDE-Point-Mapping-20240329.csv
광암-InTouch-DDE-Source-Summary-20240329.csv
광암-HUB-IP-Map-201609_20210917.csv
광암-HMI-IOAccess-Summary-20240502.csv
광암-HMI-Tag-Master-Disc-Real-20240502.csv
광암-HMI-Tag-Logging-Summary-20240502.csv
```

Point Mapping 컬럼:

```text
source
application
topic
secondary_application
secondary_topic
tag_name
internal_id
item_name
```

이제 `dde.cfg Point Mapping`과 `HMI Tag Master`를 먼저 결합한 뒤 PLC Address Dictionary와 JOIN하는 것이 다음 핵심 작업이다.

---

## 7. 완료 기준

대표 AI 항목마다 아래처럼 한 줄이 완성돼야 한다.

```text
현장센서
→ PLC/주소
→ 2024 HMI Tag/Item
→ 현재 HMI/통신 Source
→ Historian Tag
→ 실제 값 샘플
→ 단위/주기/Quality
→ AI Feature
```

주소나 Tag 이름만 비슷하다는 이유로 자동 매핑하지 않는다.

**시간대조 + 공정 의미 + 주소 근거**가 모두 일치해야 `confirmed`로 승격한다.

특히 2024 백업과 2026 현재 설정을 연결할 때는:

```text
동일 이름
= 동일 장치라는 강한 단서
≠ 동일 런타임 상태의 자동 증명
```

으로 처리한다.

## 관련 문서

- [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]
- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]
- [[03-광암-InTouch-dde-cfg-통신매핑-분석]]
- [[01-WWALMDB-AlarmDB-vs-Historian]]
- [[../90-근거-기록/2026-09-09-사전제공-HMI-자료-대조-기록]]


상세 교차분석: [[04-광암-HMI-TagDB-및-IP맵-교차분석]]
