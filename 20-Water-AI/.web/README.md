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
