# Linux 문제해결

## vLLM 즉시 종료
```bash
journalctl -u qwen-vllm -n 200 --no-pager
dmesg -T | tail -100
nvidia-smi
```

## OOM
1. 다른 GPU process 확인
2. 16K→8K
3. 0.88→0.84
4. max-num-seqs=1
5. embedding/reranker CPU

## library
```bash
python -c "import torch; print(torch.__version__, torch.version.cuda, torch.cuda.is_available())"
```

## Docker GPU
```bash
docker info
nvidia-ctk --version
```

## disk
```bash
df -h
du -sh ~/.cache/huggingface ~/.cache/vllm 2>/dev/null
docker system df
```

## port
```bash
sudo ss -lntp | grep -E ':8000|:8100|:6333|:6334'
```
