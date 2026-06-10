interface FetchOptions {
  retries?: number;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

const DEFAULT_RETRIES = 3;
const DEFAULT_TIMEOUT = 30_000;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchJSON<T = unknown>(
  url: string,
  opts: FetchOptions = {},
): Promise<T> {
  const { retries = DEFAULT_RETRIES, timeoutMs = DEFAULT_TIMEOUT, headers } = opts;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
        headers,
      });

      if (res.status === 429 || res.status >= 500) {
        lastError = new Error(`HTTP ${res.status} from ${url}`);
        if (attempt < retries - 1) {
          const backoff = 1000 * 2 ** attempt;
          console.error(`  [retry] ${url} -> ${res.status}, waiting ${backoff}ms`);
          await sleep(backoff);
          continue;
        }
        throw lastError;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} from ${url}`);
      }

      return (await res.json()) as T;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < retries - 1 && !lastError.message.includes("HTTP 4")) {
        const backoff = 1000 * 2 ** attempt;
        console.error(`  [retry] ${url} -> ${lastError.message}, waiting ${backoff}ms`);
        await sleep(backoff);
        continue;
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}

export async function fetchText(
  url: string,
  opts: FetchOptions = {},
): Promise<string> {
  const { retries = DEFAULT_RETRIES, timeoutMs = DEFAULT_TIMEOUT, headers } = opts;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
        headers,
      });

      if (res.status === 429 || res.status >= 500) {
        lastError = new Error(`HTTP ${res.status} from ${url}`);
        if (attempt < retries - 1) {
          const backoff = 1000 * 2 ** attempt;
          await sleep(backoff);
          continue;
        }
        throw lastError;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} from ${url}`);
      }

      return await res.text();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < retries - 1 && !lastError.message.includes("HTTP 4")) {
        const backoff = 1000 * 2 ** attempt;
        await sleep(backoff);
        continue;
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}
