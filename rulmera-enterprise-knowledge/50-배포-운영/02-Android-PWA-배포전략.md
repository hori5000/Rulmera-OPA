---
title: Android/PWA 배포전략
doc_path: 50-배포-운영/02-Android-PWA-배포전략.md
doc_category: 배포운영
style_version: rulmera-v0.5
render_profiles: quartz, obsidian, ppt
last_updated: 2026-09-17
---
# Android/PWA 배포전략 v0.5

> [!summary]
> 이 문서는 배포 방식, 운영 절차, 프로파일별 차이를 정리한 운영 기준 문서다.

> [!info]
> 표기 기준: 전문 용어는 가능하면 `원어(알기 쉬운 설명)` 형식을 사용하고, 공통 기준은 [[20-설계/00-용어-스타일-가이드]]를 따른다.

## 1차
브라우저 + PWA로 기능을 먼저 완성한다. Android에서도 Chrome/PWA로 즉시 검증 가능하다.

## 2차
동일 Web build를 Capacitor로 패키징한다.

```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#F8FAFC","primaryTextColor":"#1F2937","primaryBorderColor":"#64748B","lineColor":"#64748B","secondaryColor":"#EAF4FF","tertiaryColor":"#EAFBF2","clusterBkg":"#F8FAFC","clusterBorder":"#CBD5E1","fontSize":"15px"}} }%%
flowchart LR
  SRC[React Source 1개] --> BUILD[Vite Build]
  BUILD --> WEB[Web Server]
  BUILD --> PWA[PWA]
  BUILD --> CAP[Capacitor]
  CAP --> APK[Android APK/AAB]
```

## Android Native 기능은 최소화
- 파일 선택/업로드
- 다운로드/열기
- Push notification(승인대기 등, 필요 시)
- 카메라/사진 첨부(현장지식 수집 시)
- 안전한 토큰 저장

## 배포 후보
- 사내 APK sideload
- MDM
- Google Play 비공개/내부테스트

PoC에서는 **APK가 목적이 아니라 동일 UI/동일 API가 Android에서 문제없이 동작하는지**를 먼저 확인한다.
