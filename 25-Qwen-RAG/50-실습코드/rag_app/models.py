from dataclasses import dataclass, field
from typing import Any

@dataclass
class SourceBlock:
    text: str
    metadata: dict[str, Any] = field(default_factory=dict)

@dataclass
class Chunk:
    id: str
    text: str
    metadata: dict[str, Any]

@dataclass
class SearchHit:
    score: float
    text: str
    metadata: dict[str, Any]
