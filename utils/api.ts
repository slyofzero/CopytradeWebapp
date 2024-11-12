import { JWTKeyName } from "./constants";

// ------------------------------ API requests ------------------------------
export async function apiFetcher<T>(url: string, headers?: Headers) {
  const response = await fetch(url, { headers });
  const data = (await response.json()) as T;
  return { response: response.status, data };
}

export async function apiPoster<T>(
  url: string,
  body: any,
  headers?: Headers,
  method?: string
) {
  const response = await fetch(url, {
    method: method || "POST",
    body: JSON.stringify(body),
    headers,
  });
  const data = (await response.json()) as T;
  return { response: response.status, data };
}

// ------------------------------ Client requests ------------------------------
export async function clientFetcher<T>(url: string) {
  const token = localStorage.getItem(JWTKeyName) || "";
  const headers = new Headers();
  headers.append("authorization", token);

  const response = await apiFetcher<T>(url, headers);
  return response;
}

export async function clientPoster<T>(url: string, body: any, method?: string) {
  const token = localStorage.getItem(JWTKeyName) || "";
  const headers = new Headers();
  headers.append("authorization", token);

  const response = await apiPoster<T>(url, body, headers, method);
  return response;
}
