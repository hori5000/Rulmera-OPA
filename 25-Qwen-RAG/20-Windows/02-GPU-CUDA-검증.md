# Windows/WSL — GPU / CUDA 검증

## Windows
```powershell
nvidia-smi
Get-CimInstance Win32_VideoController | Select Name,DriverVersion
```

## WSL
```bash
nvidia-smi
uname -a
cat /etc/os-release
python3 --version
```

## vLLM 설치 후 PyTorch 검증
```bash
python - <<'PY'
import torch
print("torch:", torch.__version__)
print("cuda available:", torch.cuda.is_available())
print("runtime cuda:", torch.version.cuda)
if torch.cuda.is_available():
    print("gpu:", torch.cuda.get_device_name(0))
    print("capability:", torch.cuda.get_device_capability(0))
PY
```

정상 핵심:
```text
cuda available: True
gpu: NVIDIA RTX A6000
```

## Windows에서는 되고 WSL에서는 안 됨
PowerShell:
```powershell
wsl --update
wsl --shutdown
```
최신 Windows NVIDIA driver 확인 후 재실행.

## `nvcc`가 없음
prebuilt vLLM wheel을 사용하는 1차 단계에서는 `nvcc` 존재 자체가 성공 조건이 아니다.
driver/runtime/toolkit/compiler를 구분한다.
