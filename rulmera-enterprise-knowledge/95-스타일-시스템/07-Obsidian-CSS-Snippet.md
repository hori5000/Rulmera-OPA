---
title: Obsidian CSS Snippet
doc_path: 95-스타일-시스템/07-Obsidian-CSS-Snippet.md
doc_category: 스타일시스템
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# Obsidian CSS Snippet v0.5

> [!summary]
> 이 문서는 문서 표현, 도식 스타일, CSS 적용 기준을 통일하기 위한 스타일 시스템 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

```css
:root {
  --rulmera-blue: #2F80ED;
  --rulmera-green: #27AE60;
  --rulmera-orange: #F2994A;
  --rulmera-red: #EB5757;
  --rulmera-purple: #6C5CE7;
  --rulmera-gray: #64748B;
}

.markdown-preview-view .callout[data-callout="summary"] {
  background: #EAF4FF;
  border-left: 4px solid var(--rulmera-blue);
}

.markdown-preview-view .callout[data-callout="important"] {
  background: #FFF6E5;
  border-left: 4px solid var(--rulmera-orange);
}

.markdown-preview-view .callout[data-callout="warning"] {
  background: #FDECEC;
  border-left: 4px solid var(--rulmera-red);
}

.markdown-preview-view table {
  width: 100%;
  border-collapse: collapse;
}

.markdown-preview-view th,
.markdown-preview-view td {
  border: 1px solid #D7DEE7;
  padding: 0.55rem 0.7rem;
}

.markdown-preview-view .mermaid {
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  background: #FFFFFF;
}
```
