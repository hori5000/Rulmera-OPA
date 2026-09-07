# Chunk / Metadata

## Chunk가 너무 크면
- 관련 없는 내용이 섞임
- similarity가 흐려짐
- prompt 낭비

## 너무 작으면
- 문맥 단절
- Excel header와 value 분리
- 제목과 본문 분리

## 1차 일반기준
- 1,500~2,500 문자
- overlap 150~300 문자

정답은 고정값이 아니다. 평가셋으로 결정한다.

## Excel
행 그룹으로 묶고 매 Chunk마다 Header를 반복한다.

```text
Columns: PLC_ADDR | SCADA_TAG | DB_FIELD
Row 120: PLC_ADDR=...
...
```

## 필수 Metadata
```yaml
project:
site:
source_file:
source_path:
source_type:
source_hash:
page:
sheet:
row_start:
row_end:
heading:
chunk_index:
is_current:
text:
```

## Stable Point ID
`source_hash + locator + chunk_index`를 UUID5 등으로 만들면 같은 파일 재적재 때 불필요한 중복 point를 줄일 수 있다.
