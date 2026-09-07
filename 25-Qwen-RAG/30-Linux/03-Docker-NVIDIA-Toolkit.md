# Linux — Docker / NVIDIA Container Toolkit

## Qdrant만 Docker
Qdrant는 GPU가 필요 없으므로 NVIDIA Container Toolkit 불필요.

## vLLM Docker
GPU 전달이 필요하므로 NVIDIA Container Toolkit 필요.

설치 후 일반적 설정:
```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

GPU container test:
```bash
docker run --rm --gpus all <실제-존재하는-CUDA-base-image> nvidia-smi
```

## 공식 vLLM Docker
```bash
docker run --rm --gpus all   -v ~/.cache/huggingface:/root/.cache/huggingface   -v vllm-cache:/root/.cache/vllm   -p 8000:8000   --ipc=host   vllm/vllm-openai:latest   --model Qwen/Qwen3.8-27B-FP8   --served-model-name qwen3.8-27b   --max-model-len 16384   --gpu-memory-utilization 0.88   --max-num-seqs 1
```

## Native vs Docker
초기 디버깅은 native가 투명하고, 운영/롤백은 Docker가 편할 수 있다.
