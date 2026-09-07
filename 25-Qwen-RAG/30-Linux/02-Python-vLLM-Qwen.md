# Linux — Python / vLLM / Qwen

```bash
sudo apt update
sudo apt install -y git curl wget ca-certificates build-essential python3 python3-venv python3-pip

mkdir -p ~/qwen-rag/{llm,rag,data,logs,backups}
cd ~/qwen-rag/llm

curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc

uv venv --python 3.12 .venv-llm
source .venv-llm/bin/activate

uv pip install -U vllm
vllm --version
```

PyTorch:
```bash
python - <<'PY'
import torch
print(torch.__version__)
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else "NO CUDA")
PY
```

Qwen:
```bash
vllm serve "Qwen/Qwen3.8-27B-FP8"   --served-model-name qwen3.8-27b   --host 127.0.0.1   --port 8000   --max-model-len 16384   --gpu-memory-utilization 0.88   --tensor-parallel-size 1   --max-num-seqs 1
```

확인:
```bash
curl http://127.0.0.1:8000/v1/models
```

기록:
```bash
uv pip freeze > requirements-installed.txt
nvidia-smi > nvidia-smi.txt
```
