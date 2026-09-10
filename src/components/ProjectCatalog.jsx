import { ArrowLeft, ArrowUpRight, Star } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'
import { useGitHubRepos } from '../lib/github'
import content from '../data/content.json'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import SpotlightCard from './ui/SpotlightCard'

const LANG_COLORS = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#DA5B0B',
  Vue: '#41b883',
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function RepoCard({ repo }) {
  return (
    <SpotlightCard
      as="a"
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      spotlightColor="rgba(232, 93, 74, 0.12)"
      className="cat-card group flex h-full flex-col rounded-2xl border border-line/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-soft sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold leading-tight tracking-[-0.03em]">{repo.name}</h2>
        <ArrowUpRight className="shrink-0 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral" size={20} strokeWidth={1.5} />
      </div>
      {repo.description && (
        <p className="mt-3 text-sm leading-6 text-muted">{repo.description}</p>
      )}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? '#8b8b8b' }} />
              {repo.language}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1" title={`${repo.stars} stars`}>
              <Star size={13} strokeWidth={1.8} aria-label="stars" />
              {repo.stars}
            </span>
          )}
          {repo.updatedAt && <time dateTime={repo.updatedAt}>Updated {formatDate(repo.updatedAt)}</time>}
        </div>
        {repo.topics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 5).map((t) => (
              <span key={t} className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] text-ink/60">{t}</span>
            ))}
          </div>
        )}
      </div>
    </SpotlightCard>
  )
}

function CardSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-2xl border border-line/80 p-6 sm:p-7" aria-hidden="true">
      <div className="h-4 w-2/3 rounded bg-line/70" />
      <div className="mt-4 h-3 w-full rounded bg-line/50" />
      <div className="mt-2 h-3 w-4/5 rounded bg-line/50" />
      <div className="mt-28 h-3 w-1/2 rounded bg-line/50" />
    </div>
  )
}

export default function ProjectCatalog() {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)
  const { loading, repos } = useGitHubRepos()

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.cat-header', { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT })
    gsap.fromTo('.cat-card', { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.07, delay: 0.1 })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <div ref={ref} className="relative min-h-[100dvh] overflow-x-clip bg-canvas text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="surface-grid absolute inset-x-0 top-0 h-[52rem] opacity-60" />
        <div className="paper-noise absolute inset-0 opacity-[0.035]" />
      </div>

      <div className="relative z-10">
        <Navbar data={content.navbar} />
        <main className="container-shell py-24 sm:py-32">
          <div className="cat-header max-w-3xl">
            <h1 className="text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.075em]">
              Project catalog
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Selected data science work, live from GitHub.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
              : repos.map((repo) => <RepoCard key={repo.name} repo={repo} />)}
          </div>

          <a href="/" className="mt-16 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-coral">
            <ArrowLeft size={16} strokeWidth={1.8} />
            Back to portfolio
          </a>
        </main>
        <Footer data={content.footer} />
      </div>
      <ScrollToTop />
    </div>
  )
}
