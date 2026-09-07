# RAG API

## `GET /health`
RAG/Qdrant/vLLM 상태.

## `POST /search`
LLM 없이 검색만.
디버깅에서 가장 중요.

```json
{"question":"A2 PILOT PLC 역할은?","project":"Water-AI","site":"중랑"}
```

## `POST /ask`
검색 + LLM.

## Swagger
```text
http://127.0.0.1:8100/docs
```

## 운영 확장
- auth
- project ACL
- request id
- timeout/retry
- structured logging
- rate limit
- streaming
- async ingestion job
