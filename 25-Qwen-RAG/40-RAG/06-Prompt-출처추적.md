# Prompt / 출처 추적

## System 원칙
```text
제공된 SOURCES를 우선 근거로 답한다.
근거가 부족하면 부족하다고 한다.
핵심 주장 뒤에 [S#]를 붙인다.
SOURCES에 없는 사실을 확정적으로 만들지 않는다.
```

## Source 포맷
```text
[S1]
file=abc.xlsx
sheet=PLC_SCADA_DB
rows=120-135
text=
...

[S2]
file=manual.pdf
page=74
text=
...
```

## API는 Source를 별도 JSON으로 반환
```json
{
  "answer":"...",
  "sources":[
    {"id":"S1","source_file":"abc.xlsx","sheet":"PLC_SCADA_DB","row_start":120}
  ]
}
```

LLM이 citation 문자를 틀리더라도 서버 source list는 실제 검색결과로 유지된다.

## 근거 없음
score threshold는 임의로 고정하지 말고 평가셋으로 설정한다.
초기에는 “검색 결과 0개”를 명백한 no-evidence로 처리.
