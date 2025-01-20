import { env } from '@/env';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface FetcherResponse<T> {
  data: T | null;
  status: number;
  statusText: string;
  error?: string;
}

export class Fetcher {
  private readonly _baseURL: URL;
  private readonly _headers: Record<string, string>;

  constructor(baseURL: URL, headers: Record<string, string>) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  public setHeader(key: string, value: string) {
    this._headers[key] = value;
  }

  public async get<T>(url: string) {
    return this._processResponse<T>(
      fetch(new URL(url, this._baseURL), {
        headers: this._headers,
      }),
    );
  }

  public async post<T>(url: string, body?: Record<string, unknown>, signal?: AbortSignal) {
    return this._processResponse<T>(
      fetch(new URL(url, this._baseURL), {
        method: 'POST',
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
        signal,
      }),
    );
  }

  public async put<T>(url: string, body?: Record<string, unknown>) {
    return this._processResponse<T>(
      fetch(new URL(url, this._baseURL), {
        method: 'PUT',
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  }

  public async delete<T>(url: string) {
    return this._processResponse<T>(
      fetch(new URL(url, this._baseURL), {
        method: 'DELETE',
        headers: this._headers,
      }),
    );
  }

  public async patch<T>(url: string, body?: Record<string, unknown>) {
    return this._processResponse<T>(
      fetch(new URL(url, this._baseURL), {
        method: 'PATCH',
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  }

  private async _processResponse<T>(responsePromise: Promise<Response>): Promise<FetcherResponse<T>> {
    const response = await responsePromise;

    const resCopy = response.clone();
    const responseText = response.ok ? await response.text() : '';
    const data = responseText ? JSON.parse(responseText) : null;
    let error = '';
    try {
      const resCopyData = await resCopy.json();

      error = resCopyData?.error ? resCopyData?.message : '';
    } catch (err) {
      console.log('Failed to parse error from response:', err);
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      error,
    };
  }
}

export const authClient = () => {
  return new Fetcher(new URL(env.VITE_API_URL ?? ''), {
    'Content-Type': 'application/json',
  });
};

export const apiClient = () => {
  return new Fetcher(new URL(env.VITE_API_URL ?? ''), {
    'Content-Type': 'application/json',
  });
};
