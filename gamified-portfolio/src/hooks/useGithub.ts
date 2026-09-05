"use client"

import { useState, useEffect } from "react"
import { fetchRepo, fetchReadme, GitHubRepo } from "@/lib/github"

interface UseGitHubResult {
  repo: GitHubRepo | null
  readme: string | null
  loading: boolean
  error: boolean
}

export function useGitHub(owner: string, repoName: string): UseGitHubResult {
  const [repo, setRepo] = useState<GitHubRepo | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [loading, setLoading] = useState(!!owner && !!repoName)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!owner || !repoName) {
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(false)

      const [repoData, readmeData] = await Promise.all([
        fetchRepo(owner, repoName),
        fetchReadme(owner, repoName),
      ])

      if (cancelled) return

      if (!repoData) {
        setError(true)
      } else {
        setRepo(repoData)
      }
      setReadme(readmeData)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [owner, repoName])

  return { repo, readme, loading, error }
}