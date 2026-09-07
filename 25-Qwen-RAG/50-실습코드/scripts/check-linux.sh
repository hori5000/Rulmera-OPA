#!/usr/bin/env bash
set -u

echo "===== GPU ====="
nvidia-smi --query-gpu=name,memory.total,driver_version,compute_cap --format=csv || true

echo
echo "===== OS ====="
cat /etc/os-release || true

echo
echo "===== KERNEL ====="
uname -a

echo
echo "===== PYTHON ====="
python3 --version || true

echo
echo "===== DOCKER ====="
docker --version || true
docker compose version || true

echo
echo "===== PORTS ====="
ss -lntp 2>/dev/null | grep -E ':8000|:8100|:6333|:6334' || true

echo
echo "===== DISK ====="
df -h .
