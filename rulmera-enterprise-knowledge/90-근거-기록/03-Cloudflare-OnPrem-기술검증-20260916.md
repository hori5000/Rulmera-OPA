# Cloudflare ↔ On-Prem 표준화 기술검증 — 2026-09-16

## 결론

**제품 목표로 채택 가능.**  
다만 “Cloudflare를 사내에 복제”가 아니라 **Rulmera 기능/계약의 이식성 계층**으로 정의한다.

## 공식 근거

### 1. Cloudflare Workers는 Static Assets + Worker API 구성을 지원
Cloudflare 공식 문서는 정적 자산을 Worker와 함께 배포하고 React SPA + API Worker 구성을 지원한다.

- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/react/
- https://developers.cloudflare.com/workers/vite-plugin/

### 2. `workerd`는 자체호스팅 가능한 Workers 계열 런타임
Cloudflare의 `workerd` 저장소는:
- Cloudflare Workers를 구동하는 것과 같은 계열의 JS/Wasm 런타임
- Workers용 애플리케이션을 자체 서버에서 호스팅하는 용도
를 명시한다.

- https://github.com/cloudflare/workerd

주의: `workerd` 단독을 악성코드 격리용 hardened sandbox로 간주하면 안 된다는 공식 경고가 있다.

### 3. R2는 S3 API 호환
R2는 S3 API를 구현하지만 일부 기능 차이가 있으므로 Rulmera는 필요한 최소 Subset만 계약으로 사용한다.

- https://developers.cloudflare.com/r2/api/s3/api/

### 4. D1은 SQLite semantics
D1은 SQLite query engine/semantics 기반의 관리형 DB이므로 PostgreSQL+pgvector 중심 Rulmera Core를 D1에 맞추지 않는다.

- https://developers.cloudflare.com/d1/
- https://developers.cloudflare.com/d1/best-practices/query-d1/

## 제품 결정

1. `workerd`는 선택적 Adapter.
2. PostgreSQL+pgvector는 Core DB 기준.
3. R2/MinIO/고객 S3는 Object Adapter로 추상화.
4. Citation은 logical resource ID 사용.
5. Cloudflare/On-Prem 동일 Parity Test 구축.
6. Cloudflare 글로벌 CDN/DDoS/관리서비스 자체 복제는 범위 밖.
