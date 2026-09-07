# Qdrant Vector DB

## Collection
1차:
```text
qwen_rag_docs
```

## Point
Chunk 하나 = Point 하나.

```json
{
  "id":"uuid",
  "vector":[...],
  "payload":{
    "project":"Water-AI",
    "site":"중랑",
    "source_file":"mapping.xlsx",
    "sheet":"PLC_SCADA_DB",
    "row_start":120,
    "row_end":135,
    "text":"..."
  }
}
```

## Filter
```text
project=Water-AI
site=중랑
is_current=true
```

## 자주 Filter할 Payload
- project
- site
- source_type
- is_current
- source_hash

데이터가 커지면 payload index.

## Hybrid
Qdrant는 dense/sparse hybrid와 multi-stage query로 확장 가능하다.
PLC 태그, 모델명, 코드값처럼 exact keyword가 중요한 영역에서 hybrid를 검토한다.
