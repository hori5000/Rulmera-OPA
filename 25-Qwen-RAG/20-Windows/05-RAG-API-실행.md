# Windows/WSL — RAG API 실행

## 전제
- vLLM :8000 정상
- Qdrant :6333 정상

## 1. 코드
`25-Qwen-RAG/50-실습코드`를 `~/qwen-rag/rag`로 복사하거나 Git으로 관리.

## 2. 환경
```bash
cd ~/qwen-rag/rag
uv venv --python 3.12 .venv-rag
source .venv-rag/bin/activate
uv pip install -r requirements-rag.txt
cp .env.example .env
```

## 3. Collection
```bash
python -m rag_app.vectorstore --init
```

## 4. 테스트 문서
```bash
python -m rag_app.ingest sample_docs --project tutorial
```

## 5. 검색
```bash
python -m rag_app.retrieve "RAG의 목적은 무엇인가?" --project tutorial
```

## 6. API
```bash
uvicorn rag_app.api:app --host 127.0.0.1 --port 8100
```

Swagger:
```text
http://127.0.0.1:8100/docs
```

## 7. 질문
```bash
curl -X POST http://127.0.0.1:8100/ask   -H "Content-Type: application/json"   -d '{"question":"이 프로젝트의 목적은 무엇인가?","project":"tutorial"}'
```
