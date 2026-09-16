---
type: scope-wbs
project: rulmera-radar
status: active
---

# 범위·WBS

## 범위기술서
Rulmera Radar는 AS_613를 포함한 복수 레이더를 물리적으로 묶는 것에서 끝나지 않고, **수집 → 정합 → Fusion → Tracking → 공간 모델 → Ghost 억제 → AI 보정 → Edge 제품화**까지를 하나의 시스템으로 개발한다.

## WBS 사전

| WBS | 작업·산출물 | 완료조건 | 책임자 |
|---|---|---|---|
| 1.0 | 프로젝트/요구사항 기준선 | 헌장·RTM·기술기준선 승인 | 윤석훈 |
| 1.1 | 이해관계자/역할 | 송문빈/인지니어스 포함 RACI 확정 | 윤석훈 |
| 1.2 | 제조사 기술 확인 | MMIC·FW·SDK·Data Level 표 확정 | 윤석훈/송문빈 |
| 1.2.1 | MMIC Freeze | **BGT60TR13C 확인** | 윤석훈/송문빈 |
| 1.2.2 | Library/API Freeze | 공급 SDK/헤더/예제/라이선스 확보 | 윤석훈/송문빈 |
| 1.2.3 | Firmware Update Freeze | AS_613 Update/Recovery/Rollback 절차 재현 | 윤석훈/송문빈 |
| 2.0 | 단일 Radar Bring-up | 1개 모듈 PC 수집 | 윤석훈 |
| 2.1 | AS_613 Adapter | 설정/수신 Parser 동작 | 윤석훈 |
| 2.2 | Data Contract | sensor/frame/target/raw-ref 구조 확정 | 윤석훈 |
| 2.3 | Raw ADC PoC | 가능 시 BGT60TR13C 3Rx Real IF frame 저장 | 윤석훈 |
| 2.4 | DSP Reference | Range/Doppler/Angle 결과 재생성 | 윤석훈 |
| 3.0 | 4 Radar Logger | 4개 동시 기록/재생 | 윤석훈 |
| 3.1 | Time Alignment | 시간차 측정/보정 | 윤석훈 |
| 3.2 | Coordinate Calibration | Room 좌표계 변환 확정 | 윤석훈 |
| 3.3 | Interference Test | 1/2/4 Radar 비교 및 회피안 | 윤석훈 |
| 4.0 | Multi Radar Fusion | 중복 Target 통합 | 윤석훈 |
| 4.1 | Association | 후보 매칭 | 윤석훈 |
| 4.2 | Tracking | Track 생성/유지/종료 | 윤석훈 |
| 5.0 | Room Intelligence | 공간 모델 동작 | 윤석훈 |
| 5.1 | Room Mapping | 경계/ROI 저장 | 윤석훈 |
| 5.2 | Wall Mask | 벽 밖 Target 억제 | 윤석훈 |
| 5.3 | Ghost/Noise Filter | 반사/정적 잡음 감소 | 윤석훈 |
| 6.0 | AI Correction | Baseline 대비 성능개선 | 윤석훈 |
| 6.1 | Dataset/Label | 4 Radar Replay 기반 학습셋 생성 | 윤석훈 |
| 6.2 | Target-level Model | Ghost/Association/Track confidence 검증 | 윤석훈 |
| 6.3 | Intermediate Feature Model | RD/RA/Capon feature 추가 A/B | 윤석훈 |
| 6.4 | Raw ADC Model Research | 필요성 증명 시 후속 연구 | 윤석훈 |
| 7.0 | Hub Hardware | MCU/PCB/통신 구조 Freeze | 윤석훈 |
| 7.1 | MCU Selection | 성능/IO/메모리 통과 | 윤석훈 |
| 7.2 | Edge Port | PC 대비 출력 비교 통과 | 윤석훈 |
| 8.0 | 통합 시험 | 시나리오/장시간 시험 통과 | 윤석훈 |
| 9.0 | 제품화 후속 | 인증/양산/케이스 등 별도 계획 | 윤석훈 |
