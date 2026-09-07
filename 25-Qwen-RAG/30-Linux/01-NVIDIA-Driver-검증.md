# Linux — NVIDIA Driver 검증

## 기본
```bash
nvidia-smi
nvidia-smi --query-gpu=name,memory.total,driver_version,compute_cap --format=csv
```

## 점유
```bash
watch -n 1 nvidia-smi
```

## module
```bash
lsmod | grep nvidia
```

## Driver 설치 원칙
배포판 package manager 방식 우선. `.run` installer와 apt driver를 뒤섞지 않는다.

## CUDA Toolkit
prebuilt wheel 사용 시 host full toolkit이 항상 필요한 것은 아니다.
중요한 것은 driver와 PyTorch/vLLM runtime compatibility.

## Secure Boot
driver module이 안 올라오면 Secure Boot/모듈 서명도 확인.
