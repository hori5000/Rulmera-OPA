# Windows A→Z — 이 문서만 따라가는 실전 절차

## 0. Windows PowerShell
```powershell
nvidia-smi
wsl --install
wsl --update
wsl -l -v
```

Ubuntu가 VERSION 2인지 확인한다.

## 1. Ubuntu
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl wget ca-certificates build-essential python3 python3-venv python3-pip
nvidia-smi
```

여기서 RTX A6000이 보이지 않으면 다음으로 가지 않는다.

## 2. 프로젝트
```bash
mkdir -p ~/qwen-rag/{llm,rag,data,logs,backups}
```

## 3. uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
```

## 4. LLM
```bash
cd ~/qwen-rag/llm
uv venv --python 3.12 .venv-llm
source .venv-llm/bin/activate
uv pip install -U vllm
```

## 5. Qwen
```bash
vllm serve "Qwen/Qwen3.8-27B-FP8"   --served-model-name qwen3.8-27b   --host 0.0.0.0   --port 8000   --tensor-parallel-size 1   --max-model-len 16384   --gpu-memory-utilization 0.88   --max-num-seqs 1
```

## 6. API
새 Ubuntu terminal:
```bash
curl http://127.0.0.1:8000/v1/models
```

한국어:
```bash
curl http://127.0.0.1:8000/v1/chat/completions -H "Content-Type: application/json" -d '{"model":"qwen3.8-27b","messages":[{"role":"user","content":"한국어로 한 문장만 답해. 정상인가?"}],"max_tokens":64}'
```

## 7. Qdrant
Windows에 Docker Desktop을 설치했다면 WSL integration을 켠 뒤:
```bash
cd ~/qwen-rag/rag
docker run -d   --name qdrant   --restart unless-stopped   -p 127.0.0.1:6333:6333   -p 127.0.0.1:6334:6334   -v qdrant_storage:/qdrant/storage   qdrant/qdrant
```

확인:
```bash
curl http://127.0.0.1:6333/collections
```

## 8. RAG 코드
이 Vault의 `25-Qwen-RAG/50-실습코드` 전체를 `~/qwen-rag/rag`에 복사.

```bash
cd ~/qwen-rag/rag
uv venv --python 3.12 .venv-rag
source .venv-rag/bin/activate
uv pip install -r requirements-rag.txt
cp .env.example .env
```

## 9. Collection
```bash
python -m rag_app.vectorstore --init
```

## 10. Sample
```bash
python -m rag_app.ingest sample_docs --project tutorial
python -m rag_app.retrieve "RAG의 목적은 무엇인가?" --project tutorial
```

검색 결과에 `sample_docs/README.md`가 나오면 Retrieval 연결 성공.

## 11. RAG API
```bash
uvicorn rag_app.api:app --host 127.0.0.1 --port 8100
```

브라우저:
```text
http://127.0.0.1:8100/docs
```

## 12. 최종
```bash
curl -X POST http://127.0.0.1:8100/ask -H "Content-Type: application/json" -d '{"question":"이 프로젝트의 목적은 무엇인가?","project":"tutorial"}'
```

응답에 `answer`와 `sources`가 함께 있으면 최소 RAG 완성.

## 13. OOM
```text
max-model-len 16384 → 8192
gpu-memory-utilization 0.88 → 0.84
max-num-seqs=1 유지
Embedding=cpu 유지
```

## 14. 실제 자료
```bash
python -m rag_app.ingest "/mnt/c/WORK/.../중랑자료" --project Water-AI --site 중랑
python -m rag_app.retrieve "A2 PILOT PLC 역할은?" --project Water-AI --site 중랑
```

**실제 자료는 먼저 `/search` 결과가 맞는지 확인한 뒤 `/ask`를 평가한다.**
