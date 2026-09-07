# Linux — systemd 서비스화

## 목적
SSH 세션과 무관하게 자동기동/재시작.

## vLLM
`50-실습코드/systemd/qwen-vllm.service`

적용:
```bash
sudo cp qwen-vllm.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now qwen-vllm
systemctl status qwen-vllm
```

로그:
```bash
journalctl -u qwen-vllm -f
```

## RAG
동일하게 `qwen-rag-api.service`.

## 환경변수
shell의 `.bashrc` 환경은 systemd에 자동 전달되지 않는다.
token/cache/proxy는 `Environment=` 또는 `EnvironmentFile=`로 명시한다.

## 보안
EnvironmentFile은:
```bash
chmod 600 .env
```
