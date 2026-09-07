# Linux — Qdrant

## 실행
```bash
docker pull qdrant/qdrant
docker run -d   --name qdrant   --restart unless-stopped   -p 127.0.0.1:6333:6333   -p 127.0.0.1:6334:6334   -v qdrant_storage:/qdrant/storage   qdrant/qdrant
```

## 확인
```bash
docker ps
curl http://127.0.0.1:6333/collections
```

## Dashboard 원격
```bash
ssh -L 6333:127.0.0.1:6333 user@server
```
로컬 브라우저:
```text
http://localhost:6333/dashboard
```

## 원칙
6333/6334를 인증 없이 인터넷 공개하지 않는다.
