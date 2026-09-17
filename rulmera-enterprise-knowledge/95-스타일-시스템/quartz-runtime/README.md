# Quartz 실전 배치 패키지

이 폴더는 Rulmera OPA Enterprise Knowledge의 실제 Quartz 프로젝트에 복사할 수 있는 배치용 파일이다.

## 적용 대상

`quartz/styles/custom.scss`

Quartz v5 프로젝트의 동일 경로 파일에 병합하거나 교체한다.

## 적용 순서

1. 기존 `quartz/styles/custom.scss` 백업
2. 이 폴더의 `quartz/styles/custom.scss` 내용을 병합
3. Quartz 개발 서버에서 문서/표/콜아웃/Mermaid 렌더 확인
4. 모바일 폭에서 표와 Mermaid 가로 스크롤 확인
5. Print/PDF 저장 시 도식이 페이지 중간에서 잘리지 않는지 확인

## 스타일 목표

- 사용자/화면: 파랑
- 정책/승인: 주황
- 승인 지식/성공: 초록
- 오류/차단: 빨강
- 배포/인프라: 보라
- 일반 연결/보조정보: 회색

> Mermaid 각 도식의 의미색은 Markdown 내부 `classDef`가 우선하고, 이 SCSS는 Quartz 전체 프레임·표·콜아웃·코드·도식 컨테이너의 시각 일관성을 담당한다.
