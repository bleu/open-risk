import { fetchJSON, fetchText } from "./http.js";

function authHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    return { Authorization: `token ${token}` };
  }
  return {};
}

export async function fetchGitHubRaw(
  owner: string,
  repo: string,
  branch: string,
  path: string,
): Promise<string> {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  return fetchText(url, { headers: authHeaders(), retries: 2 });
}

export async function fetchGitHubRawJSON<T = unknown>(
  owner: string,
  repo: string,
  branch: string,
  path: string,
): Promise<T> {
  const text = await fetchGitHubRaw(owner, repo, branch, path);
  return JSON.parse(text) as T;
}

interface TreeEntry {
  path: string;
  mode: string;
  type: string;
  sha: string;
  url: string;
}

interface TreeResponse {
  sha: string;
  tree: TreeEntry[];
  truncated: boolean;
}

export async function fetchGitHubTree(
  owner: string,
  repo: string,
  branch = "main",
): Promise<TreeEntry[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const data = await fetchJSON<TreeResponse>(url, { headers: authHeaders() });
  return data.tree;
}

export async function listDirectories(
  owner: string,
  repo: string,
  branch: string,
  prefix: string,
): Promise<string[]> {
  const tree = await fetchGitHubTree(owner, repo, branch);
  const dirs = new Set<string>();
  for (const entry of tree) {
    if (entry.path.startsWith(prefix) && entry.path.length > prefix.length) {
      const rest = entry.path.slice(prefix.length);
      const firstSegment = rest.split("/")[0];
      if (firstSegment) dirs.add(firstSegment);
    }
  }
  return [...dirs].sort();
}
