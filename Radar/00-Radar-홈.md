---
project_id: rulmera-radar
project_name: Rulmera Radar
owner: 윤석훈
status: 착수
progress: 8
baseline_date: 2026-09-16
---

# Rulmera Radar

## 프로젝트 정의
Rulmera Radar는 **Rulmera 자체 프로젝트**이다.

- Rulmera 전체 기획·시스템 설계·소프트웨어·AI·통합 개발 책임: **윤석훈**
- 레이더 모듈 제작사: **인지니어스**
- 인지니어스 오너/대표 및 핵심 협의 창구: **송문빈 대표**
- 레이더 샘플·매뉴얼·SDK/라이브러리·기술자료의 기본 공급처: **송문빈 대표**
- 이해관계자는 개발·실증·양산 과정에서 계속 추가될 수 있으며 `00-프로젝트관리/03-이해관계자등록부.md`에서 관리한다.

## 2026-09-16 핵심 업데이트
- **AS_613 내부 Radar MMIC가 Infineon XENSIV™ BGT60TR13C로 확인됨**
- BGT60TR13C는 **60 GHz FMCW, 1Tx / 3Rx, Antennas-in-Package(AIP)** 구조이며 거리·속도·각도 계열 처리가 가능한 센서이다.
- 칩의 3개 Rx는 각각 **12-bit ADC의 Real IF(baseband) 샘플**을 제공한다. **Rx별 I/Q 두 채널을 직접 출력하는 구조는 아니다.**
- Infineon Radar Development Kit(RDK)는 BGT60TR13C에 대해 Raw frame, Range/Velocity/Angle, Range Spectrum, Range-Doppler, Range-Angle/Beamforming, Presence, Segmentation 계열 예제/알고리즘을 제공한다.
- 공식 DEMO-BGT60TR13C + Radar Baseboard MCU7에서는 PC에서 Raw time-domain frame을 가져오는 개발 경로가 확인된다.
- 그러나 **AS_613이 Infineon RDK와 동일 수준의 Raw ADC를 외부에 노출하는지는 아직 미확정**이다. 이는 인지니어스 펌웨어/라이브러리/API를 실제로 받아 검증해야 한다.
- 송문빈 대표가 **샘플 레이더 4개를 제공하기로 함**. 입고 후 R01~R04로 식별하여 동일 FW/설정/로그 기준으로 관리한다.
- AS_613의 **펌웨어 업데이트 방법은 재확인 필요**. Infineon MCU7의 플래싱 절차는 참고자료일 뿐 AS_613에 그대로 적용하지 않는다.

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
- Radar MMIC: **Infineon BGT60TR13C — 확인**
- 샘플: **4개 공급 예정**
- 상대 방위각: **약 90도 간격 후보**
- 하향각: **약 45도 후보**
- 실제 설치각·위치는 실측 시험 후 Freeze
- 큰 공간은 Radar Node를 추가하고 상위 수준에서 Node 간 Fusion
- Hub PCB/MCU는 Rulmera에서 신규 설계
- PSoC Edge E84는 후보이며 아직 확정하지 않음
- PC 개발/학습 GPU: RTX 3060 또는 A6000 사용 가능
- 레이더 저수준 데이터 접근 수준이 확정되기 전에는 AI 입력 데이터 형식을 Freeze하지 않음

## 현재 핵심 기술 판단
이제 **Radar 칩 자체는 BGT60TR13C로 Freeze**할 수 있다. 다만 데이터 경계는 두 층으로 분리해서 봐야 한다.

### 1) BGT60TR13C / Infineon 공식 개발경로에서 가능한 것
- 3Rx Real IF Raw ADC frame 획득
- Range FFT / Range Spectrum
- Doppler / Range-Doppler
- Rx 간 위상차를 이용한 Angle/Beamforming
- Range-Angle Map
- Capon 계열 알고리즘 활용 가능성
- Presence / Segmentation / Tracking 계열 예제·알고리즘 활용

### 2) 실제 AS_613 제품에서 외부로 받을 수 있는 것
AS_613 매뉴얼의 기본 출력은 좌표 등 **처리된 Target 데이터 중심**이다. 따라서 실제 개발은 다음 두 경로를 동시에 유지한다.

- **기본 경로 A — Target-level Fusion:** AS_613이 제공하는 좌표/크기/속도/신뢰도 등 처리 결과를 받아 다중 레이더 Fusion·Tracking·AI 보정
- **확장 경로 B — Raw/Intermediate Fusion:** 인지니어스 SDK/Library/API에서 Raw ADC, Detection, Range-Doppler, Range-Angle/Capon 결과가 노출되면 이를 저장하고 학습 입력으로 확장

중요: BGT60TR13C는 Rx별 **Real IF 한 채널** 구조이므로 기존 문서의 `Raw IQ` 표현은 일반적으로 사용하지 않는다. FFT 이후 복소 스펙트럼/위상 정보를 계산할 수는 있지만 센서가 I/Q 두 샘플을 직접 내보내는 것은 아니다.

## 학습 방향 요약
처음부터 Raw ADC 전체를 딥러닝에 넣지 않는다.

1. Target-level Baseline을 먼저 만든다.
2. 동시에 4개 샘플에서 가능한 가장 낮은 Data Level을 수집한다.
3. Raw ADC가 확보되면 공식 DSP로 Range/Doppler/Angle 특징을 생성한다.
4. AI는 Ghost 판별, Association score, Track confidence, Merge/Split 보정부터 시작한다.
5. Raw ADC end-to-end 학습은 데이터량·효과를 확인한 뒤 후순위로 둔다.

상세: [[20-설계/07-BGT60TR13C-학습데이터-설계]]

## 펌웨어 업데이트 원칙
- **BGT60TR13C MMIC 자체**와 **AS_613의 호스트 MCU 펌웨어**를 구분한다.
- Infineon DEMO-BGT60TR13C는 Radar Baseboard MCU7 펌웨어를 RDK/Radar Fusion GUI로 갱신할 수 있다.
- 실제 AS_613의 Host MCU, Bootloader, FW binary 형식, 업데이트 툴, 복구모드, 롤백 가능 여부는 **인지니어스에서 다시 확인**한다.
- AS_613 전용 절차가 확인되기 전에는 Infineon MCU7용 펌웨어를 AS_613에 적용하지 않는다.

## 설계 원칙
1. **원시데이터가 없더라도 개발 가능해야 한다.**
2. 센서별 좌표를 공통 Room 좌표계로 변환한 후 Fusion한다.
3. 시간 동기화 품질을 별도 측정하고, 하드웨어 동기가 없으면 Host 수신시각 기반 보정부터 시작한다.
4. 단일 프레임 합치기가 아니라 Track 단위 Fusion을 기본 구조로 한다.
5. 벽/가구/반사체는 Room Map과 장기 관측 통계로 Mask한다.
6. AI는 확률적 보정 계층으로 두고, 핵심 추적/안전 로직을 완전히 Black-box AI에 맡기지 않는다.
7. PC Reference Engine을 정답 기준 구현으로 만들고 Edge는 같은 입출력 계약을 유지한다.
8. 확인되지 않은 AS_613 제조사 기능은 추정으로 확정하지 않는다.

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
- [[20-설계/07-BGT60TR13C-학습데이터-설계]]
- [[90-근거-기록/05-BGT60TR13C-공식자료-조사-20260916]]
