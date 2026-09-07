# Obsidian Vault RAG

## 제외
```text
.obsidian/
.git/
node_modules/
cache/
```

첨부파일은 확장자별 parser 정책으로 별도 처리.

## YAML 활용
```yaml
project:
site:
status:
knowledge_status:
tags:
```

## 권장 status
```text
raw
reviewed
authoritative
deprecated
```

검색 우선:
```text
authoritative > reviewed > raw
```

## 장점
이 교본 자체를 RAG에 넣으면:
> “Windows에서 vLLM 설치 순서가 뭐였지?”
를 이 Vault에서 직접 검색하게 할 수 있다.
