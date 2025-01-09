import { Fetcher } from '@/lib/fetcher';

export const get = async <T>(fetcher: Fetcher, method: string) => {
  const response = await fetcher.get<T>(method);
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const put = async <T>(client: Fetcher, method: string, data: Record<string, unknown>) => {
  const response = await client.put<T>(method, { data });
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const post = async <T>(
  client: Fetcher,
  method: string,
  data?: Record<string, unknown>,
  signal?: AbortSignal,
) => {
  const response = await client.post<T>(method, data, signal);
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(response.error ?? response.statusText);
  }

  console.log('response', response);
  return response.data;
};

export const patch = async <T>(client: Fetcher, method: string, data: Record<string, unknown>) => {
  const response = await client.patch<T>(method, data);
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const deleteOperation = async <T>(client: Fetcher, method: string) => {
  const response = await client.delete<T>(method);
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(response.statusText);
  }

  return response.data;
};
