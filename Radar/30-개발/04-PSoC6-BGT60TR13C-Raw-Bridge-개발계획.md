---
title: PSoC 6 BGT60TR13C Raw Bridge 개발계획
date: 2026-09-17
status: planned
project: Rulmera Radar
---

# PSoC 6 BGT60TR13C Raw Bridge 개발계획

## 목적

KIT_CSK_BGT60TR13C에서 PSoC 6가 BGT60TR13C의 Raw Radar frame을 직접 취득하고 PC로 전달하는 Rulmera 전용 Bridge를 만든다.

## 단계

### Stage 1 — 개발환경

- KIT_CSK_BGT60TR13C 1대
- 온보드 KitProg3를 통한 program/debug
- Infineon PSoC 6 개발환경 및 BGT60TR13C 라이브러리 확인
- 공식 예제 빌드/실행으로 보드 정상성 검증

### Stage 2 — Radar Bring-up

- SPI 초기화
- Radar reset/power sequence
- BGT60TR13C register/config 적용
- IRQ 확인
- FIFO 상태 확인

### Stage 3 — Raw Frame

- 1 RX 최소 설정에서 시작
- 고정된 samples/chirp, chirps/frame으로 frame 수집
- FIFO word layout 검증
- 3 RX 확장
- frame size 계산과 실제 byte 수 일치 확인

### Stage 4 — Metadata

각 frame에 다음을 함께 기록한다.

```text
magic
protocol_version
device_id
frame_counter
timestamp
rx_count
chirps_per_frame
samples_per_chirp
sample_format
payload_size
status_flags
raw_payload
crc(optional)
```

### Stage 5 — PC Streaming

전송 인터페이스는 실제 대역폭을 측정해 결정한다.

- 개발키트 기본 통신 경로
- PSoC 6 native USB 또는 사용 가능한 고속 인터페이스
- 필요 시 frame rate/샘플 수를 낮춘 Debug profile과 Full capture profile 분리

중요: **UART만으로 Full 3-RX Raw streaming이 가능한지 가정하지 않고 실측한다.**

### Stage 6 — PC Recorder

- packet parser
- frame validation
- loss detection
- raw binary 또는 `.npy` 저장
- config/metadata JSON 저장
- replay 지원

### Stage 7 — Reference DSP

- Range FFT
- Range-Doppler
- Angle/phase
- Capon 또는 대체 beamforming
- Feature extraction

### Stage 8 — A6000 학습

- 데이터셋 생성
- train/validation/test split
- Model A/B/C/D 비교
- Edge 이관 후보 선정

## 중단 기준

다음 문제는 즉시 기록하고 원인을 분리한다.

- FIFO overflow
- frame drop
- USB/UART bandwidth 한계
- PSoC 6 RAM 부족
- 실시간 DSP 계산량 초과

이러한 한계가 나오더라도 BGT60TR13C Raw 취득 자체와 AI 학습 가능성은 분리해서 판단한다.
