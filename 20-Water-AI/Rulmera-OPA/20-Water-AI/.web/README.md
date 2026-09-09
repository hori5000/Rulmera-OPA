# Water-AI Web Publish

## 운영 구조

정적 웹은 로컬에서 먼저 만든다.

```text
Rulmera-OPA/20-Water-AI
├─ Markdown 원본
├─ .web/          ← Quartz/변환 설정
└─ .web-public/   ← 완성된 정적 웹
```

`BUILD-WATER-AI-WEB.ps1` 실행 후 `.web-public`이 생성된다.

그 다음:

```powershell
.\PUBLISH-RULMERA-OPA.ps1
```

을 실행하면 `.web-public`도 `Water-AI` Git에 같이 올라간다.

Cloudflare Pages는 Git의 `.web-public`을 그대로 서비스한다.

## 공개 범위

Water-AI의 모든 Markdown이 공개 대상이다.

정말 숨겨야 할 예외 문서만:

```yaml
web_exclude: true
```

를 사용한다.

## 외부 원본

PDF/XLSX/DOCX/PPTX/HWP/HWPX/ZIP/PLC/SCADA/DB 원본은 Git/Web에 올리지 않는다.
