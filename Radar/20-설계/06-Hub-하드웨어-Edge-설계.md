# Hub 하드웨어 / Edge 설계

## 역할
Hub는 4개 AS_613를 연결하고 Rulmera Fusion/Tracking/AI를 실행하는 중심 장치다.

## 필요 기능
- Radar 4채널 통신
- 안정적 전원
- 센서 ID 분리
- 충분한 RAM/Flash
- 디버그/업데이트
- PC 연결
- 향후 Ethernet/Wi-Fi/BLE 등 상위 연결 후보
- 필요시 외부 Sync/Trigger IO

## MCU 선정 기준
1. 실제 Radar protocol/대역폭
2. 4 Sensor frame rate
3. Fusion/Tracking CPU
4. AI inference RAM/Flash
5. USB/UART/SPI 등 I/O 수
6. 개발도구/디버깅
7. BOM/수급

## PSoC Edge E84
현재 후보일 뿐 확정하지 않는다. PC Reference profiling 후 필요 성능을 계산하고 선택한다.

## 개발 순서
PC 기능 완성 → 프로파일링 → MCU 요구량 산정 → 보드 선정/설계 → C/C++/Edge Port → 동일 Replay로 비교.
