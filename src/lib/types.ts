export interface FetchReport {
  provider: string;
  filesWritten: string[];
  errors: string[];
  durationMs: number;
}

export interface ProviderFetcher {
  name: string;
  slug: string;
  fetch(): Promise<FetchReport>;
}
