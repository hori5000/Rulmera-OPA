# WBS / 구축 로드맵

## Phase 0 — 사전 점검
- GPU/VRAM/Driver
- OS/WSL
- Python
- Docker
- SSD
- RAM
- 네트워크

## Phase 1 — LLM
1. LLM 전용 venv
2. vLLM 설치
3. Qwen 다운로드
4. 16K 기동
5. OpenAI API 확인
6. 안정성/속도/VRAM 기록
7. 32K 비교

## Phase 2 — Vector
1. Qdrant
2. Embedding 0.6B
3. Collection 1024 dim
4. 테스트 문장 upsert
5. 검색 확인

## Phase 3 — Document
1. MD/TXT
2. PDF
3. DOCX
4. XLSX
5. CSV
6. source hash
7. Metadata

## Phase 4 — RAG
1. `/search`
2. Top-K
3. context builder
4. `/ask`
5. `[S1]`
6. no-evidence

## Phase 5 — 품질
1. Gold source 평가셋
2. Chunk size
3. Query instruction
4. Reranker
5. Hybrid
6. version policy

## Phase 6 — 운영
1. systemd
2. log
3. snapshot
4. restore
5. version pin
6. 보안

## Phase 7 — 실제 적용
- Water-AI: 중랑 → 광암 → 명장
- Rulmera: 공고/지침/평가/예산/요구사항/Evidence/Q&A
