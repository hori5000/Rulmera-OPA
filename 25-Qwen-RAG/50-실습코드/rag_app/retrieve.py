import argparse
import json

from .config import settings
from .vectorstore import search
from .reranker import rerank

def retrieve(
    question: str,
    project: str | None = None,
    site: str | None = None,
):
    hits = search(
        question,
        project=project,
        site=site,
        limit=settings.top_k,
    )
    return rerank(question, hits, settings.final_k)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("question")
    parser.add_argument("--project", default=None)
    parser.add_argument("--site", default=None)
    args = parser.parse_args()

    hits = retrieve(args.question, args.project, args.site)

    for i, hit in enumerate(hits, start=1):
        print(f"\n=== S{i} score={hit.score:.4f} ===")
        meta = dict(hit.metadata)
        meta.pop("text", None)
        print(json.dumps(meta, ensure_ascii=False, indent=2))
        print(hit.text[:1500])
