# Windows/WSL 문제해결

## WSL GPU 없음
```powershell
wsl --update
wsl --shutdown
```
Windows `nvidia-smi` 확인 → Ubuntu 재실행.

## 경로
```text
C:\WORK\PROJECT
→ /mnt/c/WORK/PROJECT
```
한글/공백 경로는 따옴표.

## Docker 충돌
```bash
which docker
docker context ls
docker info
```

## WSL RAM
`.wslconfig` 조정 후:
```powershell
wsl --shutdown
```

## Port
```bash
ss -lntp | grep -E ':8000|:8100|:6333|:6334'
```

## vLLM이 느리거나 죽음
- GPU 점유
- OOM
- context
- FP8 kernel log
- compile 오류
순으로 본다.
