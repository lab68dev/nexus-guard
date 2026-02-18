/* ─────────────────────────────────────────────
   proxy.ts — Secure Backend Proxy
   ─────────────────────────────────────────────
   Forwards requests from the Next.js frontend
   to the private Spring Boot governance API
   running on Render's private network.

   The backend is NOT publicly accessible —
   all traffic is routed through this proxy.
   ───────────────────────────────────────────── */

const BACKEND_URL =
  process.env.GOVERNANCE_API_URL ?? "http://localhost:8080";

const SERVICE_TOKEN =
  process.env.GOVERNANCE_SERVICE_TOKEN ?? "";

interface ProxyOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

export async function proxy<T = unknown>(
  path: string,
  options: ProxyOptions = {},
): Promise<T> {
  const url = `${BACKEND_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Internal service-to-service authentication
    "X-Service-Token": SERVICE_TOKEN,
    // Forward org context (set by auth middleware)
    "X-Org-Id": getOrgId(),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
    // Disable Next.js caching for mutations
    cache: options.method === "GET" ? "force-cache" : "no-store",
    next:
      options.method === "GET"
        ? { revalidate: 30, tags: [tagFromPath(path)] }
        : undefined,
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "Unknown error");
    throw new ProxyError(
      `Backend responded with ${res.status}: ${errorBody}`,
      res.status,
      errorBody,
    );
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

/* ── Convenience methods ── */

export const proxyGet = <T = unknown>(path: string, options?: ProxyOptions) =>
  proxy<T>(path, { ...options, method: "GET" });

export const proxyPost = <T = unknown>(
  path: string,
  body: unknown,
  options?: ProxyOptions,
) =>
  proxy<T>(path, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });

export const proxyPut = <T = unknown>(
  path: string,
  body: unknown,
  options?: ProxyOptions,
) =>
  proxy<T>(path, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
  });

export const proxyDelete = <T = unknown>(
  path: string,
  options?: ProxyOptions,
) => proxy<T>(path, { ...options, method: "DELETE" });

/* ── Helpers ── */

function getOrgId(): string {
  // In production, extract from the authenticated session/JWT.
  // This is a placeholder for the scaffold.
  return process.env.DEFAULT_ORG_ID ?? "org_default";
}

function tagFromPath(path: string): string {
  // Generate a cache tag from the API path for targeted revalidation
  return path.replace(/\//g, "-").replace(/^-/, "");
}

/* ── Error class ── */

export class ProxyError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: string,
  ) {
    super(message);
    this.name = "ProxyError";
  }
}
