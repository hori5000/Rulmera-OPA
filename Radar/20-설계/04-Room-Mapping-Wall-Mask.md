# Room Mapping / Wall Mask

## 목적
Radar가 감지한 좌표가 물리적으로 가능한 공간인지 판단하고, 벽/반사 뒤에서 생기는 Ghost를 줄인다.

## Room Model
```text
Room
 ├─ floor polygon
 ├─ walls[]
 ├─ doors/openings[]
 ├─ static obstacles[]
 ├─ valid zones[]
 ├─ ignore zones[]
 └─ sensor poses[]
```

## 단계
### 1단계 — 수동 Room Map
초기에는 실측 도면/좌표로 벽과 유효영역을 입력한다.

### 2단계 — 자동 Wall 후보
사람이 없는 시간대/장시간 로그에서 반복적으로 나타나는 반사 경계와 관측 불가능 영역을 통계화한다.

### 3단계 — 자동 보정
실제 이동 Track이 자주 통과하는 곳은 통로/문 후보, 물리적으로 반복 튀는 곳은 반사 후보로 분류한다.

## Wall Mask Score
- 벽 바깥 좌표
- 벽을 순간 관통하는 비현실적 Track
- 동일 대칭 위치에 반복 발생
- 특정 센서에서만 발생
- 움직임이 실제 사람 Track과 연동된 반사점

이 점수는 삭제 여부를 단독 결정하기보다 Ghost score의 입력으로 사용한다.
