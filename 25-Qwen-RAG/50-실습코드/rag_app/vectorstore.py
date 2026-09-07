import argparse
from qdrant_client import QdrantClient, models

from .config import settings
from .models import Chunk, SearchHit
from .embeddings import embed_documents, embed_query

def get_client() -> QdrantClient:
    return QdrantClient(url=settings.qdrant_url)

def ensure_collection() -> None:
    c = get_client()

    if c.collection_exists(settings.qdrant_collection):
        return

    c.create_collection(
        collection_name=settings.qdrant_collection,
        vectors_config=models.VectorParams(
            size=settings.embed_dim,
            distance=models.Distance.COSINE,
        ),
    )

    for field, schema in [
        ("project", models.PayloadSchemaType.KEYWORD),
        ("site", models.PayloadSchemaType.KEYWORD),
        ("source_type", models.PayloadSchemaType.KEYWORD),
        ("source_hash", models.PayloadSchemaType.KEYWORD),
        ("is_current", models.PayloadSchemaType.BOOL),
    ]:
        try:
            c.create_payload_index(
                collection_name=settings.qdrant_collection,
                field_name=field,
                field_schema=schema,
            )
        except Exception:
            pass

def upsert_chunks(chunks: list[Chunk], batch_size: int = 32) -> None:
    ensure_collection()
    c = get_client()

    for start in range(0, len(chunks), batch_size):
        batch = chunks[start:start + batch_size]
        vectors = embed_documents([x.text for x in batch])

        points = [
            models.PointStruct(
                id=x.id,
                vector=vector.tolist(),
                payload=x.metadata,
            )
            for x, vector in zip(batch, vectors)
        ]

        c.upsert(
            collection_name=settings.qdrant_collection,
            points=points,
            wait=True,
        )

def build_filter(project: str | None, site: str | None) -> models.Filter:
    must = [
        models.FieldCondition(
            key="is_current",
            match=models.MatchValue(value=True),
        )
    ]

    if project:
        must.append(
            models.FieldCondition(
                key="project",
                match=models.MatchValue(value=project),
            )
        )

    if site:
        must.append(
            models.FieldCondition(
                key="site",
                match=models.MatchValue(value=site),
            )
        )

    return models.Filter(must=must)

def search(
    query: str,
    project: str | None = None,
    site: str | None = None,
    limit: int | None = None,
) -> list[SearchHit]:
    ensure_collection()
    c = get_client()
    query_vector = embed_query(query)

    response = c.query_points(
        collection_name=settings.qdrant_collection,
        query=query_vector.tolist(),
        query_filter=build_filter(project, site),
        limit=limit or settings.top_k,
        with_payload=True,
    )

    hits = []
    for point in response.points:
        payload = dict(point.payload or {})
        hits.append(
            SearchHit(
                score=float(point.score),
                text=str(payload.get("text", "")),
                metadata=payload,
            )
        )

    return hits

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--init", action="store_true")
    args = parser.parse_args()

    if args.init:
        ensure_collection()
        print(f"READY: {settings.qdrant_collection}")
