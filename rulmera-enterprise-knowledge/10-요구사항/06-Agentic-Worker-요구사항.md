---
title: Agentic Worker 실행 요구사항 v0.9
doc_path: 10-요구사항/06-Agentic-Worker-요구사항.md
doc_category: 요구사항
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# Agentic Worker 실행 요구사항 v0.9

> [!summary]
> Qwen이 작업을 제안하고, Worker Controller가 실행요청을 확정·집행하며, OPA가 권한을 판정하고, Durable Workflow가 장시간 실행상태를 보존하며, Worker가 실제 작업을 수행하는 실행형 OPA 요구사항이다.

## 용어 정의
- **PEP(Policy Enforcement Point, 정책 집행 지점)**: 정책결과를 실제 실행에 적용하는 지점. Worker Controller가 담당한다.
- **PDP(Policy Decision Point, 정책 판단 지점)**: 실행 요청을 평가해 허용·거부·승인필요를 결정하는 지점. OPA가 담당한다.
- **Job Hash(작업 해시)**: 승인받은 작업내용이 실행 전까지 바뀌지 않았는지 확인하는 고정 지문.
- **Durable Workflow(내구성 작업흐름)**: 서버·Worker 장애가 나도 진행상태를 잃지 않고 이어서 실행하는 작업관리 방식.
- **Task Queue(작업 대기열)**: Worker가 가져갈 실행 작업을 대기시키는 통로.

## 핵심 원칙
1. **Qwen은 작업을 직접 실행하지 않는다.** Job Proposal만 만든다.
2. **Worker Controller가 PEP다.** Qwen의 Proposal을 그대로 신뢰하지 않고 실제 Resource/Argument/Environment를 정규화한다.
3. **OPA가 PDP다.** Canonical Action Request를 기준으로 `ALLOW/DENY/REQUIRE_APPROVAL`을 판단한다.
4. **승인은 Job Hash와 결합한다.** 승인 후 작업내용이 바뀌면 실행하지 않는다.
5. **Tool 이름뿐 아니라 인자와 자원을 판정한다.** Path, Tenant, Project, 삭제, 네트워크, 환경까지 정책에 포함한다.
6. **장시간 작업은 Durable Workflow로 관리한다.** 상태 영속, Retry, Timeout, 승인대기, 장애복구를 지원한다.
7. **Git은 선택사항이다.** Git 저장소는 소스·형상·감사 또는 Job Adapter로 사용할 수 있지만 Core 필수요소는 아니다.
8. **실제 실행은 Worker가 한다.** 허용된 도구와 격리된 Workspace 범위 안에서만 수행한다.

## 기능 요구사항
| Req ID | 요구사항 | 우선순위 |
|---|---|---|
| REQ-ACT-001 | Qwen은 자연어 요청을 구조화된 Job Proposal로 변환할 수 있어야 한다. | MUST |
| REQ-ACT-002 | Worker Controller는 Job Proposal을 Canonical Job/Action Request로 정규화해야 한다. | MUST |
| REQ-ACT-003 | 모든 실행 Job은 Controller/PEP를 통해 OPA/PDP 판정을 받아야 한다. | MUST |
| REQ-ACT-004 | 정책판정은 Tool ID뿐 아니라 Resource/Path/Argument/Environment/Network를 포함해야 한다. | MUST |
| REQ-ACT-005 | Worker Controller는 허용 또는 유효 승인된 Job만 Workflow에 제출해야 한다. | MUST |
| REQ-ACT-006 | Worker는 허용된 Tool/Command/Workspace/Network 범위에서만 실행해야 한다. | MUST |
| REQ-ACT-007 | 고위험 작업은 Controller가 생성한 Action Preview를 사람이 승인해야 한다. | MUST |
| REQ-ACT-008 | 사람승인은 `approved_job_hash`와 실제 `job_hash`가 일치할 때만 유효해야 한다. | MUST |
| REQ-ACT-009 | 정책버전·정책결정ID·승인자·승인시각·승인만료를 감사 가능하게 기록해야 한다. | MUST |
| REQ-ACT-010 | Qwen은 raw shell credential이나 인프라 Secret을 직접 보유하지 않아야 한다. | MUST |
| REQ-ACT-011 | Git은 선택적 Source/Job/Audit Adapter로 사용할 수 있어야 한다. | SHOULD |
| REQ-ACT-012 | 여러 Worker 유형을 등록하고 Job 유형에 따라 라우팅할 수 있어야 한다. | SHOULD |
| REQ-WRK-001 | Job/Workflow 상태와 실행로그를 영속적으로 관리해야 한다. | MUST |
| REQ-WRK-002 | 장시간 Job은 장애 후 이전 진행상태에서 복구 또는 안전하게 재개할 수 있어야 한다. | MUST |
| REQ-WRK-003 | Activity 단위 Retry와 Timeout 정책을 지원해야 한다. | MUST |
| REQ-WRK-004 | Idempotency Key로 동일 Job의 의도치 않은 중복실행을 막아야 한다. | MUST |
| REQ-WRK-005 | 실패 Job을 재시도 한도 이후 별도 격리/수동확인 상태로 보낼 수 있어야 한다. | SHOULD |
| REQ-WRK-006 | Worker 결과는 Result Contract로 반환되어야 한다. | MUST |
| REQ-WRK-007 | Workflow Engine은 Adapter 경계로 추상화해 특정 제품에 Core가 종속되지 않아야 한다. | MUST |
| REQ-WRK-008 | Git 사용/미사용 경로 모두 동일 Job/Result Contract를 유지해야 한다. | SHOULD |

## Worker 유형 예시
- `knowledge-worker` — 지식 정리, 변환, RAG 재색인
- `document-worker` — Markdown/DOCX/PPTX/보고서 생성
- `code-worker` — 코드/설정 수정
- `test-worker` — lint, unit, smoke, regression
- `build-worker` — package/build/image 생성
- `deploy-worker` — 승인된 환경 배포
- `data-worker` — ETL, 스키마 검사, 데이터 품질 작업

## 고위험 작업 예
- Production 배포/롤백
- 대량 삭제·덮어쓰기
- OPA Policy 수정
- Secret/인증정보 변경
- L4~L5 자료 변환/반출
- 외부 네트워크 파일 전송
- 데이터베이스 DDL/대량 UPDATE/DELETE

## 관련 설계
- [[../20-설계/10-Qwen-Worker-실행아키텍처]]
- [[../20-설계/11-Worker-Job-Contract]]
- [[../20-설계/12-Durable-Workflow-설계]]
- [[../20-설계/13-Action-Authorization-Enforcement]]
- [[../20-설계/03-OPA-권한모델]]
