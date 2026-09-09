---
doc_id: GW-DATA-001
title: WWALMDB AlarmDB와 Historian 분리
plant: 광암
category: 데이터분석
status: review
revision: 0.2
last_updated: 2026-09-09
source_refs:
  - SRC-WONDERWARE-GW-20260908
  - SRC-WWALMDB-BAK-ANALYSIS
---

# WWALMDB AlarmDB와 Historian 분리

## 결론

광암에서 분석한 `WWALMDB`는 **Wonderware InTouch의 Alarm DB Logger 계열 SQL Server 알람·이벤트 DB**로 분류한다.

**공정 PV 장기 시계열을 저장하는 Wonderware Historian과는 다른 목적의 저장소다.**

```mermaid
flowchart LR
    IT["InTouch"] -->|"Alarm/Event"| ADB["WWALMDB<br/>SQL Server"]
    IT -->|"Process Tag History"| HIST["Wonderware Historian"]
    ADB --> EVENT["AI용 이벤트/장애 보조 데이터"]
    HIST --> PV["AI용 공정 시계열 주 데이터"]
```

## WWALMDB에서 기대할 데이터

- Alarm 발생 시각
- Alarm 상태 변화
- ACK 여부/시각
- 정상 복귀
- Provider/Group/Tag 관련 정보
- System alarm 및 process alarm
- 이벤트성 기록

이전 WWALMDB 재분석에서 `$System` 계열과 Alarm/State 성격의 데이터가 다수 확인된 것도 이 구조와 일치한다.

## Historian에서 기대할 데이터

- 유량/수량
- 탁도 등 수질 PV
- 약품 투입량
- 펌프/인버터 Hz
- 설비별 전력
- Set Point
- 운전상태 값
- 연속 또는 변화기반 시계열

## AI 학습 데이터 사용 구분

| 데이터 | 주 저장소 | AI에서의 용도 |
|---|---|---|
| 연속 공정 PV | Historian | 예측·최적화 모델의 주 학습 데이터 |
| Set Point | Historian/InTouch | 운전조건·제어조건 분석 |
| Alarm/Fault | WWALMDB | 이상구간 라벨, 장애 이벤트 분석 |
| ACK/복귀 | WWALMDB | 장애 지속시간, 운영 대응 분석 |
| PLC 실시간 값 | DeviceXPlorer/FEnet | Historian 누락 항목의 보완 수집 |

## 주의

`WWALMDB`에 공정 Tag 이름처럼 보이는 값이 일부 존재하더라도 그것만으로 해당 Tag의 연속 PV 이력이 저장된다고 판단하면 안 된다. Alarm DB에는 **알람 발생 시점의 Tag/Event 정보**가 저장될 수 있기 때문이다.

## 다음 확인

1. **Historian 실제 History Storage/History Block 확보**
2. 최신 Runtime의 `StorageLocation.Path` 및 StorageNode 확인
3. 장기간 `Timestamp/TagName/Value/Quality` Export
4. 실제 최초/최종 Timestamp와 보존기간 확인
5. Historian 데이터와 WWALMDB Event를 Timestamp로 결합 가능한지 검증

## 관련 문서

- [[../20-현장-시스템/01-광암-데이터흐름-및-통신구조]]
- [[../20-현장-시스템/02-Wonderware-DeviceXPlorer-InTouch-Historian-구조]]
- [[../90-근거-기록/2026-09-08-Wonderware-자료분석-기록]]



## 2026-09-09 Historian 직접 근거 추가

`WWALMDB ≠ Historian` 판단은 그대로 유지된다.

이번에는 `historian.txt`에서 실제 Wonderware Historian 구성을 직접 확인했다.

```text
IOServer: 192.9.211.120 / GFENet / SuiteLink
Historian Tag: 2,235
Storage: D:\Historian\Data\...
```

따라서 광암에는 최소 2022 시점 **공정 시계열 Historian 계층이 실제 구성돼 있었음**을 추가 확정한다.

`WWALMDB`는 Alarm/Event SQL 이력, Historian은 공정 시계열 Tag 저장으로 분리한다.


## 2026-09-09 Runtime/Holding/backup2 BAK 분석으로 추가 확정

이제 저장소를 세 계층으로 구분한다.

| 계층 | 확보 여부 | 역할 | AI 용도 |
|---|---|---|---|
| `WWALMDB` | 확보 | Alarm/Event SQL 이력 | 이상구간/장애 이벤트 보조 |
| `Runtime` | 확보 | Historian Tag/Storage 메타데이터 | Tag 사전/주소/주기/Storage 경로 해석 |
| 실제 `History Storage` | **미확보** | 장기간 공정 `Timestamp/Value/Quality` | 예측·최적화 주 학습 데이터 |

`backup2.bak`는 이름과 달리 원래 DB가 **`Runtime`**이며, 2026-07-23 백업이다. 최신 Runtime에는 Tag 2,434개, AnalogTag 2,402개가 등록돼 있다.

그러나 `ManualAnalogHistory`, `ManualDiscreteHistory`, `ManualStringHistory`는 0건이고, 실제 장기간 공정값을 포함하는 저장본은 이 BAK들에서 확인되지 않았다.

따라서 **현재 확보된 DB를 “AI 학습용 Historian DB 확보 완료”로 표기하면 안 된다.** 정확한 표현은:

> **Historian 설정/메타 DB 확보 완료, 실제 장기 History Storage 데이터 미확보**

상세: [[06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정]]
