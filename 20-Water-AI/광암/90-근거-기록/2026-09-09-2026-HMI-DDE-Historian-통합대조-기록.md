---
doc_id: GW-EVIDENCE-HMI-DDE-HIST-20260909
title: 2026-09-09 HMI DDE Historian 통합대조 기록
plant: 광암
category: 분석근거
status: confirmed
recorded_date: 2026-09-09
source_package: GWANGAM-ARCH-COLLECT-20260909-152414.zip
---

# 2026-09-09 HMI DDE Historian 통합대조 기록

## 수집 결과

PowerShell 선택수집본:

```text
총 ZIP Entry: 797
HMI-CORE: 116
HMI-DBCSV: 20
HMI-TREND: 125
PLC-XG5000: 518
PLC-LOG: 8
REF-XLSX: 2
REF-INVENTORY: 2
COPY ERROR: 0
```

## 핵심 기준파일

```text
광암아리수정수센터\DB_20260518.CSV
  Modified: 2026-05-18 13:20:51

광암아리수정수센터\dde.cfg
  Modified: 2026-06-22 09:56:37

광암아리수정수센터\tagname.x
  Modified: 2026-06-22 09:56:37

광암정수장 HMI\HMi backup\historian.txt
  Modified: 2022-12-06 18:20:40
```

## 직접 확인된 결과

- 현재 DBDump IO Tag 15,147개 전부가 현재 dde.cfg TagName과 매칭
- dde.cfg 전체 Point 15,153개
- GFENet Point 15,139개
- 2024 GFENet Point 14,983개 → 2026 순증 +156
- 2022 Historian 실제 설정 Tag 2,235개
- Historian IOServer = `192.9.211.120 / GFENet / SuiteLink`
- Historian Storage = `D:\Historian\Data\...`
- 현재 `dhistcfg.ini` 로컬 History Logging = Disabled
- 2026-06-22 신규 AI 연계 6 Tag가 dde.cfg와 tagname.x 양쪽에서 확인

## AI 연계 신규 Tag

```text
P21 / CO2_AI_USE     / MW260.0
P21 / CO2_AI_COM_ERR / MW260.1
P22 / PAC_AI_USE     / MW20.12
P22 / PAC_AI_COM_ERR / MW20.13
P22 / AI_SYSTEM      / MW300.0
P22 / AI_SYS_STOP    / MW300.0
```

## 판단

- 기존 Obsidian의 `WWALMDB = Alarm/Event DB` 판단은 유지
- 기존 `Historian 실제 Tag 미확보` 판단은 수정: **2022 Historian Export를 확보했으므로 과거 실제 구성은 확인됨**
- 현재 2026 Historian Tag 상태는 아직 별도 확인 필요
- `192.168.0.120 HistData`보다 `192.9.211.120 HistData`가 현재 근거가 강함
- `GFENet = DeviceXPlorer`는 아직 확정하지 않음. DeviceXPlorer 설치/설정과 GFENet Application의 실제 런타임 관계는 별도 확인

상세: [[../30-데이터-분석/05-광암-2026-HMI-DDE-Historian-통합매핑-결과]]
