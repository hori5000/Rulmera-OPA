# Windows/WSL — vLLM + Qwen 설치/기동

> 아래는 WSL Ubuntu에서 실행한다.

## 1. 디렉터리
```bash
mkdir -p ~/qwen-rag/{llm,rag,data,logs,backups}
cd ~/qwen-rag/llm
```

## 2. uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
uv --version
```

## 3. LLM venv
```bash
uv venv --python 3.12 .venv-llm
source .venv-llm/bin/activate
python --version
```

## 4. vLLM
```bash
uv pip install -U vllm
vllm --version
```

## 5. 기동
```bash
export HF_HOME="$HOME/.cache/huggingface"

vllm serve "Qwen/Qwen3.8-27B-FP8"   --served-model-name qwen3.8-27b   --host 0.0.0.0   --port 8000   --tensor-parallel-size 1   --max-model-len 16384   --gpu-memory-utilization 0.88   --max-num-seqs 1
```

## 6. 모델 목록
다른 WSL 터미널:
```bash
curl http://127.0.0.1:8000/v1/models
```

## 7. 한국어
```bash
curl http://127.0.0.1:8000/v1/chat/completions   -H "Content-Type: application/json"   -d '{"model":"qwen3.8-27b","messages":[{"role":"user","content":"한국어로 한 문장만 답해. API 정상 여부를 확인한다."}],"temperature":0.7,"max_tokens":128}'
```

## 8. OOM
한 번에 하나만 변경:
- `16384 → 8192`
- `0.88 → 0.84`
- `max-num-seqs=1` 유지

CUDA graph 계열 문제가 의심되면:
```text
--enforce-eager
```

## 9. 성공 기록
```bash
vllm --version
python -c "import torch; print(torch.__version__, torch.version.cuda)"
nvidia-smi
```
