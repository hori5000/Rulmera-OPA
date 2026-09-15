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
Target-level만 가능할 때:
- 최근 N frame의 x,y,z
- velocity/acceleration
- sensor count
- 센서별 residual
- confidence/SNR
- wall distance
- track age
- missing count

Lower-level 데이터가 확보되면 Detection/Angle/RD feature를 추가한다.

## 학습 방식
- 먼저 Rule-based Engine으로 Baseline 구축
- Replay 로그에 Ground Truth 또는 수동 라벨 추가
- AI ON/OFF A/B
- 개선되지 않는 모델은 제품에 넣지 않음

## Edge
대형 모델을 그대로 넣지 않고 작은 MLP/Tree/Temporal model 또는 규칙+경량 ML 조합을 우선 검토한다.
