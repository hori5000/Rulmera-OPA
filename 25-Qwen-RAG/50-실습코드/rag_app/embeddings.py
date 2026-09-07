from functools import lru_cache
import numpy as np
from sentence_transformers import SentenceTransformer

from .config import settings

QUERY_TASK = (
    "Given a user question about internal technical and project documents, "
    "retrieve passages that contain the factual evidence needed to answer the question."
)

@lru_cache(maxsize=1)
def get_embedder() -> SentenceTransformer:
    return SentenceTransformer(
        settings.embed_model,
        device=settings.embed_device,
    )

def embed_documents(texts: list[str]) -> np.ndarray:
    model = get_embedder()
    return model.encode(
        texts,
        normalize_embeddings=True,
        show_progress_bar=len(texts) > 32,
    )

def embed_query(query: str) -> np.ndarray:
    model = get_embedder()

    try:
        vectors = model.encode(
            [query],
            prompt_name="query",
            normalize_embeddings=True,
            show_progress_bar=False,
        )
    except Exception:
        instructed = f"Instruct: {QUERY_TASK}\nQuery: {query}"
        vectors = model.encode(
            [instructed],
            normalize_embeddings=True,
            show_progress_bar=False,
        )

    return vectors[0]
