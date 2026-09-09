---
doc_id: GW-DATA-007
title: 광암 Historian 현장 원본확보 절차
plant: 광암
category: 데이터확보
status: action-required
revision: 1.1
last_updated: 2026-09-09
source_refs:
  - POS11 Runtime History 실조회 사진
  - Runtime.bak / backup2.bak 분석
  - 2022 Historian Export 경로정보
---

# 광암 Historian 현장 원본확보 절차

## 1. 목적

현장 체류시간이 짧은 조건에서 **광암 AI 학습용 장기간 공정 Historian 데이터를 최대한 빠르고 안전하게 확보**하기 위한 절차다.

현재 가장 현실적인 우선안은:

```text
History Storage 위치 확인
→ 실제 용량 확인
→ 이동매체 수용 가능 여부 판단
→ 가능하면 원본 Storage 인수
→ 불가능하면 SQL Export로 전환
```

---

## 2. 현재 확인된 것

### 자료로 확인된 내용

- Historian 서버/SQL 노드: `POS11`
- Database: `Runtime`
- `Runtime.dbo.History`에서 실제 `TagName / DateTime / vValue / Quality` 값 조회 확인
- Runtime DB에 `StorageLocation`, `StorageNode`, `Tag`, `AnalogTag`, `History` 계열 View 존재
- `Runtime.bak`/`backup2.bak`에는 장기간 공정값 본체가 포함되지 않음
- **2026 현재 POS11 `StorageLocation` 직접 조회로 실제 경로 4개 확인**: `D:\Historian\Data\Circular`, `R:\Overflow\Data`, `D:\Historian\Data\Buffer`, `D:\Historian\Data\Permanent`

### 합리적 추정

- 실제 장기간 공정값은 POS11의 Wonderware Historian History Storage 파일영역에 존재하는 구조로 판단
- `Runtime.dbo.History`는 해당 Storage를 조회하는 SQL 인터페이스 역할로 판단

### 추가 확인 필요

- 4개 실제 History Storage 총용량과 파일수
- `R:`의 물리적 정체(로컬/매핑/별도 Storage)
- 저장 데이터의 최초/최종 보존기간
- 운영 중인 파일의 안전한 복사/백업 절차

---

## 3. 현장에서 1단계 — 저장경로 찾기

SSMS에서:

```sql
USE Runtime;
SELECT * FROM dbo.StorageLocation;
SELECT * FROM dbo.StorageNode;
```

반드시 남길 것:

- 결과 Grid 사진
- 가능하면 Results to File/CSV
- `Path` 값
- StorageType
- StorageNodeKey/Node 정보
- MaxMBSize / MaxAgeThreshold 등 보존설정

### 2026-09-09 현재 조회 결과

| StorageType | StorageNodeKey | Path |
|---:|---:|---|
| 1 | 1 | `D:\Historian\Data\Circular` |
| 2 | 1 | `R:\Overflow\Data` |
| 3 | 1 | `D:\Historian\Data\Buffer` |
| 4 | 1 | `D:\Historian\Data\Permanent` |

`StorageNodeKey=1`의 `ComputerName=POS11`도 직접 확인됐다.

근거: [[../90-근거-기록/2026-09-09-POS11-StorageLocation-StorageNode-실조회-사진근거]]

---

## 4. 현장에서 2단계 — 총용량과 파일수 확인

현재 확인된 4개 경로를 직접 측정한다:

```powershell
$Paths = @(
    "D:\Historian\Data\Circular",
    "R:\Overflow\Data",
    "D:\Historian\Data\Buffer",
    "D:\Historian\Data\Permanent"
)

foreach ($p in $Paths) {
    if (Test-Path -LiteralPath $p) {
        $files = Get-ChildItem -LiteralPath $p -File -Recurse -ErrorAction SilentlyContinue
        $bytes = ($files | Measure-Object Length -Sum).Sum
        [PSCustomObject]@{
            Path  = $p
            GB    = [math]::Round($bytes/1GB,2)
            Files = $files.Count
        }
    }
}
```

---

## 5. 현장에서 3단계 — 디스크 및 이동매체 판단

POS11 로컬 드라이브 상태:

```powershell
Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
Select-Object DeviceID,
@{N="TotalGB";E={[math]::Round($_.Size/1GB,1)}},
@{N="FreeGB";E={[math]::Round($_.FreeSpace/1GB,1)}}
```

외장 SSD가 연결되면 해당 드라이브의 `FreeGB`도 같이 확인한다.

판단 예:

| History Storage | 권장 대응 |
|---:|---|
| 수십 GB | 외장 SSD로 전체 인수 검토 |
| 수백 GB | 1TB 이상 SSD 준비 후 전체 인수 검토 |
| 1TB 이상 | 현장 복사시간/매체를 고려하여 선택 인수 또는 Export 검토 |
| 수 TB | 현장 전체복사보다 별도 백업매체/기간 분할 Export 검토 |

> 위 용량구간은 작업 준비를 위한 실무 판단 예시이며, 광암 실제 용량은 반드시 현장에서 측정한다.

---

## 6. 무엇을 가져와야 하는가

### 원본 Storage 인수 가능 시

최소 세트:

```text
1. Historian History Storage 전체
2. 최신 Runtime DB 백업
3. Holding DB 백업
4. StorageLocation / StorageNode 조회 결과
5. Historian 버전 정보
```

가능하면 추가:

```text
- IOServer / Topic 정보
- Historian 설정 파일
- Storage 폴더 생성/수정시간 포함 파일목록
- 전체 파일 Hash Manifest
```

### 전체 인수가 불가능할 때

`Runtime.dbo.History`에서 필요한 Tag와 기간을 나눠 Export한다.

AI용 기본 컬럼:

```text
TagName
DateTime
Value 또는 vValue
Quality
```

---

## 7. 주의 — 운영 서버에서 하면 안 되는 것

다음은 **현장 승인 없이 수행하지 않는다.**

- Historian 서비스 임의 중지
- SQL Server 서비스 중지
- Storage 파일 삭제/이동
- 운영 폴더에서 압축 프로그램으로 대규모 ZIP 생성
- 운영 디스크에 대용량 Export 결과 저장
- 파일 잠금을 무시하는 강제 복사 도구 사용

이유:

광암은 운영 중인 정수장 시스템이므로 AI 데이터 확보보다 **운영 안정성**이 우선이다.

---

## 8. 권장 현장 체크리스트

- [ ] `StorageLocation` 조회
- [ ] `StorageNode` 조회
- [ ] 실제 Path 확인
- [ ] Path 존재 여부 탐색기/PowerShell 확인
- [ ] 전체 GB/TB 확인
- [ ] 파일 수 확인
- [ ] POS11 디스크 총/여유공간 확인
- [ ] 외장 SSD 여유공간 확인
- [ ] Historian 버전 사진/정보 확보
- [ ] 운영 담당자에게 정식 Backup/Snapshot 가능 여부 확인
- [ ] 원본 복사 허용 여부 확인
- [ ] 가능하면 최신 Runtime BAK 재백업
- [ ] 복사 후 파일 수/총용량 비교

---

## 9. 현재 우선순위

```text
1. **StorageLocation.Path 현재값 확인 완료**
2. 4개 History Storage 용량/파일수 확인
3. `R:` 정체 확인
4. 원본 인수 가능 여부 판단
5. 가능하면 Storage + Runtime 세트 확보
6. 대표 Tag 소량 History Query 검증
7. AI용 대량 Export는 사무실에서 Tag/기간을 설계하여 수행
8. Master DB 변환/품질진단
```

이 절차는 **AI 모델 개발보다 선행**한다. 장기간 운전데이터의 실제 확보 여부가 확정되지 않은 상태에서 학습기법을 최종 결정하지 않는다.


## 10. AI 학습용 추출 방식

원본을 확보하더라도 AI 학습에 직접 사용할 최종형은 `Runtime.dbo.History` Query Export다. 연속형 수질/유량/약품/전력은 `Cyclic` 정규주기 추출을, RUN/STOP·AUTO/MANUAL·Fault 같은 상태값은 변화점이 보존되는 `Full/상태이력` 방식 검토를 우선한다.

상세: [[08-광암-Historian-AI학습데이터-추출전략]]
