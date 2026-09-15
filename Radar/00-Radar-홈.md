---
project_id: rulmera-radar
project_name: Rulmera Radar
owner: 윤석훈
status: 착수
progress: 8
baseline_date: 2026-09-15
---

# Rulmera Radar

## 프로젝트 정의
Rulmera Radar는 **Rulmera 자체 프로젝트**이다.

- Rulmera 전체 기획·시스템 설계·소프트웨어·AI·통합 개발 책임: **윤석훈**
- 레이더 모듈 제작사: **인지니어스**
- 인지니어스 오너/대표 및 핵심 협의 창구: **송문빈 대표**
- 레이더 샘플·매뉴얼·SDK/라이브러리·기술자료의 기본 공급처: **송문빈 대표**
- 이해관계자는 개발·실증·양산 과정에서 계속 추가될 수 있으며 `00-프로젝트관리/03-이해관계자등록부.md`에서 관리한다.

## 목표
AS_613 레이더 여러 개를 하나의 천장형 Radar Node로 구성해 다음을 구현한다.

1. 360도 방향 커버리지 확보
2. Multi Radar Fusion
3. 다중 객체 Tracking
4. Room Mapping
5. 자동 Wall Mask
6. Ghost / Reflection / Noise 억제
7. AI 기반 추적·판단 보정
8. PC Reference Engine에서 검증 후 Hub MCU/Edge로 경량 이관

## 현재 기본 구상
- Radar: **AS_613 × 4 / Radar Node 1개 기준**
- 상대 방위각: **약 90도 간격 후보**
- 하향각: **약 45도 후보**
- 실제 설치각·위치는 실측 시험 후 Freeze
- 큰 공간은 Radar Node를 추가하고 상위 수준에서 Node 간 Fusion
- Hub PCB/MCU는 Rulmera에서 신규 설계
- PSoC Edge E84는 후보이며 아직 확정하지 않음
- PC 개발/학습 GPU: RTX 3060 또는 A6000 사용 가능
- 레이더 저수준 데이터 접근 수준이 확정되기 전에는 AI 입력 데이터 형식을 Freeze하지 않음

## 현재 핵심 기술 판단
AS_613 매뉴얼에서 확인된 기본 출력은 좌표 등 **처리된 Target 데이터 중심**이다. `op` 설정은 신호처리 내부의 Grid/Capon Map 축 처리 방식과 연결되어 있어, 현재까지는 **Angle/Capon 계산이 모듈 내부 Radar Library/Signal Processing에서 수행되고 Rulmera는 그 결과를 받는 구조일 가능성이 높다.**

따라서 개발은 두 경로를 동시에 열어 둔다.

- **기본 경로 A — Target-level Fusion:** 좌표/크기/신뢰도 등 모듈이 제공하는 처리 결과를 받아 다중 레이더 퓨전·추적·AI 보정 수행
- **확장 경로 B — Lower-level Fusion:** Detection Point / Angle Grid / Range-Doppler / Raw ADC 중 접근 가능한 데이터가 확인되면 더 낮은 레벨의 Fusion/AI로 확장

정확한 MMIC, Infineon Library, SDK API, 데이터 노출 수준은 송문빈 대표/인지니어스 확인 후 기술 기준선을 Freeze한다.

## AS_613 매뉴얼에서 현재 확인된 사실
- 60 GHz FMCW 기반 통합 다채널 레이더/안테나/DSP 소프트웨어 솔루션
- GPIO / UART / USB 인터페이스 기술
- Wall / Ceiling 위치 모드 기술
- 약 2.5 m 천장 높이에서 대략 4~5 m 직경 커버리지 예시
- 좌표 및 ROI/Angle 관련 설정 제공
- Wall tilt 보정 0~45° 설정 기술
- `op` 설정으로 신호처리 Grid/Capon Map의 축 우선순위 선택
- 처리된 Target 데이터는 최대 5개 수준, 통상 약 10 Hz 출력으로 기술
- 반사에 의한 Phantom, 움직이는 물체 오검출, 인접 인원 병합, 정지 객체 좌표 흔들림 가능성이 매뉴얼에 명시됨

> 위 항목은 AS_613 AI User Manual v2.2 기준으로 기록한 것이며, 실제 공급 샘플의 펌웨어/라이브러리 버전과 일치하는지는 송문빈 대표를 통해 다시 확인한다.

## 설계 원칙
1. **원시데이터가 없더라도 개발 가능해야 한다.**
2. 센서별 좌표를 공통 Room 좌표계로 변환한 후 Fusion한다.
3. 시간 동기화 품질을 별도 측정하고, 하드웨어 동기가 없으면 Host 수신시각 기반 보정부터 시작한다.
4. 단일 프레임 합치기가 아니라 Track 단위 Fusion을 기본 구조로 한다.
5. 벽/가구/반사체는 Room Map과 장기 관측 통계로 Mask한다.
6. AI는 확률적 보정 계층으로 두고, 핵심 추적/안전 로직을 완전히 Black-box AI에 맡기지 않는다.
7. PC Reference Engine을 정답 기준 구현으로 만들고 Edge는 같은 입출력 계약을 유지한다.
8. 확인되지 않은 제조사 기능은 추정으로 확정하지 않는다.

## 바로가기
- [[00-프로젝트관리/00-PM-대시보드]]
- [[00-프로젝트관리/01-프로젝트헌장]]
- [[00-프로젝트관리/03-이해관계자등록부]]
- [[00-프로젝트관리/06-요구사항추적표]]
- [[00-프로젝트관리/07-범위-WBS]]
- [[00-프로젝트관리/20-기술-기준선]]
- [[00-프로젝트관리/21-제조사-확인사항]]
- [[20-설계/01-시스템-아키텍처]]
- [[20-설계/02-멀티레이더-퓨전-설계]]
- [[20-설계/05-Ghost-Noise-AI-보정]]
- [[90-근거-기록/02-송문빈-제조사-질의목록]]
