---
title: PoC 검증계획 v0.8
doc_path: 40-시험-검증/01-PoC-검증계획.md
doc_category: 시험검증
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# PoC 검증계획 v0.8

> [!summary]
> 이 문서는 무엇을 어떻게 검증할지와 합격 기준을 정의한 시험 기준 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

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
11. Qwen이 Job Contract를 생성하고 Action OPA를 거쳐 Worker가 안전하게 실행할 수 있는가?
12. OPA DENY/승인대기 Job이 Worker Queue에 들어가지 않는가?

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
| Action OPA 우회 실행 | 0건 |
| Worker Tenant 경계 위반 | 0건 |
| Job/Result Contract schema valid | 100% |

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

상세 Worker 시험: [[05-Worker-실행-검증]]
