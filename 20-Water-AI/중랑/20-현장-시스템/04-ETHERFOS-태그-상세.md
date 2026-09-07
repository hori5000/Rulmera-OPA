---
doc_id: JN-MAP-ETHERFOS-001
title: ETHERFOS 태그 상세
plant: 중랑
category: SignalMaster
status: review
revision: 0.1
last_updated: 2026-09-07
source_refs:
  - SRC-FIELD-03
related_wbs:
  - 1.1.1
  - 2.1.1
---

# ETHERFOS 태그 상세

## 현재 확인된 내용

- CIMON DBX 기준 Active ETHERFOS Tag의 PLC Device는 `A2 PILOT.PLC`이다.
- Live `tb_suyo`에서 동일 `TAGNAME`이 확인된 것으로 정리되어 있다.
- SCADA 기준 PLC 주소 범위는 주로 `%MW500~609`, NH4/NO3는 `%MW700~701`이다.

## Leaf 의미

| Leaf | 의미 | AI 사용 |
|---|---|---|
| PV | 현재 수질값 | 핵심 Feature/Target 후보 |
| TE | 분석기 측정 온도 | 보조 Feature |
| RN | 운전 상태 | 품질 판정 |
| FL | 이상 상태 | 고장 구간 제외 |
| MOD | 측정 중 | 품질 판정 |
| MOD2 | 교정 중 | 교정 구간 제외 |
| COMERR | 통신 이상 | 통신불량 구간 제외 |
| NH4 / NO3 | 호기조 현재값 | 핵심 수질 Feature/Target 후보 |

## 상세 태그

| SCADA Tag | 분석 Group | Leaf | 설명 | PLC 메모리 | 신호형태 | 기능 | AI 수집등급 | AI 활용 | 추가확인 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ETHERFOS.AI.NH4 | AI | NH4 | [호기조] NH4 현재값 | %MW700 | AI | 호기조 NH4 현재값 | 필수 | 수질 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.AI.NO3 | AI | NO3 | [호기조] NO3 현재값 | %MW701 | AI | 호기조 NO3 현재값 | 필수 | 수질 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_PH.PV | IN_PH | PV | [유입수] PH 현재값 | %MW530 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_SS.PV | IN_SS | PV | [유입수] SS 현재값 | %MW540 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.COMERR | IN_TN | COMERR | [유입수] TN 통신이상 | %MW519.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.FL | IN_TN | FL | [유입수] TN 이상 | %MW514.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.MOD | IN_TN | MOD | [유입수] TN 측정중 | %MW514.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.MOD2 | IN_TN | MOD2 | [유입수] TN 교정중 | %MW514.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.PV | IN_TN | PV | [유입수] TN 현재값 | %MW510 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.RN | IN_TN | RN | [유입수] TN 운전 | %MW514.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TN.TE | IN_TN | TE | [유입수] TN 온도 | %MW512 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.COMERR | IN_TOC | COMERR | [유입수] TOC 통신이상 | %MW509.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.FL | IN_TOC | FL | [유입수] TOC 이상 | %MW504.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.MOD | IN_TOC | MOD | [유입수] TOC 측정중 | %MW504.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.MOD2 | IN_TOC | MOD2 | [유입수] TOC 교정중 | %MW504.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.PV | IN_TOC | PV | [유입수] TOC 현재값 | %MW500 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.RN | IN_TOC | RN | [유입수] TOC 운전 | %MW504.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TOC.TE | IN_TOC | TE | [유입수] TOC 온도 | %MW502 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.COMERR | IN_TP | COMERR | [유입수] TP 통신이상 | %MW529.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.FL | IN_TP | FL | [유입수] TP 이상 | %MW524.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.MOD | IN_TP | MOD | [유입수] TP 측정중 | %MW524.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.MOD2 | IN_TP | MOD2 | [유입수] TP 교정중 | %MW524.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.PV | IN_TP | PV | [유입수] TP 현재값 | %MW520 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.RN | IN_TP | RN | [유입수] TP 운전 | %MW524.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.IN_TP.TE | IN_TP | TE | [유입수] TP 온도 | %MW522 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_PH.PV | OUT_PH | PV | [방류수] PH 현재값 | %MW580 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_SS.PV | OUT_SS | PV | [방류수] SS 현재값 | %MW590 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.COMERR | OUT_TN | COMERR | [방류수] TN 통신이상 | %MW569.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.FL | OUT_TN | FL | [방류수] TN 이상 | %MW564.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.MOD | OUT_TN | MOD | [방류수] TN 측정중 | %MW564.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.MOD2 | OUT_TN | MOD2 | [방류수] TN 교정중 | %MW564.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.PV | OUT_TN | PV | [방류수] TN 현재값 | %MW560 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.RN | OUT_TN | RN | [방류수] TN 운전 | %MW564.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TN.TE | OUT_TN | TE | [방류수] TN 온도 | %MW562 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.COMERR | OUT_TOC | COMERR | [방류수] TOC 통신이상 | %MW559.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.FL | OUT_TOC | FL | [방류수] TOC 이상 | %MW554.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.MOD | OUT_TOC | MOD | [방류수] TOC 측정중 | %MW554.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.MOD2 | OUT_TOC | MOD2 | [방류수] TOC 교정중 | %MW554.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.PV | OUT_TOC | PV | [방류수] TOC 현재값 | %MW550 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.RN | OUT_TOC | RN | [방류수] TOC 운전 | %MW554.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TOC.TE | OUT_TOC | TE | [방류수] TOC 온도 | %MW552 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.COMERR | OUT_TP | COMERR | [방류수] TP 통신이상 | %MW579.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.FL | OUT_TP | FL | [방류수] TP 이상 | %MW574.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.MOD | OUT_TP | MOD | [방류수] TP 측정중 | %MW574.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.MOD2 | OUT_TP | MOD2 | [방류수] TP 교정중 | %MW574.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.PV | OUT_TP | PV | [방류수] TP 현재값 | %MW570 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.RN | OUT_TP | RN | [방류수] TP 운전 | %MW574.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.OUT_TP.TE | OUT_TP | TE | [방류수] TP 온도 | %MW572 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.COMERR | PO4P | COMERR | [호기조] PO4P 통신이상 | %MW609.00 | DI | 통신 이상 상태 | 품질관리 | 통신불량 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.FL | PO4P | FL | [호기조] PO4P 이상 | %MW604.01 | DI | 분석기 이상 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.MOD | PO4P | MOD | [호기조] PO4P 측정중 | %MW604.02 | DI | 측정 중 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.MOD2 | PO4P | MOD2 | [호기조] PO4P 교정중 | %MW604.03 | DI | 교정 중 상태 | 품질관리 | 교정 구간 제외 판단 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.PV | PO4P | PV | [호기조] PO4P 현재값 | %MW600 | AI | 수질 현재값 | 필수 | 학습 Feature/Target 후보 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.RN | PO4P | RN | [호기조] PO4P 운전 | %MW604.00 | DI | 분석기 운전 상태 | 품질관리 | 학습 제외/품질판정 | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |
| ETHERFOS.PO4P.TE | PO4P | TE | [호기조] PO4P 온도 | %MW602 | AI | 분석기 측정 온도 | 보조 | 조건부 Feature | 분석기→A2 PILOT PLC로 들어오는 실제 통신방식/PLC 내부 수신 로직은 .10 XGWX에서 추가확인 |

## 추가 확인 필요

ETHERFOS 분석기에서 A2 PILOT PLC로 들어오는 **실제 통신방식과 PLC 내부 수신 로직**은 A2 PILOT XG5000 원본에서 추가 확인해야 한다.
