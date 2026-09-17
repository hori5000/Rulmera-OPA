---
title: RAG 평가셋 설계
doc_path: 40-시험-검증/02-RAG-평가셋-설계.md
doc_category: 시험검증
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# RAG 평가셋 설계 v0.5

> [!summary]
> 이 문서는 무엇을 어떻게 검증할지와 합격 기준을 정의한 시험 기준 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

## Golden Question CSV 필드
- question_id
- tenant_id
- persona/clearance
- question
- expected_answer_points
- expected_doc_ids
- forbidden_doc_ids
- answerable: yes/no
- expected_policy: allow/deny
- difficulty
- reviewer

## 50문항 초기 구성
- 20: 단일문서 사실질문
- 10: 복수문서 종합
- 5: 최신/구버전 충돌
- 5: 장애 해결 순서
- 5: 근거 없는 질문 → 모름 처리
- 5: 전문수준 K0/K2/K4 설명 차이

## 평가항목
- Retrieval Recall@k
- Citation correctness
- Answer groundedness
- Required answer point coverage
- No-evidence behavior
- Version correctness
- Latency

## 사람 검토 점수
- 0: 틀림/위험
- 1: 일부 도움되나 수정필요
- 2: 실무 사용 가능
- 3: 선임자 수준의 명확한 답변
