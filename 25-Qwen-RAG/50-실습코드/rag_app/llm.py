from openai import OpenAI

from .config import settings
from .models import SearchHit

SYSTEM = """너는 사내 기술문서 RAG 어시스턴트다.
반드시 제공된 SOURCES를 우선 근거로 답하라.
근거가 부족하거나 서로 충돌하면 그 사실을 명시하라.
각 핵심 사실 뒤에는 [S1], [S2]처럼 출처 번호를 붙여라.
SOURCES에 없는 사실을 확정적으로 만들어내지 마라.
답은 한국어로 작성하되 원문 기술용어는 필요한 경우 그대로 유지하라."""

def source_header(index: int, hit: SearchHit) -> str:
    meta = hit.metadata
    location = []

    if meta.get("page"):
        location.append(f"page={meta['page']}")
    if meta.get("sheet"):
        location.append(f"sheet={meta['sheet']}")
    if meta.get("row_start"):
        location.append(
            f"rows={meta.get('row_start')}-{meta.get('row_end')}"
        )
    if meta.get("heading"):
        location.append(f"heading={meta['heading']}")

    return (
        f"[S{index}] file={meta.get('source_file', '')} "
        + " ".join(location)
    )

def build_context(hits: list[SearchHit]) -> str:
    blocks = []

    for i, hit in enumerate(hits, start=1):
        blocks.append(
            source_header(i, hit)
            + "\n"
            + hit.text
        )

    return "\n\n".join(blocks)

def ask_llm(question: str, hits: list[SearchHit]) -> str:
    client = OpenAI(
        base_url=settings.llm_base_url,
        api_key=settings.llm_api_key,
    )

    context = build_context(hits)

    user_prompt = f"""QUESTION:
{question}

SOURCES:
{context}

위 SOURCES에서 확인 가능한 내용을 중심으로 답하고,
각 핵심 주장마다 [S#]를 붙여라."""

    response = client.chat.completions.create(
        model=settings.llm_model,
        messages=[
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
        top_p=0.8,
        max_tokens=1800,
        extra_body={
            "chat_template_kwargs": {
                "enable_thinking": False
            }
        },
    )

    return response.choices[0].message.content or ""
