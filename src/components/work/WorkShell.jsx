import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../../lib/gsap'
import Navbar from '../Navbar'
import Footer from '../Footer'
import ScrollToTop from '../ScrollToTop'
import TextReveal from '../ui/TextReveal'
import WorkBody from './WorkBody'
import content from '../../data/content.json'

// Generic case-study shell: header, stat tiles, then data-driven blocks.
export default function WorkShell({ meta }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.ws-reveal', { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.07,
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
    })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <div ref={ref} className="relative min-h-[100dvh] overflow-x-clip bg-canvas text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="surface-grid absolute inset-x-0 top-0 h-[52rem] opacity-60" />
        <div className="paper-noise absolute inset-0 opacity-[0.035]" />
      </div>

      <div className="relative z-10">
        <Navbar data={content.navbar} anchorBase="/" />

        <main>
          <header className="container-shell pb-14 pt-14 sm:pt-20">
            <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <a href="/projects" className="text-muted underline-offset-4 hover:text-coral hover:underline focus-visible:outline-none">
                Project catalog
              </a>
              <span aria-hidden="true"> / </span>
              <span className="text-ink">Case study</span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="ws-reveal">
                <p className="eyebrow">{meta.eyebrow}</p>
                <TextReveal
                  as="h1"
                  text={meta.title}
                  className="mt-4 text-[clamp(2.4rem,4.8vw,4rem)] font-bold leading-[0.98] tracking-[-0.065em]"
                />
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">{meta.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={meta.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5"
                  >
                    Open the repository <ArrowUpRight size={15} strokeWidth={2} />
                  </a>
                </div>
              </div>

              <aside className="ws-reveal grid gap-px overflow-hidden rounded-2xl border border-line/80 bg-line/80" aria-label="Headline results">
                {meta.stats.map((s) => (
                  <div key={s.label} className="bg-canvas p-5 sm:p-6">
                    <p className="text-3xl font-bold tracking-[-0.04em] tabular-nums sm:text-4xl">{s.value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-coral">{s.unit}</p>
                    <p className="mt-2 text-xs leading-4 text-muted">{s.label}</p>
                  </div>
                ))}
              </aside>
            </div>
          </header>

          <div className="container-shell pb-20">
            <WorkBody blocks={meta.blocks} dkey={meta.key} />
          </div>
        </main>

        <Footer data={content.footer} />
        <ScrollToTop />
      </div>
    </div>
  )
}
