---
candidate_id:
title: "<% tp.file.title %>"
tenant_id:
document_type: project_candidate
candidate_status: DETECTED
suggested_project_name:
suggested_customer:
suggested_department:
suggested_security_level: L2
confidence:
source_count:
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_updated: <% tp.date.now("YYYY-MM-DD HH:mm") %>
tags:
  - rulmera
  - project-candidate
---
# <% tp.file.title %>

> [!summary]
> AI가 새 프로젝트로 판단한 자료 묶음을 관리자가 확인하기 위한 후보 문서다.

## AI 판단
- Suggested Project Name(추정 프로젝트명):
- Customer(고객사):
- Department(추정부서):
- Security Candidate(보안등급 후보):
- Confidence(판단 신뢰도):

## 발견 근거

## 최초 자료 목록

## 관리자 결정
- [ ] 신규 프로젝트 생성
- [ ] 기존 프로젝트에 연결
- [ ] 보류
- [ ] 잘못된 후보
