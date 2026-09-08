#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB="$ROOT/.web"
WORK="$WEB/.cf-quartz"
QUARTZ_REPO="https://github.com/jackyzha0/quartz.git"
QUARTZ_COMMIT="d25a6eabf96751ffca56f8a8139272def7a65041"

echo "[1/5] Prepare Quartz v4"
rm -rf "$WORK"
mkdir -p "$WORK"
git -C "$WORK" init -q
git -C "$WORK" remote add origin "$QUARTZ_REPO"
git -C "$WORK" fetch -q --depth 1 origin "$QUARTZ_COMMIT"
git -C "$WORK" checkout -q --detach FETCH_HEAD

echo "[2/5] Install Quartz dependencies"
(cd "$WORK" && npm ci --no-audit --no-fund)

echo "[3/5] Apply Water-AI Quartz config"
cp "$WEB/quartz.config.ts" "$WORK/quartz.config.ts"

echo "[4/5] Export approved Markdown + static Dataview/Gantt"
node "$WEB/export.mjs" \
  --source "$ROOT" \
  --dest "$WORK/content" \
  --mode production

echo "[5/5] Build Quartz"
(cd "$WORK" && npx quartz build)

rm -rf "$ROOT/public"
cp -a "$WORK/public" "$ROOT/public"

# Generate customer-facing change feed and install the popup/notification UI.
node "$WEB/generate-updates.mjs" \
  --source "$ROOT" \
  --dest "$ROOT/public/static/project-updates.json" \
  --state "$WEB/update-state.json"
cat "$WEB/rulmera-updates.js" >> "$ROOT/public/postscript.js"

echo "Cloudflare output: $ROOT/public"
