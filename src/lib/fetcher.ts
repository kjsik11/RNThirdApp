import getAccessToken from './getAccessToken';
import renewToken from './renewToken';

export const fetchWidthToken: (
  url: string,
  init?: RequestInit,
) => Promise<any> = async (url, init?) => {
  const aToken = await getAccessToken();

  const addTokenInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${aToken}`,
    },
  };

  const response = await fetch(url, addTokenInit);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    if (response.ok) {
      const data = await response.json();

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[fetcher.ts] Success to fetch on ${init?.method ?? 'GET'} ${url}`,
        );
        console.log('[fetcher.ts] Recieved Data:', data);
      }

      return { ...data, statusCode: response.status };
    }
  }

  const { error } = await response.json();

  if (error && error.code === 100) {
    await renewToken();

    await fetcher(url, init);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[fetcher.ts] Failed to fetch on ${init?.method ?? 'GET'} ${url}`,
    );
    console.log('[fetcher.ts] Recieved error:', error);
  }

  const err = new Error(`[fetcher]: ${error}`);
  throw err;
};

const fetcher: (url: string, init?: RequestInit) => Promise<any> = async (
  url,
  init?,
) => {
  const response = await fetch(url, init);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    if (response.ok) {
      const data = await response.json();

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[fetcher.ts] Success to fetch on ${init?.method ?? 'GET'} ${url}`,
        );
        console.log('[fetcher.ts] Recieved Data:', data);
      }

      return { ...data, statusCode: response.status };
    }
  }

  const { error } = await response.json();

  if (error && error.code === 100) {
    await renewToken();

    await fetcher(url, init);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[fetcher.ts] Failed to fetch on ${init?.method ?? 'GET'} ${url}`,
    );
    console.log('[fetcher.ts] Recieved error:', error);
  }

  const err = new Error(`[fetcher]: ${error}`);
  throw err;
};

export default fetcher;
