---
title: Quartz 적용 가이드
doc_path: 95-스타일-시스템/03-Quartz-적용-가이드.md
doc_category: 스타일시스템
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# Quartz 적용 가이드 v0.5

> [!summary]
> 이 문서는 문서 표현, 도식 스타일, CSS 적용 기준을 통일하기 위한 스타일 시스템 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

## 적용 파일
- CSS: [[95-스타일-시스템/06-Quartz-Custom-CSS]]
- Mermaid 기준: [[95-스타일-시스템/02-Mermaid-공통-테마]]

## 적용 위치 예시
- Quartz 프로젝트의 `quartz/styles/custom.scss` 또는 사용자 정의 CSS 파일에 반영
- Mermaid 기본 렌더 스타일이 있다면 본 CSS와 충돌 여부 확인

## 기대 효과
- 표와 콜아웃 가독성 향상
- Mermaid 도식 여백 확보
- 인쇄/PDF 저장 시 박스와 제목 정렬 개선
