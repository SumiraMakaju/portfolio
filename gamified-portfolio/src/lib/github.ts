const CACHE_PREFIX = "gh_cache_"
const CACHE_TTL = 1000 * 60 * 30

function getCached<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.ts > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_PREFIX + key)
      return null
    }
    return parsed.data as T
  } catch {
    return null
  }
}

function setCache(key: string, data: unknown) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() })
    )
  } catch {
    /* storage full */
  }
}

export interface GitHubRepo {
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  homepage: string | null
}

export async function fetchRepo(
  owner: string,
  repo: string
): Promise<GitHubRepo | null> {
  const cacheKey = `repo_${owner}_${repo}`
  const cached = getCached<GitHubRepo>(cacheKey)
  if (cached) return cached

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    setCache(cacheKey, data)
    return data
  } catch {
    return null
  }
}

export async function fetchReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  const cacheKey = `readme_${owner}_${repo}`
  const cached = getCached<string>(cacheKey)
  if (cached) return cached

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const content = atob(data.content)
    setCache(cacheKey, content)
    return content
  } catch {
    return null
  }
}

export async function fetchAllRepos(
  owner: string
): Promise<GitHubRepo[]> {
  const cacheKey = `repos_${owner}`
  const cached = getCached<GitHubRepo[]>(cacheKey)
  if (cached) return cached

  try {
    const res = await fetch(
      `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    setCache(cacheKey, data)
    return data
  } catch {
    return []
  }
}