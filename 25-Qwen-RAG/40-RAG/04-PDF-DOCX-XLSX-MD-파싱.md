# PDF / DOCX / XLSX / MD 파싱

## PDF
PyMuPDF 사용.
- page 번호 유지
- text layer 우선
- 텍스트 없는 PDF만 OCR

OCR을 모든 PDF에 기본 적용하지 않는다.

## DOCX
python-docx:
- paragraph
- Heading style
- table
를 추출.

## XLSX — 가장 중요
잘못된 방법:
```text
sheet 전체를 하나의 문자열
```

권장:
1. sheet 단위
2. header 탐색
3. 10~30 row block
4. `column=value`
5. sheet/row metadata

`data_only=True`는 저장된 계산값을 읽는다.
수식 자체가 필요하면 별도 pass.

## Markdown
- YAML
- Heading
- path
- 내부링크
를 활용.

## CSV
UTF-8 우선, 국내 legacy 파일은 CP949 fallback 고려.

## 대형 파일
전체를 `list(...)`로 메모리에 올리지 않는 streaming parser가 운영단계에는 필요하다.
실습코드는 구조 가시성을 위해 단순화한다.
