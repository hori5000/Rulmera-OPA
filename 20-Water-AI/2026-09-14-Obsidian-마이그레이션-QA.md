---
title: 2026-09-14 Obsidian 마이그레이션 QA
status: passed
last_updated: 2026-09-14
web_exclude: true
---

# 2026-09-14 Obsidian 마이그레이션 QA

## 결과

- Source QA: **PASS**
- 변경량: **수정 33 / 추가 6** (기존 Vault 대비)
- Markdown: **166개** 검사
- YAML Frontmatter: **154개 파싱 / 오류 0**
- 중복 `doc_id`: **0**
- Markdown code fence 불균형: **0**
- Wiki Link: **971개 검사 / Broken 0**
- CSV: **14개 / 구조 오류 0**
- JSON: **5개 / 파싱 오류 0**
- `#Uxxxx` 인코딩 잔존 파일명: **0**
- A2 PILOT 미확보 / M203 Open 4개 / Rule Book v1.0 활성문구 잔존: **0**
- M203 Signal Master 필수 Canonical Signal 누락: **0**
- Timer 내부주소↔SCADA주소 분리/부분확정 처리: **PASS**

## Web 게시 준비 검증

- `.web/export.mjs` production export: **PASS**
- 공개 Markdown: **157개**
- Dataview 정적화 대상: **12개**
- Demo WBS `web_exclude`: **적용**
- Release ID: `2026-09-14-m203-signal-master-migration-v8`
- 기존 `update-state` Release ID: `2026-09-11-source-db-design-guide-v7`
- 신규 Release Pending: **PASS**
- Release popup feed 모의생성: **PASS** / 변경 7건

> `update-state.json`은 **의도적으로 이전 Release ID를 유지**한다. 그래야 실제 `PUBLISH-RULMERA-OPA.ps1` 실행 시 신규 Release popup이 1회 생성된다. QA 과정에서는 복제 state 파일로만 feed를 생성했다.

## Web 전체 Quartz Build

이 실행환경에서는 `github.com` DNS 접근이 차단되어 Quartz 원격 소스를 가져오는 전체 Build까지 실행할 수 없었다. 대신 **실제 Publish 전에 수행되는 Markdown Export와 Release Feed 생성은 동일 스크립트로 통과**했다. 반환 Vault의 `.web/release-update.json`과 기존 `.web/update-state.json` 상태를 유지했으므로 사용자 환경에서 기존 게시 절차를 실행하면 신규 Release로 처리된다.

## 주요 기준선

1. `M203 Signal Master v0.9 QA/Freeze` 선행
2. 전체 CLD Batch → Master Dataset v0.1 → Baseline
3. XGBoost/LightGBM 머신러닝 회귀모델 비교
4. 제약조건 기반 최적화 → Shadow Replay
5. PLC Direct Collector와 Simulator Framework는 병행
6. 기존 SCADA/Logger/MySQL은 과거이력·교차검증 계층
7. Parquet/DuckDB는 로컬 분석공간이며 공식 DB 선택과 분리
