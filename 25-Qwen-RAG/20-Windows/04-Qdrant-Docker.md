# Windows — Qdrant Docker

## Docker Desktop 경로
PowerShell:
```powershell
docker version
docker compose version
```

`50-실습코드` 폴더에서:
```powershell
docker compose -f docker-compose.qdrant.yml up -d
docker ps
```

브라우저:
```text
http://localhost:6333/dashboard
```

REST:
```powershell
curl http://127.0.0.1:6333/collections
```

## Docker Desktop vs WSL Docker
둘 다 동시에 설치하면 `docker context`/daemon이 헷갈릴 수 있다.
하나를 주 경로로 선택한다.

## Windows volume
Qdrant 데이터는 named volume을 기본으로 둔다. Windows bind mount의 권한/성능 문제를 줄이기 쉽다.
