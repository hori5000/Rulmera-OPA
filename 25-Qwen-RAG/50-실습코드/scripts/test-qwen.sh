#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:8000}"

curl -s "$BASE/v1/models"
echo

curl -s "$BASE/v1/chat/completions"   -H "Content-Type: application/json"   -d '{"model":"qwen3.8-27b","messages":[{"role":"user","content":"한국어로 한 줄만 답해. API가 정상인지 확인한다."}],"temperature":0.7,"max_tokens":64}'
echo
