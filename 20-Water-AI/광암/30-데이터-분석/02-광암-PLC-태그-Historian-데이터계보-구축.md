---
doc_id: GW-DATA-002
title: 광암 PLC-Tag-Historian 데이터계보 구축
plant: 광암
category: 데이터분석
status: action-required
revision: 0.1
last_updated: 2026-09-08
source_refs:
  - SRC-XG5000-GW-20260908
  - SRC-WONDERWARE-GW-20260908
  - SRC-WWALMDB-BAK-ANALYSIS
---

# 광암 PLC → InTouch Tag → Historian → AI 데이터계보 구축

## 1. 목적

광암 정수 AI 학습데이터는 단순히 DB 컬럼만 확보해서는 안 된다. **센서가 어느 PLC 주소에 들어오고, SCADA에서 어떤 Tag로 사용되며, Historian에 어떤 이름으로 저장되는지**를 한 행으로 연결해야 한다.

최종 목표:

```text
Physical Signal
→ PLC Project / Address
→ PLC Network Transfer
→ DeviceXPlorer
→ InTouch
→ Historian
→ AI Canonical Feature
```

---

## 2. 최종 Master Mapping 컬럼

| 구분 | 컬럼 예시 | 설명 |
|---|---|---|
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
| InTouch | `intouch_tag` | HMI Tag |
| Access Name | `access_name` | InTouch IO Access |
| Item | `item_name` | PLC 주소/DeviceXPlorer Item |
| Historian | `historian_tag` | 실제 시계열 Tag |
| Alarm | `alarm_source` | WWALMDB 연계 여부 |
| AI 표준변수 | `canonical_feature` | `RAW_TURBIDITY`, `PUMP_HZ`, `POWER_KW` 등 |
| 품질 | `quality_rule` | Bad/Uncertain 처리 |
| 단위 | `unit` | NTU, m3/h, Hz, kW 등 |
| 확인상태 | `mapping_status` | confirmed/inferred/open |

---

## 3. 데이터 소스별 역할

### XG5000 원본

```text
무엇을 알려주는가
- PLC 역할
- 실제 메모리 주소
- Symbol/주석
- 프로그램 블록
- AUTO/PID/Interlock/통신 로직
- PLC 간 송수신 메모리
```

### DeviceXPlorer / InTouch

```text
무엇을 알려주는가
- 어떤 PLC를 상위 HMI가 읽는가
- InTouch Access Name / Topic
- InTouch Tag가 어떤 Item/PLC 주소를 보는가
```

### Historian

```text
무엇을 알려주는가
- 어떤 Tag가 장기간 저장되는가
- Timestamp / Quality / 저장주기
- 실제 AI 학습용 과거 데이터 존재 여부
```

### WWALMDB

```text
무엇을 알려주는가
- Alarm/Event 발생
- ACK/복귀/상태변경
- 공정 PV 시계열의 보조 이벤트 데이터
```

---

## 4. 1차 우선 추적 대상

광암 정수 AI 기준으로 다음부터 연결한다.

1. 원수/정수량 및 주요 유량
2. 원수 탁도 및 주요 수질
3. 약품 주입량 및 관련 Set Point
4. 중계/송수/공정 펌프 RUN, Hz, 가동대수
5. 설비별 전력 kW
6. 여과/역세 관련 운전상태
7. AUTO/MANUAL
8. Alarm/Fault
9. 실제 Set Point와 적용값

---

## 5. 작업 순서

```text
1. XGWX 155개 프로젝트 정규화
2. 현장 PLC Canonical ID 부여
3. PLC 주소/심볼/프로그램 추출
4. PLC 간 네트워크 이동주소 추출
5. DeviceXPlorer 13개 Device와 PLC 프로젝트 대조
6. InTouch DBDump로 Access Name/Item 연결
7. Historian Tag Export로 저장 Tag 연결
8. 샘플 시계열 값 대조
9. AI Canonical Feature 부여
10. Master DB 컬럼/ETL 명세 확정
```

---

## 6. 완료 기준

대표 AI 항목마다 아래처럼 한 줄이 완성되어야 한다.

```text
현장센서
→ PLC/주소
→ SCADA Tag
→ Historian Tag
→ 실제 값 샘플
→ 단위/주기/Quality
→ AI Feature
```

주소나 Tag 이름만 비슷하다는 이유로 자동 매핑하지 않는다. **값의 시간대조와 공정 의미까지 일치해야 confirmed로 승격**한다.

## 관련 문서

- [[../20-현장-시스템/04-광암-PLC-XG5000-구조-및-통신맵]]
- [[../20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치]]
- [[01-WWALMDB-AlarmDB-vs-Historian]]
