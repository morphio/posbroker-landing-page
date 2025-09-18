export class HttpQueryError extends Error {
  constructor(message = '') {
    super(message);
    this.name = 'HttpQueryError';
  }
}

export default async function httpQuery<T>(url: string, init: RequestInit) {
  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      throw new HttpQueryError();
    }

    return response.json() as T;
  } catch (_) {
    throw new HttpQueryError();
  }
}
