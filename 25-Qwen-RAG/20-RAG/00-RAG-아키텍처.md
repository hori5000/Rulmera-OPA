# RAG 아키텍처

```text
질문
 ↓
Query Embedding
 ↓
Qdrant
 ↓
Top-K Chunk
 ↓
Reranker
 ↓
Prompt Builder
 ↓
Qwen3.8
 ↓
답변 + Sources
```

## 원칙
- LLM Serving과 Retrieval을 분리한다.
- 모델을 바꿔도 RAG 저장소는 유지할 수 있게 한다.
- 프로젝트별 Collection 또는 Metadata namespace를 둔다.
- 원본 문서와 Vector DB는 별도 보관한다.
- 답변에는 근거를 추적할 수 있어야 한다.
