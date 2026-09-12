import { useEffect, useState } from 'react'
import fallback from '../data/github-fallback.json'

const GITHUB_USER = 'Darelrk'

// Curated catalog. Update together with src/data/github-fallback.json.
const CATALOG_REPOS = [
  'credit-gap-forecaster',
  'Tabular-Synthesis-LLM',
  'mae-hybrid-imputation-study',
  'ContainerPort-ID',
  'Dashboard-Analisis-Universitas-LPDP',
  'Sleep-Health-and-Lifestyle-Dataset',
]

function mapRepo(r) {
  return {
    name: r.name,
    description: r.description ?? '',
    language: r.language ?? '',
    stars: r.stargazers_count ?? 0,
    updatedAt: (r.pushed_at ?? '').slice(0, 10),
    topics: r.topics ?? [],
    url: r.html_url,
  }
}

async function fetchRepo(name) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`, {
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(String(res.status))
  return mapRepo(await res.json())
}

// Live GitHub data with per-repo fallback; the catalog never renders empty.
export function useGitHubRepos() {
  const [repos, setRepos] = useState(null)

  useEffect(() => {
    let alive = true
    Promise.all(
      CATALOG_REPOS.map(async (name) => {
        try {
          return await fetchRepo(name)
        } catch {
          return fallback.find((r) => r.name === name)
        }
      })
    ).then((r) => alive && setRepos(r.filter(Boolean)))
    return () => { alive = false }
  }, [])

  return { loading: repos === null, repos: repos ?? [] }
}
