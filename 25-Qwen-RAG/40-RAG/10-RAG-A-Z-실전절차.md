# RAG A→Z — 문서 한 개에서 실제 답변까지

## 1. 원본
예:
```text
중랑_mapping.xlsx
```

## 2. Parser
`parse_xlsx`는 sheet를 돌면서:
- 첫 유효행을 Header 기준으로 사용
- 20행 단위 block
- `Column=Value`
- `sheet`, `row_start`, `row_end`
를 만든다.

## 3. Hash
파일 SHA-256:
```text
source_hash
```

같은 bytes인지 판정.

## 4. Chunk
SourceBlock이 2200자를 넘으면 overlap 250으로 추가 분할.

## 5. Point ID
```text
UUID5(source_hash | source_path | page | sheet | row | heading | chunk_index)
```

동일 원본의 안정적 ID를 만든다.

## 6. Document Embedding
```python
model.encode(documents, normalize_embeddings=True)
```

## 7. Qdrant
Vector + Payload upsert.

## 8. Query Embedding
Qwen3 Embedding의 query prompt를 사용한다.

```python
model.encode([question], prompt_name="query", normalize_embeddings=True)
```

## 9. Filter
```text
project=Water-AI
site=중랑
is_current=true
```

## 10. Top-K
기본 12개.

## 11. Rerank
OFF일 때 상위 6개.
ON일 때 Top12를 CrossEncoder로 다시 매겨 6개.

## 12. Prompt
```text
[S1] file=... sheet=... rows=...
<원문>

[S2] ...
```

## 13. Qwen
OpenAI-compatible API로 전달.

## 14. Response
```json
{
  "answer":"... [S1]",
  "sources":[
    {"id":"S1","source_file":"...","sheet":"...","row_start":120}
  ]
}
```

## 15. 틀렸을 때
반드시 `/search`부터 본다.

### 검색 결과가 틀림
Parser/Chunk/Embedding/Filter/Reranker 문제.

### 검색은 맞음
Prompt/Qwen 문제.

이 분리를 하지 않으면 “모델이 구리다”라고 잘못 판단하게 된다.
