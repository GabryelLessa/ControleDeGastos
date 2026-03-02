const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5032";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (res.status === 204) return null as T;

  if (!res.ok) {
    if (res.status === 422) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.erro ?? "Operação inválida.");
    }

    const body = await res.json().catch(() => null);
    throw new Error(
      body?.erro ?? body?.title ?? body?.detail ?? `Erro ${res.status}`,
    );
  }

  return res.json();
}
