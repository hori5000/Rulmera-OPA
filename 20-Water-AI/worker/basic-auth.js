export default {
  async fetch(request, env) {
    const username = env.BASIC_AUTH_USER
    const password = env.BASIC_AUTH_PASS

    if (!username || !password) {
      return new Response("Water-AI authentication is not configured.", {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      })
    }

    const auth = request.headers.get("Authorization")
    if (!auth || !auth.startsWith("Basic ")) return unauthorized()

    let decoded = ""
    try {
      decoded = atob(auth.slice(6))
    } catch {
      return unauthorized()
    }

    const sep = decoded.indexOf(":")
    if (sep < 0) return unauthorized()

    const suppliedUser = decoded.slice(0, sep)
    const suppliedPass = decoded.slice(sep + 1)

    if (
      !constantTimeEqual(suppliedUser, username) ||
      !constantTimeEqual(suppliedPass, password)
    ) {
      return unauthorized()
    }

    const response = await env.ASSETS.fetch(request)
    const headers = new Headers(response.headers)
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Water-AI", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  })
}

function constantTimeEqual(a, b) {
  const enc = new TextEncoder()
  const aa = enc.encode(String(a))
  const bb = enc.encode(String(b))
  const max = Math.max(aa.length, bb.length)

  let diff = aa.length ^ bb.length
  for (let i = 0; i < max; i++) {
    diff |= (aa[i] ?? 0) ^ (bb[i] ?? 0)
  }
  return diff === 0
}

