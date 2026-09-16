# PoC 검증계획 v0.3

## PoC가 답해야 할 질문
1. A6000 1장으로 목표 Qwen이 실사용 가능한가?
2. 회사 문서에서 정답 근거를 찾는가?
3. L0~L5 권한누출 0인가?
4. 구버전/충돌을 구분하는가?
5. 근거없음에 억지 답하지 않는가?
6. Qwen이 Answer Contract를 안정적으로 반환하는가?
7. 근거 클릭이 실제 원문 Deep Link로 이어지는가?
8. Voice가 STT 후 동일 OPA/RAG 경로를 타는가?
9. Windows/Android 크기에서 같은 UI가 자연스러운가?
10. Source 변경 1건을 증분색인하는 최소 smoke가 가능한가?

Deployment Fabric 전체 Parity는 PoC 이후 Alpha gate에서 확대한다.

## KPI

| KPI | 초기 목표 |
|---|---:|
| 권한 누출 | 0건 |
| Citation 표시 | 100% |
| Deep Link | 100% test case |
| Answer Contract schema valid | 100% |
| Golden 50 유용답변 | >= 80% |
| No-evidence 안전응답 | >= 90% |
| 최신 승인본 선택 | 100% test case |
| Voice OPA 우회 | 0 |
| 360/768/1440 핵심기능 | 사용 가능 |
| 표준질의 median | <= 15초 초기목표 또는 개선원인 기록 |

## Go
- 권한위반 0
- Answer Contract/Deep Link 구조 안정
- RAG 개선 가능성 확인
- A6000 실사용 가능
- Rulmera UI 재사용 확인

## Conditional Go
- 품질 충분, latency/OCR/문서형식 개선 필요

## No-Go/재설계
- 권한누출
- Citation가 원문으로 추적 불가
- 모델 출력 때문에 UI Contract 유지 불가
- 최신본/tenant filter 구조 보장 실패
