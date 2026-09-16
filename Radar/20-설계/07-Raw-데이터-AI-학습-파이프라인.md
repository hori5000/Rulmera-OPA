---
title: Raw 데이터 AI 학습 파이프라인
date: 2026-09-17
status: baseline
project: Rulmera Radar
---

# Raw 데이터 AI 학습 파이프라인

## 계층 구조

### L0 — Raw

원본은 삭제하거나 덮어쓰지 않는다.

```text
Raw ADC(real IF)
RX1 / RX2 / RX3
Frame / Chirp / Sample
```

### L1 — Signal / Map

L0에서 재생성 가능한 신호처리 결과.

- DC / static clutter 제거
- Windowing
- Range FFT / Range Spectrum
- Doppler FFT
- Range-Doppler Map
- RX phase difference
- Angle / Beamforming
- Capon / Range-Angle Map
- Micro-Doppler
- 시간축 amplitude / phase 변화

### L2 — Engineered Feature

학습과 해석에 사용할 수치 특징.

- Peak range / peak power
- SNR / noise floor
- Doppler peak / spread
- velocity / acceleration
- height / position change
- trajectory statistics
- phase variance
- motion energy
- micro-Doppler bandwidth
- spectral entropy
- temporal variance
- breathing frequency candidate
- heart-rate frequency candidate
- post-event motion energy
- 지속시간 / 변화율

초기에는 가능한 Feature를 넓게 생성한 뒤, 다음 방법으로 줄인다.

- Correlation
- Feature importance
- SHAP
- Ablation test
- 모델별 검증 성능

## 모델 비교

```text
Model A: L2 숫자 Feature
  → XGBoost / LightGBM / MLP

Model B: L1 Map
  → CNN / Transformer

Model C: L0 또는 시계열
  → 1D CNN / Transformer

Model D: L0/L1/L2 Fusion
  → Multi-input model
```

모델은 하나를 미리 확정하지 않는다. 동일 Dataset split에서 성능·추론시간·메모리 사용량을 비교한 뒤 최종 Edge 모델을 결정한다.

## Label Leakage 금지

예를 들어 AS_613이 이미 `Fall`을 판정한 상태값은 낙상 모델의 입력 Feature로 넣지 않는다.

```text
잘못된 예:
AS_613 Fall status → Rulmera Fall AI 입력

올바른 예:
실제 Ground Truth ─┐
AS_613 판정       ├→ 비교
Rulmera AI 판정   ┘
```
