# Water-AI Web Publish

## 공개 범위

`Rulmera-OPA/20-Water-AI` 아래의 **모든 Markdown 문서가 웹 공개 대상**이다.

외부 원본파일은 이미 Git에서 제외하므로 웹에도 포함되지 않는다.

### 예외적으로 숨겨야 할 때만

문서 Frontmatter에 다음을 추가한다.

```yaml
---
web_exclude: true
---
```

`web_exclude`가 없으면 공개가 기본값이다.

## Dataview

Obsidian Dataview/DataviewJS를 웹에서 실행하지 않는다.

웹 빌드 시 다음을 정적 Markdown/Mermaid로 생성한다.

- PM 대시보드
- WBS 목록
- 담당자 배분
- 요구사항 추적표
- RACI
- 리스크
- 산출물
- 품질/인수기준
- WBS 통합추적
- Mermaid Gantt

## 외부파일

PDF/XLSX/DOCX/PPTX/HWP/HWPX/ZIP/PLC/SCADA/DB 원본은 Git/Web에 올리지 않는다.

## 고객 변경 알림 팝업

게시 빌드 시 `.web/generate-updates.mjs`가 공개 Markdown의 SHA-256 상태를 이전 빌드와 비교하여
`static/project-updates.json`을 생성한다. `.web/rulmera-updates.js`는 Quartz의 `postscript.js`에 자동 삽입된다.

동작:

- 새/수정/삭제 문서가 있으면 고객 접속 시 변경사항 팝업 표시
- 같은 브라우저에서는 동일 버전 팝업을 **확인 후 1회만** 표시
- `나중에 보기`는 현재 브라우저 세션에서만 숨김
- 우측 상단 `🔔` 알림센터에서 현재 배포의 변경사항을 다시 확인 가능
- 확인 버전은 브라우저 `localStorage`에 저장하므로 사용자별 서버 DB는 필요 없음
- 자동 생성 문서(`auto_generated: true`)와 `web_exclude: true` 문서는 변경 판정에서 제외

변경 비교 기준 상태는 `.web/update-state.json`에 저장한다. 이 파일은 다음 게시 시 비교 기준으로 사용하므로 삭제하지 않는다.


## 배포별 주요 변경사항 고정 표시

`.web/release-update.json`이 있으면 해당 `release_id`를 아직 게시하지 않은 첫 빌드에서 자동 SHA 비교보다 우선하여 사람이 읽기 쉬운 주요 변경사항을 팝업에 표시합니다.

- 같은 `release_id`는 한 번 게시된 뒤 반복해서 신규 팝업으로 생성되지 않습니다.
- 다음 주요 배포에서는 `release_id`를 변경하고 `changes`를 갱신합니다.
- 일반 문서 수정은 release가 새로 대기 중이지 않을 때 기존 SHA-256 비교 방식으로 계속 감지됩니다.
