# Retrieval / Reranker

## Baseline
```text
Dense Top12 → Final6
```

## 개선
```text
Dense Top20 → Qwen3-Reranker-0.6B → Final6
```

## 왜 Reranker를 나중에
- latency 증가
- model memory
- 구성 복잡도
- baseline 없으면 개선 여부 판정 불가

## 측정
- Recall@3/5/10
- MRR
- Gold source Top1 비율
- Retrieval latency
- End-to-end latency

## Hybrid
정확한 문자열이 중요한 Water-AI에서는 추후:
```text
Dense + Sparse → RRF → Reranker
```
를 후보로 둔다.
