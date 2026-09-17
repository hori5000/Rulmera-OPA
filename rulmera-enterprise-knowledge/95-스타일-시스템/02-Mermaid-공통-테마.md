---
title: Mermaid 공통 테마
doc_path: 95-스타일-시스템/02-Mermaid-공통-테마.md
doc_category: 스타일시스템
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# Mermaid 공통 테마 v0.5

> [!summary]
> 이 문서는 문서 표현, 도식 스타일, CSS 적용 기준을 통일하기 위한 스타일 시스템 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

## 공통 init 블록
```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#F8FAFC","primaryTextColor":"#1F2937","primaryBorderColor":"#64748B","lineColor":"#64748B","secondaryColor":"#EAF4FF","tertiaryColor":"#EAFBF2","clusterBkg":"#F8FAFC","clusterBorder":"#CBD5E1","fontSize":"15px"}} }%%
flowchart LR
  A[User / 사용자] --> B[Policy / 정책]
  B --> C[Knowledge / 지식]
  C --> D[Answer / 답변]
```

## 권장 classDef 예시
```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#F8FAFC","primaryTextColor":"#1F2937","primaryBorderColor":"#64748B","lineColor":"#64748B","secondaryColor":"#EAF4FF","tertiaryColor":"#EAFBF2","clusterBkg":"#F8FAFC","clusterBorder":"#CBD5E1","fontSize":"15px"}} }%%
flowchart LR
  A[사용자] --> B[정책]
  B --> C[지식]
  B --> D[차단]

  classDef user fill:#EAF4FF,stroke:#2F80ED,stroke-width:2px,color:#102A43;
  classDef policy fill:#FFF6E5,stroke:#F2994A,stroke-width:2px,color:#5C3B00;
  classDef knowledge fill:#EAFBF2,stroke:#27AE60,stroke-width:2px,color:#114B2E;
  classDef alert fill:#FDECEC,stroke:#EB5757,stroke-width:2px,color:#7A1F1F;

  class A user;
  class B policy;
  class C knowledge;
  class D alert;
```
