---
doc_id: JN-MAP-A2P-001
title: A2 PILOT SCADA 매핑 상세 및 PLC 원본 교차검토
plant: 중랑
category: SignalMaster
status: review
revision: 0.2
last_updated: 2026-09-11
source_refs:
  - SRC-FIELD-01
  - SRC-JN-PC-20260907
related_wbs:
  - 1.1.1
  - 1.1.4
---

# A2 PILOT SCADA 매핑 상세 및 PLC 원본 교차검토

## 현재 확인된 내용

CIMON에서 `A2 PILOT.PLC`로 정의된 공정제어 계통의 SCADA Tag와 PLC 주소를 정리한 자료다.

## 반드시 지킬 확정 경계

2026-09-07 현장 PC 수집본에서 A2 PILOT XG5000 원본을 확보했다. 따라서 **“A2 PILOT 원본 없음”이라는 기존 경계는 해소**한다. 다만 아래 표의 SCADA Tag/주소가 실제 Ladder의 어느 접점·Function Block·Interlock에서 어떻게 사용되는지는 현재 [[07-A2-PILOT-PLC-Rule-Book]]에서 순차 검토 중이다. **원본 확보와 Rule v1.0 승인 완료를 같은 의미로 보지 않는다.**

## 상세 매핑

| DB 테이블 | SCADA Tag | 쉬운 설명 | CIMON 장치 | PLC 주소 | 매칭판정 | 추가판단 |
| --- | --- | --- | --- | --- | --- | --- |
| SURVEY_DATA | PID.PH_203.AI_PH_203 | 반응조 pH | A2 PILOT.PLC | %MW104 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| SURVEY_DATA | PID.ORP_204.AI_ORP_204 | 반응조 ORP | A2 PILOT.PLC | %MW105 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| SURVEY_DATA | PID.DO_205.AI_DO_205 | 반응조 DO | A2 PILOT.PLC | %MW106 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| SURVEY_DATA | PID.MLSS_206.AI_MLSS_206 | 반응조 MLSS | A2 PILOT.PLC | %MW107 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| TMS_DATA | PID.FM_100.AI_FL | 원수 유입 유량계 | A2 PILOT.PLC | %MW100 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| TMS_DATA | PID.FM_200.AI_FL | 내부 반송 유량계 | A2 PILOT.PLC | %MW101 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| TMS_DATA | PID.FM_201.AI_FL | 반송슬러지 유량계 | A2 PILOT.PLC | %MW102 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| TMS_DATA | PID.FM_202.AI_FL | 송풍량계D | A2 PILOT.PLC | %MW103 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_101A.DI_RUN | 원수 이송펌프A 운전상태 | A2 PILOT.PLC | %MW10.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_101A.DO_RUC | 원수이송펌프 RUN 명령 | A2 PILOT.PLC | %MW20.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_101A.DO_STC | 원수이송펌프 STOP 명령 | A2 PILOT.PLC | %MW20.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_101A.DO_AMC | 원수이송펌프 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW20.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_101A.DI_FLT | 원수 이송펌프A FAULT | A2 PILOT.PLC | %MW10.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DI_A2O_REM |  | A2 PILOT.PLC | %MW10.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.PH_203.AI_PH_203 | 반응조 pH | A2 PILOT.PLC | %MW104 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.ORP_204.AI_ORP_204 | 반응조 ORP | A2 PILOT.PLC | %MW105 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AI_DO_205 | 반응조 DO | A2 PILOT.PLC | %MW106 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AO_M_SET | 반응조 DO Middle 설정 | A2 PILOT.PLC | %MW158 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AO_DO_H_SET | 반응조 DO High 설정 | A2 PILOT.PLC | %MW157 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AO_DO_L_SET | 반응조 DO Low 설정 | A2 PILOT.PLC | %MW159 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AI_DO_HI | 반응조 DO High | A2 PILOT.PLC | %MW160.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AI_DO_MID | 반응조 DO Middle | A2 PILOT.PLC | %MW160.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.DO_205.AI_DO_LO | 반응조 DO Low | A2 PILOT.PLC | %MW160.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.MLSS_206.AI_MLSS_206 | 반응조 MLSS | A2 PILOT.PLC | %MW107 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_01.DI_HH | 유량조정조 수위 HighHigh상태 | A2 PILOT.PLC | %MW15.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_01.DI_H | 유량조정조 수위 High상태 | A2 PILOT.PLC | %MW15.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_01.DI_L | 유량조정조 수위 Low상태 | A2 PILOT.PLC | %MW15.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_01.DI_LL | 유량조정조 수위 LowLow상태 | A2 PILOT.PLC | %MW15.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_03.DI_HH | 슬러지저류조 수위 HighHigh상태 | A2 PILOT.PLC | %MW15.11 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_03.DI_LL | 슬러지저류조 수위 LowLow상태 | A2 PILOT.PLC | %MW15.8 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_03.DI_H | 슬러지저류조 수위 High상태 | A2 PILOT.PLC | %MW15.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_03.DI_L | 슬러지저류조 수위 Low상태 | A2 PILOT.PLC | %MW15.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_02.DI_HH | 방류조 수위 HighHigh상태 | A2 PILOT.PLC | %MW15.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_02.DI_H | 방류조 수위 High상태 | A2 PILOT.PLC | %MW15.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_02.DI_L | 방류조 수위 Low상태 | A2 PILOT.PLC | %MW15.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.LS_02.DI_LL | 방류조 수위 LowLow상태 | A2 PILOT.PLC | %MW15.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.DI_RUN | 유량조정조 교반기 RUN | A2 PILOT.PLC | %MW10.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW129 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AI_TM_OFFPV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW130 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AO_HZ_MSV | VVVF Manual 운전 주파수 설정 | A2 PILOT.PLC | %MW131 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AI_HZ_LOW | VVVF 최저 Hz | A2 PILOT.PLC | %MW132 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AO_TM_ONSV | 타이머 간헐운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW127 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AO_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW128 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW303 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.DI_FLT | 유량조정조 교반기 FAULT | A2 PILOT.PLC | %MW10.11 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.DO_AMC | 유량조정조 교반기 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW20.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.DO_RUC | 유량조정조 교반기 RUN 명령 | A2 PILOT.PLC | %MW20.11 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_103.DO_STC | 유량조정조 교반기 STOP 명령 | A2 PILOT.PLC | %MW20.12 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AO_TM_ONSV | 타이머 간헐운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW137 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AO_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW138 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW139 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AI_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW140 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AO_HZ_MSV | VVVF Manual 운전 주파수 설정 | A2 PILOT.PLC | %MW141 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AI_HZ_LOW | VVVF 최저 Hz | A2 PILOT.PLC | %MW142 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW323 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.DI_RUN | 혐기조 교반기 RUN | A2 PILOT.PLC | %MW10.13 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.DI_FLT | 혐기조 교반기 FAULT | A2 PILOT.PLC | %MW10.14 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.DO_AMC | 혐기조 교반기 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW20.13 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.DO_RUC | 혐기조 교반기 RUN 명령 | A2 PILOT.PLC | %MW20.14 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_201.DO_STC | 혐기조 교반기 STOP 명령 | A2 PILOT.PLC | %MW20.15 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AO_TM_ONSV | 타이머 간헐운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW147 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AO_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW148 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW149 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AI_TM_OFFPV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW150 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AO_HZ_MSV | VVVF Manual 운전 주파수 설정 | A2 PILOT.PLC | %MW151 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AI_HZ_LOW | VVVF 최저 Hz | A2 PILOT.PLC | %MW152 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW333 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.DI_RUN | 무산소조 교반기 RUN | A2 PILOT.PLC | %MW11.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.DI_FLT | 무산소조 교반기 FAULT | A2 PILOT.PLC | %MW11.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.DO_AMC | 무산소조 교반기 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW21.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.DO_RUC | 무산소조 교반기 RUN 명령 | A2 PILOT.PLC | %MW21.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_202.DO_STC | 무산소조 교반기 STOP 명령 | A2 PILOT.PLC | %MW21.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.DI_RUN | 송풍기A 운전상태 | A2 PILOT.PLC | %MW11.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_OP_SEL1 | 운전방법 선택 지령운전/자체운전 | A2 PILOT.PLC | %MW161.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_OP_SEL2 | 자체운전 선택시 VVVF운전/타이머 운전 | A2 PILOT.PLC | %MW161.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_OP_SEL3 | VVVF 운전 선택시 자동운전/수동운전 | A2 PILOT.PLC | %MW161.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_DOA_SV | VVVF 자동 선택시 목표 DO값 설정 | A2 PILOT.PLC | %MW162 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_DOM_SV | VVVF 수동 선택시 목표 목표주파수 설정 | A2 PILOT.PLC | %MW163 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_FLA_SHZ | VVVF 자동 선택시 시작Hz | A2 PILOT.PLC | %MW164 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_DOA_HZW | Hz 제어폭 | A2 PILOT.PLC | %MW166 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_DOA_HZT | 제어주기 | A2 PILOT.PLC | %MW167 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_DOA_DOQ | 목표DO 허용오차 | A2 PILOT.PLC | %MW168 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_HZ_LOW | VVVF 최저 Hz | A2 PILOT.PLC | %MW169 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_TM_ONSV | 타이머운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW172 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_TM_OFFSVH | 타이머운전 선택시 정지시간 1 설정값 (길게) | A2 PILOT.PLC | %MW173 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_TM_OFFSVM | 타이머운전 선택시 정지시간 2설정값 (중간) | A2 PILOT.PLC | %MW174 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AO_TM_OFFSVL | 타이머운전 선택시 정지시간 3설정값 (짧게) | A2 PILOT.PLC | %MW175 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW1012 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_TM_OFFPV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW1013 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW343 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.DI_FLT | 송풍기A FAULT | A2 PILOT.PLC | %MW11.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.DO_AMC | 송풍기A AUTO MANUAL 명령 | A2 PILOT.PLC | %MW21.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.DO_RUC | 송풍기A RUN 명령 | A2 PILOT.PLC | %MW21.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203A.DO_STC | 송풍기A STOP 명령 | A2 PILOT.PLC | %MW21.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203B.DI_RUN | 송풍기B 운전상태 | A2 PILOT.PLC | %MW11.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203B.DI_FLT | 송풍기B FAULT | A2 PILOT.PLC | %MW11.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203B.DO_203A | 송풍기 A선택 | A2 PILOT.PLC | %MW21.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_203B.DO_203B | 송풍기 B선택 | A2 PILOT.PLC | %MW21.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.DI_RUN | 내부 반송펌프A 운전상태 | A2 PILOT.PLC | %MW11.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AO_OP_SEL1 | 운전방법 선택 MLSS운전 / 타이머 간헐운전 | A2 PILOT.PLC | %MW180.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AO_OP_SEL2 | MLSS운전 선택시 자동운전 / 수동운전 | A2 PILOT.PLC | %MW180.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AO_MLSSM_SV | MLSS 수동 선택시 목표주파수 설정 | A2 PILOT.PLC | %MW182 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_FLA_SHZ | MLSS 자동 선택시 시작Hz | A2 PILOT.PLC | %MW183 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_MLSSA_HZW | Hz 제어폭 | A2 PILOT.PLC | %MW185 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_MLSSA_HZT | 제어주기 | A2 PILOT.PLC | %MW186 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_MLSSA_MLSSQ | 목표MLSS 허용오차 | A2 PILOT.PLC | %MW187 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_HZ_LOW | VVVF최저 Hz | A2 PILOT.PLC | %MW188 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW353 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AO_TM_ONSV | 타이머운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW191 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AO_TM_OFFSV | 타이머운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW192 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_TM_ONPV | 타이머운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW193 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AI_TM_OFFPV | 타이머운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW194 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.AO_MLSSA_SV | MLSS 자동 선택시 목표 MLSS값 설정 | A2 PILOT.PLC | %MW181 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.DI_FLT | 내부 반송펌프A FAULT | A2 PILOT.PLC | %MW11.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.DO_AMC | 내부 반송펌프A AUTO MANUAL 명령 | A2 PILOT.PLC | %MW21.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.DO_RUC | 내부 반송펌프A RUN 명령 | A2 PILOT.PLC | %MW21.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204A.DO_STC | 내부 반송펌프A STOP 명령 | A2 PILOT.PLC | %MW21.11 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204B.DI_RUN | 내부 반송펌프B 운전상태 | A2 PILOT.PLC | %MW11.12 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204B.DI_FLT | 내부 반송펌프B FAULT | A2 PILOT.PLC | %MW11.13 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204B.DO_204A | 내부 반송펌프 A선택 | A2 PILOT.PLC | %MW21.12 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_204B.DO_204B | 내부 반송펌프 B선택 | A2 PILOT.PLC | %MW21.13 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.DI_RUN | 슬러지 수집기 RUN | A2 PILOT.PLC | %MW12.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.DI_FLT | 슬러지 수집기 FAULT | A2 PILOT.PLC | %MW12.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AO_TM_ONSV | 타이머 간헐운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW197 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AO_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW198 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW199 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AI_TM_OFFPV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW200 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AO_HZ_MSV | VVVF Manual 운전 주파수 설정 | A2 PILOT.PLC | %MW201 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AI_HZ_LOW | VVVF 최저Hz | A2 PILOT.PLC | %MW202 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW363 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.DO_AMC | 슬러지 수집기 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW22.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.DO_RUC | 슬러지 수집기 RUN 명령 | A2 PILOT.PLC | %MW22.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_205.DO_STC | 슬러지 수집기 STOP 명령 | A2 PILOT.PLC | %MW22.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.DI_RUN | 슬러지 반송펌프A 운전상태 | A2 PILOT.PLC | %MW12.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.DI_FLT | 슬러지 반송펌프A FAULT | A2 PILOT.PLC | %MW12.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AO_TM_ONSV | 타이머 간헐운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW207 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AO_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW208 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW209 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AI_TM_OFFPV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW210 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AO_HZ_MSW | VVVF Manual 운전 주파수 설정 | A2 PILOT.PLC | %MW211 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AI_HZ_LOW | VVVF 최저 Hz | A2 PILOT.PLC | %MW212 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW373 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.DO_AMC | 슬러지 반송펌프A AUTO MANUAL 명령 | A2 PILOT.PLC | %MW22.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.DO_RUC | 슬러지 반송펌프A RUN 명령 | A2 PILOT.PLC | %MW22.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206A.DO_STC | 슬러지 반송펌프A STOP 명령 | A2 PILOT.PLC | %MW22.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206B.DI_RUN | 슬러지 반송펌프B 운전상태 | A2 PILOT.PLC | %MW12.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206B.DI_FLT | 슬러지 반송펌프B FAULT | A2 PILOT.PLC | %MW12.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206B.DO_206A | 슬러지 반송펌프 A선택 | A2 PILOT.PLC | %MW22.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_206B.DO_206B | 슬러지 반송펌프 B선택 | A2 PILOT.PLC | %MW22.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.FM_100.AI_FL | 원수 유입 유량계 | A2 PILOT.PLC | %MW100 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.FM_200.AI_FL | 내부 반송 유량계 | A2 PILOT.PLC | %MW101 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.FM_201.AI_FL | 반송슬러지 유량계 | A2 PILOT.PLC | %MW102 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.FM_202.AI_FL | 송풍량계 | A2 PILOT.PLC | %MW103 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DI_FLT | 반송슬러지 전동밸브 FAULT | A2 PILOT.PLC | %MW12.13 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DI_REM | 반송슬러지 전동밸브 Remote / Local | A2 PILOT.PLC | %MW12.14 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DI_OPENING | 반송슬러지 전동밸브 OPENING | A2 PILOT.PLC | %MW12.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DI_CLOSING | 반송슬러지 전동밸브 CLOSING | A2 PILOT.PLC | %MW12.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DI_FOP | 반송슬러지 전동밸브 FULL OPEN | A2 PILOT.PLC | %MW12.11 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DI_FCL | 반송슬러지 전동밸브 FULL CLOSE | A2 PILOT.PLC | %MW12.12 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DO_OPC | 반송슬러지 전동밸브 OPEN 명령 | A2 PILOT.PLC | %MW22.10 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DO_CLC | 반송슬러지 전동밸브 CLOSE 명령 | A2 PILOT.PLC | %MW22.11 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_200.DO_AMC | 반송슬러지 전동밸브 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW22.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301A.DI_RUN | 방류펌프A 운전상태 | A2 PILOT.PLC | %MW13.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301A.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW383 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301A.DI_FLT | 방류펌프A FAULT | A2 PILOT.PLC | %MW13.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301A.DO_AMC | 방류펌프A AUTO MANUAL 명령 | A2 PILOT.PLC | %MW23.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301A.DO_RUC | 방류펌프A RUN 명령 | A2 PILOT.PLC | %MW23.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301A.DO_STC | 방류펌프A STOP 명령 | A2 PILOT.PLC | %MW23.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301B.DI_RUN | 방류펌프B 운전상태 | A2 PILOT.PLC | %MW13.8 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301B.DI_FLT | 방류펌프B FAULT | A2 PILOT.PLC | %MW13.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301B.DO_301A | 방류펌프 A선택 | A2 PILOT.PLC | %MW23.8 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_301B.DO_301B | 방류펌프 B선택 | A2 PILOT.PLC | %MW23.9 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302A.DI_RUN | 잉여슬러지 이송펌프A 운전상태 | A2 PILOT.PLC | %MW14.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302A.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW393 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302A.DI_FLT | 잉여슬러지 이송펌프A FAULT | A2 PILOT.PLC | %MW14.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302A.DO_AMC | 잉여슬러지 이송펌프A AUTO MANUAL 명령 | A2 PILOT.PLC | %MW24.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302A.DO_RUC | 잉여슬러지 이송펌프A RUN 명령 | A2 PILOT.PLC | %MW24.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302A.DO_STC | 잉여슬러지 이송펌프A STOP 명령 | A2 PILOT.PLC | %MW24.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302B.DI_RUN | 잉여슬러지 이송펌프B 운전상태 | A2 PILOT.PLC | %MW14.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302B.DI_FLT | 잉여슬러지 이송펌프B FAULT | A2 PILOT.PLC | %MW14.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302B.DO_302A | 잉여슬러지 이송펌프 A선택 | A2 PILOT.PLC | %MW24.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_302B.DO_302B | 잉여슬러지 이송펌프 B선택 | A2 PILOT.PLC | %MW24.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DI_OPENING | 잉여슬러지 전동밸브 OPENING | A2 PILOT.PLC | %MW12.15 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DI_REM | 잉여슬러지 전동밸브 Remote / Local | A2 PILOT.PLC | %MW13.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DI_CLOSING | 잉여슬러지 전동밸브 CLOSING | A2 PILOT.PLC | %MW13.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DI_FOP | 잉여슬러지 전동밸브 FULL OPEN | A2 PILOT.PLC | %MW13.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DI_FCL | 잉여슬러지 전동밸브 FULL CLOSE | A2 PILOT.PLC | %MW13.2 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DI_FLT | 잉여슬러지 전동밸브 FAULT | A2 PILOT.PLC | %MW13.3 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DO_OPC | 잉여슬러지 전동밸브 OPEN 명령 | A2 PILOT.PLC | %MW23.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DO_AMC | 잉여슬러지 전동밸브 AUTO MANUAL 명령 | A2 PILOT.PLC | %MW22.15 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.XV_300.DO_CLC | 잉여슬러지 전동밸브 CLOSE 명령 | A2 PILOT.PLC | %MW23.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_HZ_IN | VVVF 운전 주파수 | A2 PILOT.PLC | %MW313 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AO_FLA_SV | 유량운전 자동 선택시 목표유량 설정 | A2 PILOT.PLC | %MW111 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AO_FLM_SV | 유량운전 수동 선택시 목표주파수 설정 | A2 PILOT.PLC | %MW112 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_FLA_HZW | Hz 제어폭 | A2 PILOT.PLC | %MW115 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_FLA_FLQ | 목표유량 허용오차 | A2 PILOT.PLC | %MW117 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_FLA_HZT | Hz 제어주기 | A2 PILOT.PLC | %MW116 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_HZ_LOW | VVVF 최저 Hz | A2 PILOT.PLC | %MW118 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_FLA_SHZ | 유량운전 자동 선택시 시작Hz | A2 PILOT.PLC | %MW113 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AO_OP_SEL1 | 유량운전/타이머 간혈운전 | A2 PILOT.PLC | %MW110.0 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AO_OP_SEL2 | 유량운전 선택시 자동운전/수동운전 | A2 PILOT.PLC | %MW110.1 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AO_TM_ONSV | 타이머 간헐운전 선택시 운전시간 설정값 | A2 PILOT.PLC | %MW121 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AO_TM_OFFSV | 타이머 간헐운전 선택시 정지시간 설정값 | A2 PILOT.PLC | %MW122 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_TM_ONPV | 타이머 간헐운전 선택시 운전시간 진행값 | A2 PILOT.PLC | %MW1017 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.AI_TM_OFFPV | 타이머 간헐운전 선택시 정지시간 진행값 | A2 PILOT.PLC | %MW1018 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.DI_FLT | 유량조정펌프A FAULT | A2 PILOT.PLC | %MW10.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.DI_RUN | 유량조정펌프A 운전상태 | A2 PILOT.PLC | %MW10.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.DO_AMC | 유량조정펌프A AUTO MANUAL 명령 | A2 PILOT.PLC | %MW20.4 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.DO_RUC | 유량조정펌프A RUN 명령 | A2 PILOT.PLC | %MW20.5 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102A.DO_STC | 유량조정펌프A STOP 명령 | A2 PILOT.PLC | %MW20.6 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102B.DI_RUN | 유량조정펌프B 운전상태 | A2 PILOT.PLC | %MW10.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102B.DI_FLT | 유량조정펌프B FAULT | A2 PILOT.PLC | %MW10.8 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102B.DO_102A | 유량조정펌프 A선택 | A2 PILOT.PLC | %MW20.7 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |
| OPERATOR_DATA | PID.M_102B.DO_102B | 유량조정펌프 B선택 | A2 PILOT.PLC | %MW20.8 | SCADA 태그/주소 확인 · A2 PILOT 원본 확보 | 원본 확보됨. 해당 주소의 Ladder/FB 사용처는 Rule Book에서 검토 중. |

## 추가 확인 필요

- **A2 PILOT XG5000 원본 확보 완료** — 더 이상 자료요청 항목이 아님
- M203→M204→M102의 RUN/STOP, AUTO/MANUAL Ladder 상세 추적
- Interlock / Run Permit의 실제 접점과 Fail-safe 조건
- Timer/Delay, 최소·최대 Hz, 교번운전, 고장대체운전
- M203의 DO 기반 조건, M204의 MLSS 기반 조건과 ORP 직접연계 여부, M102 유량제어 조건
- 현장 운전자 Rule과 PLC 소스의 차이 확인 및 Rule Book v1.0 승인

상세 기준: [[07-A2-PILOT-PLC-Rule-Book]]
