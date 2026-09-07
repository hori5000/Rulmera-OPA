# 50-실습코드 — 최소 동작 RAG

이 코드는 교본의 구조를 실제로 확인하기 위한 기준 구현이다.

## 1. RAG 환경
```bash
cd 50-실습코드
uv venv --python 3.12 .venv-rag
source .venv-rag/bin/activate
uv pip install -r requirements-rag.txt
cp .env.example .env
```

## 2. Qdrant
```bash
docker compose -f docker-compose.qdrant.yml up -d
curl http://127.0.0.1:6333/collections
```

## 3. Collection
```bash
python -m rag_app.vectorstore --init
```

## 4. Tutorial 문서
```bash
python -m rag_app.ingest sample_docs --project tutorial
python -m rag_app.retrieve "RAG의 목적은 무엇인가?" --project tutorial
```

## 5. RAG API
vLLM이 이미 :8000에서 실행 중이어야 한다.

```bash
uvicorn rag_app.api:app --host 127.0.0.1 --port 8100
```

Swagger:
```text
http://127.0.0.1:8100/docs
```

질문:
```bash
curl -X POST http://127.0.0.1:8100/ask   -H "Content-Type: application/json"   -d '{"question":"이 프로젝트가 만드는 것은 무엇인가?","project":"tutorial"}'
```

## 실제 Water-AI
```bash
python -m rag_app.ingest "/path/to/docs" --project Water-AI --site 중랑
python -m rag_app.retrieve "A2 PILOT PLC 역할은?" --project Water-AI --site 중랑
```

## Prototype과 Production의 차이
이 실습 코드는 구조를 숨기지 않기 위해 의도적으로 단순하게 작성했다.

운영 전 추가:
- ingestion manifest DB
- 문서 version policy
- ACL
- retry/timeout
- streaming
- hybrid retrieval
- background worker
- metrics
- auth
