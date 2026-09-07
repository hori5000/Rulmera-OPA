#!/usr/bin/env bash
set -euo pipefail

MODEL="${MODEL:-Qwen/Qwen3.8-27B-FP8}"
SERVED_MODEL="${SERVED_MODEL:-qwen3.8-27b}"
PORT="${PORT:-8000}"
MAX_MODEL_LEN="${MAX_MODEL_LEN:-16384}"
GPU_MEMORY_UTIL="${GPU_MEMORY_UTIL:-0.88}"

exec vllm serve "$MODEL"   --served-model-name "$SERVED_MODEL"   --host 0.0.0.0   --port "$PORT"   --tensor-parallel-size 1   --max-model-len "$MAX_MODEL_LEN"   --gpu-memory-utilization "$GPU_MEMORY_UTIL"   --max-num-seqs 1
