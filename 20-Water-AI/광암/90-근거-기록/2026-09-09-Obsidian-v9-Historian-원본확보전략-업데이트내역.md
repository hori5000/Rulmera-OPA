---
doc_id: GW-CHANGE-OBS-v9-20260909
title: 2026-09-09 Obsidian v9 Historian 원본확보 전략 반영
plant: 광암
category: 변경이력
status: complete
recorded_date: 2026-09-09
---

# Obsidian v9 업데이트 내역

## 변경 배경

현장 POS11에서 장기간 Historian SQL Export를 수행할 시간이 충분하지 않을 수 있다는 작업 제약을 반영했다.

## 전략 변경

기존 우선안:

```text
POS11 Runtime.dbo.History에서 AI 대상 Tag 장기 Export
```

v9 우선안:

```text
StorageLocation / StorageNode 확인
→ 실제 History Storage Path 확인
→ 총 GB/TB / 파일수 / 디스크 여유공간 측정
→ 용량 감당 가능 시 원본 Storage 인수 우선 검토
→ 불가능할 때 History SQL Export로 전환
```

## 반영한 핵심 판단

### 자료로 확인됨

- `Runtime.dbo.History` 실제 값 조회 가능
- Runtime DB에 `StorageLocation`, `StorageNode` 존재
- Runtime BAK 자체에는 장기간 공정값 본체가 포함되지 않음
- 과거 Historian Export에 `D:\Historian\Data\Circular / Buffer / Permanent` 경로 근거 존재

### 합리적 추정

- 실제 장기 공정값은 별도 Historian History Storage 파일영역에 존재할 가능성이 높음

### 추가 확인 필요

- 2026 현재 `StorageLocation.Path`
- 실제 총용량/파일수
- 보존기간
- 운영 중 Storage의 정합성 있는 백업/복제 방법

## 운영 안전 원칙

- 경로/용량 확인은 읽기 방식으로 우선 수행
- Historian/SQL 서비스 임의 중지 금지
- 운영폴더 삭제/이동/압축 금지
- 실제 원본 복사는 정식 Backup/Snapshot 또는 현장 승인된 방식 우선

## 수정 문서

- `00-광암-홈.md`
- `20-현장-시스템/03-광암-실제-연결-확인-파일-및-설정위치.md`
- `30-데이터-분석/06-광암-Historian-Runtime-DB-분석-및-AI학습데이터-확보판정.md`

## 신규 문서

- `30-데이터-분석/07-광암-Historian-현장-원본확보-절차.md`
- `90-근거-기록/2026-09-09-Obsidian-v9-Historian-원본확보전략-업데이트내역.md`
