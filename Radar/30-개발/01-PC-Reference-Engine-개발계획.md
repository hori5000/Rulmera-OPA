# PC Reference Engine 개발계획

## 1차 목표
**샘플 1개에서 실제 데이터를 안정적으로 읽고 그대로 저장/재생**하는 것.

## 모듈
```text
vendor/
  as613_adapter
core/
  common_types
  time_alignment
  calibration
  fusion
  tracker
  room_model
  ghost_filter
  ai_correction
tools/
  logger
  replay
  viewer
  metrics
```

## 우선순위
P0. Vendor Adapter  
P0. Binary/Text Raw Logger  
P0. Replay  
P0. 4 Sensor Multiplexer  
P1. Visualization  
P1. Calibration Tool  
P1. Fusion/Tracking  
P2. AI

## 개발 원칙
- Raw vendor message를 먼저 보존
- Parse 결과도 함께 저장
- Parser 버전이 바뀌어도 과거 Raw Log 재해석 가능
- 실시간 화면보다 Replay 재현성을 먼저 확보
