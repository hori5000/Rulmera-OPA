from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI

from .retrieve import retrieve
from .llm import ask_llm
from .config import settings
from .vectorstore import get_client

app = FastAPI(
    title="Qwen-RAG",
    version="0.1.0",
)

class AskRequest(BaseModel):
    question: str
    project: str | None = None
    site: str | None = None

def serialize_sources(hits):
    result = []

    for i, hit in enumerate(hits, start=1):
        meta = dict(hit.metadata)
        meta.pop("text", None)

        result.append({
            "id": f"S{i}",
            "score": hit.score,
            **meta,
        })

    return result

@app.get("/health")
def health():
    status = {
        "rag": "ok",
        "qdrant": "unknown",
        "llm": "unknown",
    }

    try:
        get_client().get_collections()
        status["qdrant"] = "ok"
    except Exception as exc:
        status["qdrant"] = f"error: {exc}"

    try:
        client = OpenAI(
            base_url=settings.llm_base_url,
            api_key=settings.llm_api_key,
        )
        client.models.list()
        status["llm"] = "ok"
    except Exception as exc:
        status["llm"] = f"error: {exc}"

    return status

@app.post("/search")
def search_api(req: AskRequest):
    hits = retrieve(
        req.question,
        req.project,
        req.site,
    )

    return {
        "question": req.question,
        "sources": serialize_sources(hits),
        "passages": [hit.text for hit in hits],
    }

@app.post("/ask")
def ask(req: AskRequest):
    hits = retrieve(
        req.question,
        req.project,
        req.site,
    )

    if not hits:
        raise HTTPException(
            status_code=404,
            detail="검색된 근거 문서가 없습니다.",
        )

    answer = ask_llm(req.question, hits)

    return {
        "question": req.question,
        "answer": answer,
        "sources": serialize_sources(hits),
    }
