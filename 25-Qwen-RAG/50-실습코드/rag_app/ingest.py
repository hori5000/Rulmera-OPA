import argparse
from pathlib import Path

from .parsers import parse_file, SUPPORTED
from .chunker import sha256_file, make_chunks
from .vectorstore import upsert_chunks

EXCLUDE_DIRS = {
    ".git",
    ".obsidian",
    "node_modules",
    "__pycache__",
    ".venv",
    ".venv-rag",
    ".venv-llm",
}

def iter_files(path: Path):
    if path.is_file():
        if path.suffix.lower() in SUPPORTED:
            yield path
        return

    for p in path.rglob("*"):
        if not p.is_file():
            continue
        if any(part in EXCLUDE_DIRS for part in p.parts):
            continue
        if p.suffix.lower() in SUPPORTED:
            yield p

def ingest_path(path: str, project: str, site: str | None = None):
    target = Path(path)
    total_files = 0
    total_chunks = 0

    for file_path in iter_files(target):
        print(f"[PARSE] {file_path}")

        blocks = parse_file(file_path)
        if not blocks:
            print(f"[SKIP] no text: {file_path}")
            continue

        digest = sha256_file(file_path)
        chunks = make_chunks(
            blocks,
            digest,
            project=project,
            site=site,
        )

        upsert_chunks(chunks)

        total_files += 1
        total_chunks += len(chunks)
        print(f"[OK] chunks={len(chunks)}")

    print(f"DONE files={total_files}, chunks={total_chunks}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("path")
    parser.add_argument("--project", required=True)
    parser.add_argument("--site", default=None)
    args = parser.parse_args()

    ingest_path(args.path, args.project, args.site)
