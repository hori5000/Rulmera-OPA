# Tutorial 문서

RAG는 사용자의 질문과 관련된 근거 문서를 먼저 검색한 뒤 그 근거를 LLM에 전달하는 방식이다.

이 Qwen-RAG 프로젝트는 Qwen3.8-27B-FP8을 로컬 서버에서 실행하고, Qwen3 Embedding과 Qdrant를 이용해 내부 문서를 검색한다.

최종 답변은 가능한 경우 원본 파일명, PDF 페이지, Excel 시트와 행, Markdown Heading을 출처로 표시한다.
