# Web 공개 규칙

Water-AI 문서는 **기본적으로 전부 공개**한다.

따라서 일반 문서에는 Web 관련 Frontmatter를 추가할 필요가 없다.

## 예외적으로 숨길 때만

```yaml
---
web_exclude: true
---
```

를 넣는다.

다시 공개하려면 `web_exclude` 줄을 삭제하거나 `false`로 바꾼다.
