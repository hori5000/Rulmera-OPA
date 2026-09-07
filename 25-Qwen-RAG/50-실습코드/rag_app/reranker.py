from functools import lru_cache
from sentence_transformers import CrossEncoder

from .config import settings
from .models import SearchHit

@lru_cache(maxsize=1)
def get_reranker() -> CrossEncoder:
    return CrossEncoder(settings.rerank_model)

def rerank(query: str, hits: list[SearchHit], final_k: int) -> list[SearchHit]:
    if not hits:
        return []

    if not settings.enable_reranker:
        return hits[:final_k]

    model = get_reranker()
    pairs = [(query, hit.text) for hit in hits]
    scores = model.predict(pairs)

    ranked = sorted(
        zip(scores, hits),
        key=lambda item: float(item[0]),
        reverse=True,
    )

    return [hit for _, hit in ranked[:final_k]]
