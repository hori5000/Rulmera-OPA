# Ghost / Noise / AI 보정 설계

## 문제 유형
AS_613 매뉴얼에도 반사 Phantom, 이동 물체 오검출, 근접 사람 병합, 정지 객체 좌표 흔들림 가능성이 기술되어 있다. Rulmera는 이를 상위 Fusion에서 추가 보정한다.

## 규칙 기반 1차 보정
- N-of-M 연속 검출
- 최소 Track age
- 최대 가속도/속도 Gate
- Room boundary Gate
- Sensor agreement
- 정적 반복점 Suppression
- 반사 대칭 패턴 Score
- 짧은 단발 Track 제거

## Multi-view 보정
같은 객체를 서로 다른 위치의 Radar가 보면 한 센서의 반사 Ghost와 실제 Target을 구분하기 쉬워진다.

예:
- Sensor 1에서만 보임 + 벽 뒤 → Ghost 가능성 상승
- Sensor 1/2/3에서 비슷한 위치로 일치 → 실제 Target 가능성 상승
- 실제 Track과 대칭 이동 → Reflection 가능성 상승

## AI 역할
AI는 다음을 보정하는 데 사용한다.
1. Association 확률
2. Track confidence
3. Ghost probability
4. Merge/Split 판단 보조
5. Missing observation 보간
6. Room 특성별 Threshold 자동 조정

## AI 입력 후보

### A. Target-level — 반드시 구현
- 최근 N frame의 x,y,z
- velocity/acceleration
- sensor count
- 센서별 residual
- confidence/SNR
- wall distance
- track age
- missing count
- 동일 공간의 다른 sensor observation과의 일치도

### B. BGT60TR13C Intermediate — 확보 가능 시 우선 추가
- Range bin / Range Spectrum magnitude
- Doppler bin / Range-Doppler local patch
- Range-Angle / Capon / DBF local patch
- Rx1/Rx2/Rx3 FFT phase difference
- target 주변 power / noise-floor / peak sharpness
- 시간축 clutter residual
- micro-motion energy

### C. Raw ADC — 연구 확장
BGT60TR13C의 3Rx Real IF frame을 그대로 학습 입력으로 사용할 수 있으나, 초기 제품 학습의 1순위로 두지 않는다.

이유:
- 데이터량이 급증한다.
- Radar config 변화에 모델이 민감해진다.
- 라벨 비용이 커진다.
- 공식 DSP로 만든 Range/Doppler/Angle feature가 먼저 더 안정적인 Baseline이 된다.

## 권장 학습 순서
1. **Rule-only Baseline**
2. **Target-level ML**
3. **Target + Intermediate feature ML**
4. 필요 시 **Raw ADC temporal model** 연구

## 첫 모델 후보
### Ghost Classifier
입력: track history + wall geometry + sensor agreement + RD/RA patch(가능 시)
출력: `P(real)`, `P(ghost)`

### Cross-Radar Association Model
입력: 두 detection/track의 시간차, 공간거리, 속도차, angle/range feature
출력: 같은 객체일 확률

### Track Quality Model
입력: age, residual, missing, sensor count, SNR/power, motion consistency
출력: track confidence

### Merge/Split Assistant
입력: target 간 거리, RD peak 수, angle peak 구조, track history
출력: 1인/다인 후보 score

## 학습 방식
- Replay 가능한 로그를 정본 데이터셋으로 사용
- Ground Truth 또는 수동 라벨 추가
- Session 단위 Train/Validation/Test 분리
- 동일 방/동일 사람 프레임을 랜덤 섞어서 누수시키지 않음
- AI ON/OFF A/B
- Baseline 대비 개선되지 않는 모델은 제품에 넣지 않음

## 4 Radar에서 특별히 저장할 것
- 각 Radar의 동일 시각 원시/중간/Target 데이터 연결
- host receive timestamp
- frame sequence
- config hash
- pose
- FW/SDK version
- radar on/off/interference test flag

## Edge
대형 모델을 그대로 넣지 않고 작은 MLP/Tree/Temporal model 또는 규칙+경량 ML 조합을 우선 검토한다.

상세 입력 설계는 [[07-BGT60TR13C-학습데이터-설계]]를 따른다.
