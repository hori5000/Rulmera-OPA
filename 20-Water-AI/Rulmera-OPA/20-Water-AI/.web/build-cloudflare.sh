#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/.web-public"

test -d "$PUBLIC"
test -f "$PUBLIC/index.html"

echo "[OK] committed static site ready: .web-public"
echo "Cloudflare should serve .web-public directly."
echo "No Quartz rebuild is required on Cloudflare."
