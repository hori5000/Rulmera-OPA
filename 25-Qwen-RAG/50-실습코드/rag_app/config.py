import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass(frozen=True)
class Settings:
    llm_base_url: str = os.getenv("LLM_BASE_URL", "http://127.0.0.1:8000/v1")
    llm_api_key: str = os.getenv("LLM_API_KEY", "local-dev-key")
    llm_model: str = os.getenv("LLM_MODEL", "qwen3.8-27b")

    qdrant_url: str = os.getenv("QDRANT_URL", "http://127.0.0.1:6333")
    qdrant_collection: str = os.getenv("QDRANT_COLLECTION", "qwen_rag_docs")

    embed_model: str = os.getenv("EMBED_MODEL", "Qwen/Qwen3-Embedding-0.6B")
    embed_device: str = os.getenv("EMBED_DEVICE", "cpu")
    embed_dim: int = int(os.getenv("EMBED_DIM", "1024"))

    enable_reranker: bool = os.getenv("ENABLE_RERANKER", "false").lower() == "true"
    rerank_model: str = os.getenv("RERANK_MODEL", "Qwen/Qwen3-Reranker-0.6B")

    top_k: int = int(os.getenv("TOP_K", "12"))
    final_k: int = int(os.getenv("FINAL_K", "6"))

settings = Settings()
