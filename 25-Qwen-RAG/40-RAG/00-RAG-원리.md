# RAG 원리

## 한 줄
**답하기 전에 근거를 검색해서 LLM에게 같이 주는 구조**다.

## 왜 파인튜닝보다 먼저 RAG인가
내부 문서는 계속 바뀐다.

RAG:
- 문서 추가/삭제 즉시 반영
- 출처 제공
- 재학습 불필요
- 프로젝트 filter 가능

Fine-tuning:
- 스타일/행동/특정 능력 조정에 유리
- 문서 DB 대체물로 보기 어려움

## 오류를 둘로 분리
### Retrieval failure
정답 문서가 있는데 못 찾음.

### Generation failure
정답 문서를 찾았는데 LLM이 틀림.

그래서 `/search` endpoint가 반드시 필요하다.

## 품질 5축
1. Parser
2. Chunk
3. Embedding
4. Retrieval/Reranker
5. Prompt/LLM

LLM만 바꿔서는 전체 문제가 해결되지 않는다.
