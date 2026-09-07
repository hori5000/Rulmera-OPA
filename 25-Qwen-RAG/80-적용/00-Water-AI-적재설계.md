# Water-AI 적재 설계

## 기본
```yaml
project: Water-AI
site: 중랑 | 광암 | 명장 | 공통
```

## category
- PLC
- SCADA
- DB
- 통신
- 매핑
- WBS
- 과업지시서
- RnR
- 매뉴얼
- 회의록
- 설계
- 산출물

## 핵심 Excel
```yaml
project: Water-AI
site: 중랑
doc_category: PLC_SCADA_DB_MAPPING
source_file: 중랑_PLC_XG5000_SCADA_DB_ETHERFOS_통합매핑_20260903.xlsx
sheet:
row_start:
row_end:
is_current: true
```

## 적재 우선
1. 확정 원본/최신 mapping
2. XG5000
3. SCADA/DB
4. 통신 매뉴얼
5. WBS/과업
6. 회의/결정
7. 구버전 참고

## 검색 우선순위
최신 확정본을 기본 검색하고 과거이력 질문일 때만 구버전을 포함한다.
