# Linux A→Z — 이 문서만 따라가는 실전 절차

## 0. GPU
```bash
nvidia-smi --query-gpu=name,memory.total,driver_version,compute_cap --format=csv
cat /etc/os-release
```

GPU가 정상이어야 한다.

## 1. 기본
```bash
sudo apt update
sudo apt install -y git curl wget ca-certificates build-essential python3 python3-venv python3-pip docker.io
sudo systemctl enable --now docker
```

현재 사용자를 docker group에 넣을 경우:
```bash
sudo usermod -aG docker $USER
```
로그아웃/로그인 후 적용. 운영에서는 docker group의 root-equivalent 권한 성격을 이해하고 사용한다.

## 2. 디렉터리
```bash
mkdir -p ~/qwen-rag/{llm,rag,data,logs,backups}
```

## 3. uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
```

## 4. vLLM
```bash
cd ~/qwen-rag/llm
uv venv --python 3.12 .venv-llm
source .venv-llm/bin/activate
uv pip install -U vllm
```

## 5. Qwen
```bash
vllm serve "Qwen/Qwen3.8-27B-FP8"   --served-model-name qwen3.8-27b   --host 127.0.0.1   --port 8000   --tensor-parallel-size 1   --max-model-len 16384   --gpu-memory-utilization 0.88   --max-num-seqs 1
```

## 6. 확인
```bash
curl http://127.0.0.1:8000/v1/models
```

## 7. Qdrant
```bash
docker run -d   --name qdrant   --restart unless-stopped   -p 127.0.0.1:6333:6333   -p 127.0.0.1:6334:6334   -v qdrant_storage:/qdrant/storage   qdrant/qdrant
```

```bash
curl http://127.0.0.1:6333/collections
```

## 8. RAG
`50-실습코드`를 `~/qwen-rag/rag`로 복사.

```bash
cd ~/qwen-rag/rag
uv venv --python 3.12 .venv-rag
source .venv-rag/bin/activate
uv pip install -r requirements-rag.txt
cp .env.example .env

python -m rag_app.vectorstore --init
python -m rag_app.ingest sample_docs --project tutorial
python -m rag_app.retrieve "RAG의 목적은 무엇인가?" --project tutorial
```

## 9. API
```bash
uvicorn rag_app.api:app --host 127.0.0.1 --port 8100
```

```bash
curl http://127.0.0.1:8100/health
```

## 10. 실제 질문
```bash
curl -X POST http://127.0.0.1:8100/ask -H "Content-Type: application/json" -d '{"question":"이 프로젝트의 목적은 무엇인가?","project":"tutorial"}'
```

## 11. 운영
prototype 성공 후:
- systemd
- snapshot
- reverse proxy/auth
- evaluation
순으로 전환한다.
