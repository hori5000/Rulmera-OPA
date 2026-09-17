---
title: OPA 권한모델 v0.9 — Knowledge + Action Authorization
doc_path: 20-설계/03-OPA-권한모델.md
doc_category: 설계
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# OPA 권한모델 v0.9 — Knowledge + Action Authorization

> [!summary]
> 이 문서는 제품 구조, 데이터 흐름, 권한 구조, 동작 원리를 설명하는 설계 기준 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

## OPA(Open Policy Agent, 접근정책 엔진)란?
OPA는 **사용자가 어떤 지식을 조회·열람·다운로드·승인할 수 있는지**, 그리고 **AI를 통해 어떤 작업을 실행할 수 있는지**를 일관되게 판단하는 정책 엔진이다.  
핵심은 **AI가 알아서 보안을 판단하는 것이 아니라, 정책 엔진이 먼저 허용 범위를 결정**한다는 점이다.

## Query 권한 입력 예시
```json
{
  "user": {
    "tenant_id": "company-a",
    "department": "automation",
    "clearance": 3,
    "projects": ["line-2026"],
    "job_scopes": ["plc-maintenance"]
  },
  "request": {
    "action": "knowledge.query",
    "project_id": "line-2026",
    "channel": "voice"
  }
}
```

`channel`이 voice/text라고 해서 권한정책이 달라지지 않는다.

## Document(문서) 속성 예시
```json
{
  "tenant_id": "company-a",
  "security_level": 3,
  "department": "automation",
  "project_ids": ["line-2026"],
  "nda_customer": null,
  "approval_status": "APPROVED",
  "valid_to": null
}
```

## 기본 판정 흐름도
```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#F8FAFC","primaryTextColor":"#1F2937","primaryBorderColor":"#64748B","lineColor":"#64748B","secondaryColor":"#EAF4FF","tertiaryColor":"#EAFBF2","clusterBkg":"#F8FAFC","clusterBorder":"#CBD5E1","fontSize":"15px"}} }%%
flowchart TD
  A[Tenant Match?<br/>같은 회사 자료인가] -->|No| DENY[DENY<br/>거부]
  A -->|Yes| B[Approved?<br/>승인본인가]
  B -->|No| DENY
  B -->|Yes| C[Clearance Check<br/>사용자 보안등급이 충분한가]
  C -->|No| DENY
  C -->|Yes| D[Department / Project / Job Scope<br/>부서·프로젝트·업무범위 일치 여부]
  D -->|No| DENY
  D -->|Yes| E[NDA / Validity Check<br/>NDA·유효기간 조건 확인]
  E -->|No| DENY
  E -->|Yes| ALLOW[ALLOW + Retrieval Filter<br/>허용 + 검색필터 생성]

  classDef ok fill:#EAFBF2,stroke:#27AE60,stroke-width:2px,color:#114B2E;
  classDef check fill:#EAF4FF,stroke:#2F80ED,stroke-width:2px,color:#102A43;
  classDef no fill:#FDECEC,stroke:#EB5757,stroke-width:2px,color:#7A1F1F;
  class A,B,C,D,E check;
  class ALLOW ok;
  class DENY no;
```

## Action(행동) 유형
- `knowledge.query` : 질문하기
- `knowledge.open` : 문서 열기
- `knowledge.download` : 파일 다운로드
- `knowledge.submit` : 새 지식 제출
- `knowledge.approve` : 승인하기
- `project.create` : 프로젝트 생성
- `policy.modify` : 정책 수정
- `audit.read` : 감사기록 보기
- `job.create` : Worker 작업 생성
- `job.cancel` : 작업 취소
- `worker.execute` : 실행 Worker 사용
- `workspace.write` : 작업공간 파일 수정
- `repository.commit` : Git commit 생성
- `repository.push` : 원격 저장소 push
- `test.execute` : 테스트 실행
- `build.execute` : 빌드 실행
- `deploy.stage` : Stage 배포
- `deploy.production` : Production 배포

## Action OPA 실행 집행 구조
### 용어 정의
- **PEP(Policy Enforcement Point, 정책 집행 지점)**: OPA에 정책판정을 요청하고 그 결과를 실제 실행에 적용하는 지점. Rulmera에서는 **Worker Controller**가 담당한다.
- **PDP(Policy Decision Point, 정책 판단 지점)**: 구조화된 정책 입력을 평가해 `ALLOW / DENY / REQUIRE_APPROVAL`을 반환하는 지점. Rulmera에서는 **OPA**가 담당한다.
- **Canonical Action Request(정규 행동 요청)**: Tool 이름뿐 아니라 실제 대상 경로·인자·환경·네트워크·부작용까지 Controller가 확정한 정책 입력이다.

Action OPA는 `Qwen → OPA` 직결이 아니라 다음 순서를 기준으로 한다.

```text
Qwen Job Proposal
  ↓
Worker Controller / PEP
  ↓  실제 Resource/Argument/Environment 정규화
OPA / PDP
  ↓
DENY | REQUIRE_APPROVAL | ALLOW
```

정책은 Tool ID만 보지 않는다. 예를 들어 `workspace.write`가 허용돼도 `/tenant-b/**`, `allow_delete=true`, `environment=production`, 외부 네트워크 전송은 별도 조건으로 거부 또는 승인요구할 수 있어야 한다.

고위험 작업의 사람 승인은 **Job Hash(작업 내용 고정 지문)**와 결합한다. 승인 후 Job 내용이 바뀌면 해시가 달라지므로 재승인 없이는 실행할 수 없다.

## Deep Link(원문 바로가기) 보안
답변에 Source Card(근거 카드)가 보였더라도, 사용자가 링크를 클릭하는 순간 다시 확인한다.
1. 현재 Identity(사용자 신원) 조회
2. `knowledge.open` OPA 판정
3. 허용 시 Route Resolver(원문링크 해석기) 수행
4. 거부 시 DENY + Audit(감사기록)

## Ingestion / Approval(수집 / 승인)
자동분류 서비스는 보안등급을 **결정**하지 않고 **후보를 제안**한다.  
고위험 유형은 `knowledge.approve` 권한을 가진 사용자의 승인 없이는 `APPROVED` 상태로 가지 않는다.

## 구현 원칙
- `default allow = false` (기본 거부)
- Policy와 조직/프로젝트 Data 분리
- Filter 없는 Retrieval API 금지
- Policy 변경 감사
- Query/Open/Download 각각 Action 분리


## Action Authorization(실행 권한판정)
Worker Job은 Retrieval과 별도의 Action 판정을 사용한다.

### 입력 예시
아래 입력은 Qwen이 직접 확정하는 값이 아니라 **Worker Controller/PEP가 시스템 상태와 Tool Schema를 기준으로 정규화한 Canonical Action Request**다.

```json
{
  "user": {
    "tenant_id": "company-a",
    "role": "engineer",
    "projects": ["radar"]
  },
  "request": {
    "action": "build.execute",
    "project_id": "radar",
    "tool": "build.run",
    "resource": "/company-a/radar/**",
    "arguments": {"allow_delete": false},
    "environment": "project-workspace",
    "network": "deny"
  }
}
```

### 결과
- `ALLOW`: Controller가 Job Hash/정책결정을 검증한 뒤 Workflow에 제출 가능
- `DENY`: Workflow/Queue 진입 자체 금지
- `REQUIRE_APPROVAL`: Controller가 Action Preview와 Job Hash를 생성하고 승인 전 `WAITING_APPROVAL`

### 추가 원칙
- Qwen의 판단은 권한 근거가 아니다.
- Worker Controller는 유효한 OPA decision 없이 실행하지 않는다.
- Production 배포, 대량 삭제, Policy 변경, Secret 변경은 고위험 Action으로 분류한다.
- Git credential/Cloud credential/DB credential은 Qwen Context에 넣지 않는다.
- Worker는 Tool Allowlist와 Workspace Boundary를 따른다.
