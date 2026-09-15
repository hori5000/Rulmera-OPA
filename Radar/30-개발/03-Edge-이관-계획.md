# Edge 이관 계획

## 이관 대상
PC Reference에서 검증된 핵심 기능만 순차 이관한다.
1. Common Data Parser
2. Calibration
3. Time Alignment
4. Fusion
5. Tracking
6. Room Mask
7. Ghost Filter
8. 경량 AI

## 이관하지 않아도 되는 PC 전용 기능
- 대용량 시각화
- 학습
- 상세 디버거
- 전체 데이터셋 관리

## 동등성 검증
동일 Recorded Session을 PC와 Edge에 넣고 다음을 비교한다.
- Track 수
- Track ID 유지
- 위치 차이
- Event 차이
- CPU/RAM/Latency
