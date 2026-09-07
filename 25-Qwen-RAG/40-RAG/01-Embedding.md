# Embedding

## 1차 모델
`Qwen/Qwen3-Embedding-0.6B`

공식 모델 정보 기준:
- 0.6B
- 32K context
- 최대 1024 dimension
- 100+ languages
- query instruction 지원

## 왜 0.6B
27B LLM이 A6000의 주 VRAM을 사용한다.
Embedding을 CPU에서 먼저 돌리면 구조 안정화가 쉽다.

## Query instruction
Qwen3 Embedding은 query 쪽 instruction 사용을 권장한다.

예:
```text
Instruct: Given a user question about internal technical and project documents, retrieve passages that contain the factual evidence needed to answer the question.
Query: A2 PILOT PLC 역할은?
```

Document는 원문 그대로 embedding.

## Dimension
1차는 1024 고정.

Embedding 모델/dimension 변경 시 기존 collection과 섞지 않는다.
새 collection 또는 full reindex가 원칙.

## Normalize
Cosine 검색 기준으로 embedding normalize.
