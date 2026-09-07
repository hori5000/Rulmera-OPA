---
type: obsidian-plugin-guide
project: Water AI
---

# Obsidian WBS 플러그인 설치·사용법

## 필요한 것

이 패키지는 **플러그인 바이너리를 포함하지 않습니다.** 기존 Vault의 `.obsidian` 설정을 덮어쓰지 않기 위해서입니다.

설치할 커뮤니티 플러그인은 2개입니다.

1. **Task Gantt**
2. **Dataview**

Mermaid는 Obsidian 기본 기능이므로 별도 설치가 필요 없습니다.

## 1. Task Gantt 설치

Obsidian:

`설정 → 커뮤니티 플러그인 → 탐색 → Task Gantt → 설치 → 활성화`

설치 후:

- `설정 → Task Gantt`
- 기본/대상 폴더: `20-Water-AI/00-프로젝트관리/WBS`
- 필요하면 하위 폴더 재귀 활성화
- 상태 ID는 다음으로 통일 권장(없는 ID는 Task Gantt 설정에서 추가)
  - `todo` = 미착수
  - `in-progress` = 진행중
  - `done` = 완료
  - `blocked` = 차단/대기

WBS 폴더를 우클릭 → **Open as Gantt** 하면 됩니다.

## 2. Dataview 설치

Obsidian:

`설정 → 커뮤니티 플러그인 → 탐색 → Dataview → 설치 → 활성화`

그 다음:

`설정 → Dataview → Enable JavaScript Queries` 를 **반드시 ON**

이 옵션이 켜져 있어야 `20-WBS-Gantt-자동.md`의 자동 Mermaid 생성이 작동합니다.

## 3. 실제 사용하는 순서

1. [[10-WBS-목록-자동]]에서 전체 WBS 확인
2. `20-Water-AI/00-프로젝트관리/WBS`를 Task Gantt로 열기
3. 일정 막대를 만들거나 이동
4. 진행률/상태/담당/의존관계 입력
5. [[00-PM-대시보드]] 또는 [[20-WBS-Gantt-자동]]으로 돌아오기
6. Dataview/자동 Mermaid가 같은 frontmatter를 다시 읽어 반영

## 4. 먼저 연동 시험

[[98-WBS-3중연동-테스트]]를 여십시오.

`20-Water-AI/00-프로젝트관리/98-연동-예제` 폴더를 Task Gantt로 연 뒤 `샘플-2 Baseline 구축`의 종료일을 드래그해서 변경하면:

- 작업 Markdown의 `end`가 바뀜
- Dataview 표의 종료일이 바뀜
- Mermaid Gantt의 막대 길이도 바뀜

즉 별도의 일정 복사본을 두지 않는 구조입니다.

## 주의

DataviewJS는 JavaScript를 실행합니다. 이 패키지의 자동 Gantt 코드는 **WBS frontmatter를 읽고 화면을 생성하기만 하며 파일을 쓰거나 삭제하지 않습니다.** 코드는 `00-프로젝트관리/scripts/wbs-gantt/view.js`에서 직접 확인할 수 있습니다.


## 현재 Vault 적용상태

- 44개 WBS 모두 `start/end`가 채워져 Task Gantt에서 전체 막대가 보입니다.
- 일정은 초안이므로 막대를 드래그하여 실제 일정으로 조정하십시오.
- 요구사항/산출물/품질/RACI/리스크 표는 WBS frontmatter를 Dataview로 읽습니다.


## 오류가 보일 때

- `Dataview JS queries are disabled` → 코드 오류가 아니라 **JavaScript Queries 옵션이 OFF**인 상태입니다. 위 설정을 ON 합니다.
- `PARSING FAILED` → Dataview 쿼리 문법 오류입니다. 이 수정본에서는 `GROUP BY assignee, assignee_org`처럼 Dataview가 허용하지 않는 다중 GROUP BY를 제거했습니다.
- 설정 변경 후 열린 화면이 그대로면 해당 탭을 다시 열거나 `Ctrl+P → Reload app without saving`을 실행합니다.
