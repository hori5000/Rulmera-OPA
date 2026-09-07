---
doc_id: JN-MAP-A2O-001
title: A2O PLC - SCADA - DB 매핑 상세
plant: 중랑
category: SignalMaster
status: review
revision: 0.1
last_updated: 2026-09-07
source_refs:
  - SRC-FIELD-03
related_wbs:
  - 1.1.1
  - 1.1.2
---

# A2O PLC - SCADA - DB 매핑 상세

## 현재 확인된 내용

확보된 A2O XG5000 원본(`192.168.90.20`)과 CIMON DBX의 **동일 PLC 메모리 주소를 연결키로 교차 매칭**한 결과를 Obsidian 표로 옮긴 것이다.

- 수질 14개: `%MD2000~2013`, `계측기통신_씨맥`
- 전력: `서브미터통신` 및 `DATA_SWAP` 이후 SCADA 전달영역 `%MD6000~6127` 계열
- `AI.E_*` 전력 Tag는 Live `tb_suyo`에 확인
- `AI.WQ.*` 14개는 주소/심볼은 확인되나 현재 분석된 Active 226 Tag에는 미포함

## 상세 매핑

| SCADA Tag | PLC 메모리 | XG5000 프로그램 | XG5000 심볼 | SCADA 설명 | 단위 | Live tb_suyo | DB DESCRIPT | 근거수준 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AI.E_MAIN.AI_AR | %MD6005 | 서브미터통신 | MAIN_A_R_R | E_MAIN R상 전류 | A | Y | E_MAIN R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_AS | %MD6006 | 서브미터통신 | MAIN_A_S_R | E_MAIN S상 전류 | A | Y | E_MAIN S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_AT | %MD6007 | 서브미터통신 | MAIN_A_T_R | E_MAIN T상 전류 | A | Y | E_MAIN T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_HZ | %MD6010 | 서브미터통신 | MAIN_HZ_R | E_MAIN 주파수 | Hz | Y | E_MAIN 주파수 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_MKWH | %MD6001 | 서브미터통신 | MAIN_KVARH_R | E_MAIN 무효전력량 | kvarh | Y | E_MAIN 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_MW | %MD6009 | 서브미터통신 | MAIN_VAR_R | E_MAIN 순시무효전력 | var | Y | E_MAIN 순시무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_PF | %MD6011 | 서브미터통신 | MAIN_PF_R | E_MAIN 역률 | pF | Y | E_MAIN 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_UKWH | %MD6000 | 서브미터통신 | MAIN_KWH_R | E_MAIN 유효전력량 | kWh | Y | E_MAIN 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_UW | %MD6008 | 서브미터통신 | MAIN_WATT_R | E_MAIN 순시유효전력 | W | Y | E_MAIN 순시유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_VR | %MD6002 | 서브미터통신 | MAIN_V_RN_R | E_MAIN R상 전압 | v | Y | E_MAIN R상 전압 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_VS | %MD6003 | 서브미터통신 | MAIN_V_SN_R | E_MAIN S상 전압 | v | Y | E_MAIN S상 전압 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_MAIN.AI_VT | %MD6004 | 서브미터통신 | MAIN_V_TN_R | E_MAIN T상 전압 | v | Y | E_MAIN T상 전압 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_AR | %MD6022 | 서브미터통신 | M101_A_R_R | 원수이송펌프 R상 전류 | A | Y | 원수이송펌프 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_AS | %MD6023 | 서브미터통신 | M101_A_S_R | 원수이송펌프 S상 전류 | A | Y | 원수이송펌프 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_AT | %MD6024 | 서브미터통신 | M101_A_T_R | 원수이송펌프 T상 전류 | A | Y | 원수이송펌프 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_MKWH | %MD6021 | 서브미터통신 | M101_KVARH_R | 원수이송펌프 무효전력량 | kvarh | Y | 원수이송펌프 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_MW | %MD6026 | 서브미터통신 | M101_VAR_R | 원수이송펌프 무효전력 | var | Y | 원수이송펌프 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_PF | %MD6027 | 서브미터통신 | M101_PF_R | 원수이송펌프 역률 | pF | Y | 원수이송펌프 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_UKWH | %MD6020 | 서브미터통신 | M101_KWH_R | 원수이송펌프 유효전력량 | kWh | Y | 원수이송펌프 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_101.AI_UW | %MD6025 | 서브미터통신 | M101_WATT_R | 원수이송펌프 유효전력 | W | Y | 원수이송펌프 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_AR | %MD6032 | 서브미터통신 | M102_A_R_R | 유량조정펌프 R상 전류 | A | Y | 유량조정펌프 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_AS | %MD6033 | 서브미터통신 | M102_A_S_R | 유량조정펌프 S상 전류 | A | Y | 유량조정펌프 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_AT | %MD6034 | 서브미터통신 | M102_A_T_R | 유량조정펌프 T상 전류 | A | Y | 유량조정펌프 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_MKWH | %MD6031 | 서브미터통신 | M102_KVARH_R | 유량조정펌프 무효전력량 | kvarh | Y | 유량조정펌프 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_MW | %MD6036 | 서브미터통신 | M102_VAR_R | 유량조정펌프 무효전력 | var | Y | 유량조정펌프 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_PF | %MD6037 | 서브미터통신 | M102_PF_R | 유량조정펌프 역률 | pF | Y | 유량조정펌프 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_UKWH | %MD6030 | 서브미터통신 | M102_KWH_R | 유량조정펌프 유효전력량 | kWh | Y | 유량조정펌프 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_102.AI_UW | %MD6035 | 서브미터통신 | M102_WATT_R | 유량조정펌프 유효전력 | W | Y | 유량조정펌프 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_AR | %MD6042 | 서브미터통신 | M103_A_R_R | 유량조정조 교반기 R상 전류 | A | Y | 유량조정조 교반기 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_AS | %MD6043 | 서브미터통신 | M103_A_S_R | 유량조정조 교반기 S상 전류 | A | Y | 유량조정조 교반기 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_AT | %MD6044 | 서브미터통신 | M103_A_T_R | 유량조정조 교반기 T상 전류 | A | Y | 유량조정조 교반기 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_MKWH | %MD6041 | 서브미터통신 | M103_KVARH_R | 유량조정조 교반기 무효전력량 | kvarh | Y | 유량조정조 교반기 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_MW | %MD6046 | 서브미터통신 | M103_VAR_R | 유량조정조 교반기 무효전력 | var | Y | 유량조정조 교반기 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_PF | %MD6047 | 서브미터통신 | M103_PF_R | 유량조정조 교반기 역률 | pF | Y | 유량조정조 교반기 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_UKWH | %MD6040 | 서브미터통신 | M103_KWH_R | 유량조정조 교반기 유효전력량 | kWh | Y | 유량조정조 교반기 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_103.AI_UW | %MD6045 | 서브미터통신 | M103_WATT_R | 유량조정조 교반기 유효전력 | W | Y | 유량조정조 교반기 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_AR | %MD6052 | 서브미터통신 | M201_A_R_R | 혐기조 교반기 R상 전류 | A | Y | 혐기조 교반기 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_AS | %MD6053 | 서브미터통신 | M201_A_S_R | 혐기조 교반기 S상 전류 | A | Y | 혐기조 교반기 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_AT | %MD6054 | 서브미터통신 | M201_A_T_R | 혐기조 교반기 T상 전류 | A | Y | 혐기조 교반기 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_MKWH | %MD6051 | 서브미터통신 | M201_KVARH_R | 혐기조 교반기 무효전력량 | kvarh | Y | 혐기조 교반기 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_MW | %MD6056 | 서브미터통신 | M201_VAR_R | 혐기조 교반기 무효전력 | var | Y | 혐기조 교반기 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_PF | %MD6057 | 서브미터통신 | M201_PF_R | 혐기조 교반기 역률 | pF | Y | 혐기조 교반기 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_UKWH | %MD6050 | 서브미터통신 | M201_KWH_R | 혐기조 교반기 유효전력량 | kWh | Y | 혐기조 교반기 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_201.AI_UW | %MD6055 | 서브미터통신 | M201_WATT_R | 혐기조 교반기 유효전력 | W | Y | 혐기조 교반기 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_AR | %MD6062 | 서브미터통신 | M202_A_R_R | 무산소조 교반기 R상 전류 | A | Y | 무산소조 교반기 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_AS | %MD6063 | 서브미터통신 | M202_A_S_R | 무산소조 교반기 S상 전류 | A | Y | 무산소조 교반기 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_AT | %MD6064 | 서브미터통신 | M202_A_T_R | 무산소조 교반기 T상 전류 | A | Y | 무산소조 교반기 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_MKWH | %MD6061 | 서브미터통신 | M202_KVARH_R | 무산소조 교반기 무효전력량 | kvarh | Y | 무산소조 교반기 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_MW | %MD6066 | 서브미터통신 | M202_VAR_R | 무산소조 교반기 무효전력 | var | Y | 무산소조 교반기 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_PF | %MD6067 | 서브미터통신 | M202_PF_R | 무산소조 교반기 역률 | pF | Y | 무산소조 교반기 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_UKWH | %MD6060 | 서브미터통신 | M202_KWH_R | 무산소조 교반기 유효전력량 | kWh | Y | 무산소조 교반기 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_202.AI_UW | %MD6065 | 서브미터통신 | M202_WATT_R | 무산소조 교반기 유효전력 | W | Y | 무산소조 교반기 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_AR | %MD6072 | 서브미터통신 | M203_A_R_R | 송풍기 R상 전류 | A | Y | 송풍기 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_AS | %MD6073 | 서브미터통신 | M203_A_S_R | 송풍기 S상 전류 | A | Y | 송풍기 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_AT | %MD6074 | 서브미터통신 | M203_A_T_R | 송풍기 T상 전류 | A | Y | 송풍기 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_MKWH | %MD6071 | 서브미터통신 | M203_KVARH_R | 송풍기 무효전력량 | kWh | Y | 송풍기 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_MW | %MD6076 | 서브미터통신 | M203_VAR_R | 송풍기 무효전력 | var | Y | 송풍기 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_PF | %MD6077 | 서브미터통신 | M203_PF_R | 송풍기 역률 | pF | Y | 송풍기 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_UKWH | %MD6070 | 서브미터통신 | M203_KWH_R | 송풍기 유효전력량 | kWh | Y | 송풍기 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_203.AI_UW | %MD6075 | 서브미터통신 | M203_WATT_R | 송풍기 유효전력 | W | Y | 송풍기 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_AR | %MD6082 | 서브미터통신 | M204_A_R_R | 내부반송펌프 R상 전류 | A | Y | 내부반송펌프 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_AS | %MD6083 | 서브미터통신 | M204_A_S_R | 내부반송펌프 S상 전류 | A | Y | 내부반송펌프 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_AT | %MD6084 | 서브미터통신 | M204_A_T_R | 내부반송펌프 T상 전류 | A | Y | 내부반송펌프 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_MKWH | %MD6081 | 서브미터통신 | M204_KVARH_R | 내부반송펌프 무효전력량 | kvarh | Y | 내부반송펌프 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_MW | %MD6086 | 서브미터통신 | M204_VAR_R | 내부반송펌프 무효전력 | var | Y | 내부반송펌프 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_PF | %MD6087 | 서브미터통신 | M204_PF_R | 내부반송펌프 역률 | pF | Y | 내부반송펌프 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_UKWH | %MD6080 | 서브미터통신 | M204_KWH_R | 내부반송펌프 유효전력량 | kWh | Y | 내부반송펌프 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_204.AI_UW | %MD6085 | 서브미터통신 | M204_WATT_R | 내부반송펌프 유효전력 | W | Y | 내부반송펌프 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_AR | %MD6092 | 서브미터통신 | M205_A_R_R | 슬러지 수집기 R상 전류 | A | Y | 슬러지 수집기 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_AS | %MD6093 | 서브미터통신 | M205_A_S_R | 슬러지 수집기 S상 전류 | A | Y | 슬러지 수집기 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_AT | %MD6094 | 서브미터통신 | M205_A_T_R | 슬러지 수집기 T상 전류 | A | Y | 슬러지 수집기 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_MKWH | %MD6091 | 서브미터통신 | M205_KVARH_R | 슬러지 수집기 무효전력량 | kvarh | Y | 슬러지 수집기 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_MW | %MD6096 | 서브미터통신 | M205_VAR_R | 슬러지 수집기 무효전력 | var | Y | 슬러지 수집기 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_PF | %MD6097 | 서브미터통신 | M205_PF_R | 슬러지 수집기 역률 | pF | Y | 슬러지 수집기 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_UKWH | %MD6090 | 서브미터통신 | M205_KWH_R | 슬러지 수집기 유효전력량 | kWh | Y | 슬러지 수집기 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_205.AI_UW | %MD6095 | 서브미터통신 | M205_WATT_R | 슬러지 수집기 유효전력 | W | Y | 슬러지 수집기 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_AR | %MD6102 | 서브미터통신 | M206_A_R_R | 슬러지반송펌프 R상 전류 | A | Y | 슬러지반송펌프 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_AS | %MD6103 | 서브미터통신 | M206_A_S_R | 슬러지반송펌프 S상 전류 | A | Y | 슬러지반송펌프 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_AT | %MD6104 | 서브미터통신 | M206_A_T_R | 슬러지반송펌프 T상 전류 | A | Y | 슬러지반송펌프 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_MKWH | %MD6101 | 서브미터통신 | M206_KVARH_R | 슬러지반송펌프 무효전력량 | kvarh | Y | 슬러지반송펌프 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_MW | %MD6106 | 서브미터통신 | M206_VAR_R | 슬러지반송펌프 무효전력 | var | Y | 슬러지반송펌프 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_PF | %MD6107 | 서브미터통신 | M206_PF_R | 슬러지반송펌프 역률 | pF | Y | 슬러지반송펌프 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_UKWH | %MD6100 | 서브미터통신 | M206_KWH_R | 슬러지반송펌프 유효전력량 | kWh | Y | 슬러지반송펌프 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_206.AI_UW | %MD6105 | 서브미터통신 | M206_WATT_R | 슬러지반송펌프 유효전력 | W | Y | 슬러지반송펌프 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_AR | %MD6112 | 서브미터통신 | M301_A_R_R | 방류펌프 R상 전류 | A | Y | 방류펌프 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_AS | %MD6113 | 서브미터통신 | M301_A_S_R | 방류펌프 S상 전류 | A | Y | 방류펌프 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_AT | %MD6114 | 서브미터통신 | M301_A_T_R | 방류펌프 T상 전류 | A | Y | 방류펌프 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_MKWH | %MD6111 | 서브미터통신 | M301_KVARH_R | 방류펌프 무효전력량 | kvarh | Y | 방류펌프 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_MW | %MD6116 | 서브미터통신 | M301_VAR_R | 방류펌프 무효전력 | var | Y | 방류펌프 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_PF | %MD6117 | 서브미터통신 | M301_PF_R | 방류펌프 역률 | pF | Y | 방류펌프 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_UKWH | %MD6110 | 서브미터통신 | M301_KWH_R | 방류펌프 유효전력량 | kWh | Y | 방류펌프 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_301.AI_UW | %MD6115 | 서브미터통신 | M301_WATT_R | 방류펌프 유효전력 | W | Y | 방류펌프 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_AR | %MD6122 | 서브미터통신 | M302_A_R_R | 잉여슬러지 이송펌프 R상 전류 | A | Y | 잉여슬러지 이송펌프 R상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_AS | %MD6123 | 서브미터통신 | M302_A_S_R | 잉여슬러지 이송펌프 S상 전류 | A | Y | 잉여슬러지 이송펌프 S상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_AT | %MD6124 | 서브미터통신 | M302_A_T_R | 잉여슬러지 이송펌프 T상 전류 | A | Y | 잉여슬러지 이송펌프 T상 전류 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_MKWH | %MD6121 | 서브미터통신 | M302_KVARH_R | 잉여슬러지 이송펌프 무효전력량 | kvarh | Y | 잉여슬러지 이송펌프 무효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_MW | %MD6126 | 서브미터통신 | M302_VAR_R | 잉여슬러지 이송펌프 무효전력 | var | Y | 잉여슬러지 이송펌프 무효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_PF | %MD6127 | 서브미터통신 | M302_PF_R | 잉여슬러지 이송펌프 역률 | pF | Y | 잉여슬러지 이송펌프 역률 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_UKWH | %MD6120 | 서브미터통신 | M302_KWH_R | 잉여슬러지 이송펌프 유효전력량 | kWh | Y | 잉여슬러지 이송펌프 유효전력량 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.E_M_302.AI_UW | %MD6125 | 서브미터통신 | M302_WATT_R | 잉여슬러지 이송펌프 유효전력 | W | Y | 잉여슬러지 이송펌프 유효전력 | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.COD | %MD2000 | 계측기통신_씨맥 | COD_DATA | COD |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.DO | %MD2010 | 계측기통신_씨맥 | DO_DATA | DO |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.DOC | %MD2003 | 계측기통신_씨맥 | DOC_DATA | DOC |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.EC | %MD2011 | 계측기통신_씨맥 | EC_DATA | EC |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.NH4_N | %MD2004 | 계측기통신_씨맥 | NH4_N_DATA | NH4-N |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.NO2_N | %MD2005 | 계측기통신_씨맥 | NO2_N_DATA | NO2-N |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.NO3_N | %MD2006 | 계측기통신_씨맥 | NO3_N_DATA | NO3-N |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.ORP | %MD2008 | 계측기통신_씨맥 | ORP_DATA | ORP |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.PH | %MD2009 | 계측기통신_씨맥 | PH_DATA | PH |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.PO4_P | %MD2007 | 계측기통신_씨맥 | PO4_P_DATA | PO4-P |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.TEMP | %MD2013 | 계측기통신_씨맥 | TEMP_DATA | TEMPERAUTR |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.TN | %MD2001 | 계측기통신_씨맥 | TN_DATA | T-N |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.TP | %MD2002 | 계측기통신_씨맥 | TP_DATA | T-p |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |
| AI.WQ.TURB | %MD2012 | 계측기통신_씨맥 | TURB_DATA | TURBIDITY |  | N |  | A: XGWX 주소 ↔ DBX 주소 exact match |

## 주의

- 전력계의 `AI_HZ`는 **계통 주파수**이며 인버터의 모터 운전 Hz와 구분한다.
- A2O PLC 자료로 A2 PILOT 내부 제어 Rule을 확정하지 않는다.
