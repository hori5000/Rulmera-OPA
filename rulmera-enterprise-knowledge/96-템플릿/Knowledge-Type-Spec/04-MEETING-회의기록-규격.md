# MEETING — Meeting Record(회의 기록) 규격 v0.7

> [!summary]
> 회의의 논의 내용보다 확정사항, 미결사항, 후속조치를 구조화하여 다른 Knowledge Type으로 승격 가능한 근거를 만든다.

## 필수 항목
- 회의명
- 회의일시
- 참석자
- 주요 논의
- 확정사항
- 미결사항
- Action Items(후속 조치)
- `project_id`
- `security_level`

## 선택 항목
- 회의자료 링크
- 녹취/음성 원문
- 고객사
- 관련 Decision ID

## AI 자동생성 규칙
1. 발언자별 의견을 최종 결정처럼 쓰지 않는다.
2. 확정사항과 제안사항을 구분한다.
3. 담당자·기한이 언급된 항목은 Action Item 후보로 추출한다.
4. 기술결정이 확정된 경우 DECISION 후보 생성을 제안한다.
5. 현장 노하우가 발견되면 EXPERT_NOTE 후보 생성을 제안한다.
