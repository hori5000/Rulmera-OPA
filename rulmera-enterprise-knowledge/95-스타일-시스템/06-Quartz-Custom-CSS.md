---
title: Quartz Custom CSS
doc_path: 95-스타일-시스템/06-Quartz-Custom-CSS.md
doc_category: 스타일시스템
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# Quartz Custom CSS v0.5

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
  --rulmera-soft-blue: #EAF4FF;
  --rulmera-soft-green: #EAFBF2;
  --rulmera-soft-orange: #FFF6E5;
  --rulmera-soft-red: #FDECEC;
}

article h1, article h2, article h3 {
  letter-spacing: -0.02em;
}

.callout[data-callout="summary"] {
  background: var(--rulmera-soft-blue);
  border-left: 4px solid var(--rulmera-blue);
}

.callout[data-callout="important"] {
  background: var(--rulmera-soft-orange);
  border-left: 4px solid var(--rulmera-orange);
}

.callout[data-callout="warning"] {
  background: var(--rulmera-soft-red);
  border-left: 4px solid var(--rulmera-red);
}

table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #D7DEE7;
  padding: 0.55rem 0.7rem;
}

th {
  background: #F8FAFC;
}

.mermaid {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  background: #FFFFFF;
  overflow-x: auto;
}

@media print {
  .mermaid {
    break-inside: avoid;
    border-color: #CBD5E1;
  }
}
```
