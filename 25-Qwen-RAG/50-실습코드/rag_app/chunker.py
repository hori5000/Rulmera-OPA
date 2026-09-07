import hashlib
import uuid
from pathlib import Path

from .models import SourceBlock, Chunk

def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()

def split_text(text: str, max_chars: int = 2200, overlap: int = 250) -> list[str]:
    text = text.strip()
    if not text:
        return []

    if len(text) <= max_chars:
        return [text]

    result = []
    start = 0

    while start < len(text):
        end = min(start + max_chars, len(text))

        if end < len(text):
            newline = text.rfind("\n", start, end)
            period = text.rfind(". ", start, end)
            cut = max(newline, period)
            if cut > start + max_chars // 2:
                end = cut + 1

        part = text[start:end].strip()
        if part:
            result.append(part)

        if end >= len(text):
            break

        start = max(0, end - overlap)

    return result

def make_chunks(
    blocks: list[SourceBlock],
    source_hash: str,
    project: str,
    site: str | None = None,
) -> list[Chunk]:
    chunks = []
    chunk_index = 0

    for block in blocks:
        for piece in split_text(block.text):
            meta = dict(block.metadata)
            meta.update({
                "project": project,
                "site": site or "",
                "source_hash": source_hash,
                "chunk_index": chunk_index,
                "text": piece,
                "is_current": True,
            })

            seed = "|".join([
                source_hash,
                str(meta.get("source_path", "")),
                str(meta.get("page", "")),
                str(meta.get("sheet", "")),
                str(meta.get("row_start", "")),
                str(meta.get("heading", "")),
                str(chunk_index),
            ])

            point_id = str(uuid.uuid5(uuid.NAMESPACE_URL, seed))
            chunks.append(Chunk(point_id, piece, meta))
            chunk_index += 1

    return chunks
