# Windows 권장 구성

## 권장 구조
```text
Windows
├─ NVIDIA Windows Driver
├─ WSL2
│  └─ Ubuntu
│     ├─ vLLM
│     ├─ Qwen
│     └─ RAG API
└─ Docker Desktop(선택)
   └─ Qdrant
```

## 왜 WSL2인가
vLLM은 Windows를 네이티브 표준 지원하지 않는다. 공식 안내도 Windows에서는 WSL을 사용하도록 한다.

## NVIDIA에서 가장 중요한 것
**WSL 안에 Linux NVIDIA display driver를 따로 설치하지 않는다.**

Windows NVIDIA driver가 WSL에 CUDA 기능을 제공한다.

CUDA Toolkit이 필요할 때도 driver를 포함해 덮어쓰는 패키지를 피하고 WSL용 toolkit 또는 `cuda-toolkit-*` 계열을 사용한다.

## WSL에 둘 것
- Python
- uv
- vLLM
- Hugging Face cache
- RAG code/venv

## Windows 드라이브 자료
`C:\WORK\자료`는 WSL에서 `/mnt/c/WORK/자료`.
단, model cache/venv처럼 Linux I/O가 많은 경로는 `/home/<user>` 권장.
