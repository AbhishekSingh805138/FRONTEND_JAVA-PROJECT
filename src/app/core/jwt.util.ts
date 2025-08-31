export function decodeJwt<T = any>(token: string | null): T | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
    return payload as T;
  } catch { return null; }
}

export function currentUserIdFromToken(token: string | null): number | null {
  const p = decodeJwt<any>(token);
  if (!p) return null;
  // try common claim names
  return (p.userId ?? p.uid ?? p.id ?? p.sub ?? null) as number | null;
}

