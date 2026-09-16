---
title: Raw 데이터 PoC 인수기준
date: 2026-09-17
status: baseline
project: Rulmera Radar
---

# Raw 데이터 PoC 인수기준

## Gate A — Sensor

- [ ] BGT60TR13C Device/Status 읽기 성공
- [ ] Radar profile 적용 성공
- [ ] IRQ 정상
- [ ] FIFO read 정상
- [ ] 동일 설정에서 반복 frame size 일치

## Gate B — Raw Integrity

- [ ] RX별 sample 순서 검증
- [ ] ADC sample 값 범위 검증
- [ ] Frame counter 연속성 확인
- [ ] Drop/Overflow 검출 가능
- [ ] 10분 연속수집 오류율 기록

## Gate C — DSP Reproduction

- [ ] 고정 반사체의 Range peak가 거리 변화에 따라 이동
- [ ] 이동체의 Doppler 변화 확인
- [ ] 다중 RX phase 차이 확인
- [ ] Angle/Beamforming 결과 재현
- [ ] 동일 Raw 파일 replay 시 동일 결과 재현

## Gate D — Dataset

- [ ] Raw와 Config 연결
- [ ] Timestamp와 Label 연결
- [ ] 설치환경 metadata 연결
- [ ] Firmware/Library version 기록
- [ ] Dataset manifest 생성

## Gate E — AI

- [ ] L2 Feature baseline 모델
- [ ] L1 Map 모델
- [ ] 최소 1개 시계열/Raw 계열 모델
- [ ] 동일 Test Set에서 AS_613 Benchmark와 비교
- [ ] 성능 + 추론시간 + 메모리 기준 기록
