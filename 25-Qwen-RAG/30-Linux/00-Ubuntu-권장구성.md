# Linux — Ubuntu 권장 구성

## 구조
```text
Ubuntu host
├─ vLLM :8000
├─ RAG API :8100
└─ Docker
   └─ Qdrant :6333/:6334
```

## 권장
- Ubuntu LTS 계열
- NVIDIA production driver
- Python 3.12
- uv
- vLLM
- Docker
- vLLM Docker 사용 시 NVIDIA Container Toolkit

## 방화벽
- Qdrant 외부 차단
- vLLM 외부 차단
- RAG API도 reverse proxy/auth 뒤 공개

## 서비스 사용자
운영에서는 일반 사용자 `qwenrag` 같은 별도 계정을 두고 cache/config 권한을 명확히 한다.
