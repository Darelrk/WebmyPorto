import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import TextReveal from './ui/TextReveal'
import ForecastChart from './containerport/ForecastChart'
import ModelLadder from './containerport/ModelLadder'
import AnomalyTimeline from './containerport/AnomalyTimeline'
import data from '../lib/containerport'
import content from '../data/content.json'

const STATS = [
  { value: String(data.headline.portsModeled), unit: 'ports', label: 'modeled, top-10 container system' },
  { value: `${data.headline.bestSmape}%`, unit: 'sMAPE', label: 'best port accuracy, Priok weekly calls' },
  { value: `${data.headline.beatNaive}/10`, unit: 'ports', label: 'beat the seasonal-naive baseline' },
  { value: `${data.headline.testWeeks}`, unit: 'weeks', label: 'walk-forward test window, 2025+' },
]

const STACK = ['pandas', 'statsmodels', 'XGBoost', 'PyTorch', 'scikit-learn', 'Streamlit']

export default function CaseStudyContainerPort() {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.cs-reveal', { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, stagger: 0.08,
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
          {/* Header */}
          <header className="container-shell pb-16 pt-14 sm:pt-20">
            <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <a href="/projects" className="text-muted underline-offset-4 hover:text-coral hover:underline focus-visible:outline-none">
                Project catalog
              </a>
              <span aria-hidden="true"> / </span>
              <span className="text-ink">Case study</span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <p className="eyebrow">Time series · Forecasting · Early warning</p>
                <TextReveal
                  as="h1"
                  text="Reading Indonesia's ports, week by week."
                  className="mt-4 text-[clamp(2.6rem,5.2vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.07em]"
                />
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                  ContainerPort-ID forecasts weekly container-vessel calls and import volume for the ten busiest
                  container ports in Indonesia, and flags the weeks when activity breaks pattern. Every number on
                  this page comes from the shipped pipeline: 262k daily AIS observations, walk-forward validated,
                  reproducible end to end.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Darelrk/ContainerPort-ID"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5"
                  >
                    Open the repository <ArrowUpRight size={15} strokeWidth={2} />
                  </a>
                  <a
                    href="https://github.com/Darelrk/ContainerPort-ID/blob/main/reports/case_study.md"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-coral hover:text-coral"
                  >
                    Read the case study <ArrowUpRight size={15} strokeWidth={2} />
                  </a>
                </div>
              </div>

              <aside className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/80 bg-line/80" aria-label="Headline results">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-canvas p-5 sm:p-6">
                    <p className="text-3xl font-bold tracking-[-0.04em] tabular-nums sm:text-4xl">{s.value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-coral">{s.unit}</p>
                    <p className="mt-2 text-xs leading-4 text-muted">{s.label}</p>
                  </div>
                ))}
              </aside>
            </div>
          </header>

          {/* Problem & data */}
          <section className="border-y border-line/80 bg-white/30 dark:bg-white/[0.02]">
            <div className="container-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
              <div className="cs-reveal">
                <p className="eyebrow">The problem</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Terminals plan week-to-week, blind.</h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Berth slots, crane rosters, and yard labour are all weekly decisions. Yet the public data that
                  could answer "how many container vessels call next week" sits raw in AIS feeds.
                  ContainerPort-ID turns that feed into a forecast a planner can act on, plus an early-warning
                  layer that separates holiday effects from real shocks.
                </p>
              </div>
              <div className="cs-reveal">
                <p className="eyebrow">The data</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">One hub dominates.</h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  262,088 daily observations across 75 Indonesian ports, January 2019 through August 2026, from the
                  IMF PortWatch dataset. Aggregated to ISO weeks, the top-10 container ports carry the system:
                  Tanjung Priok alone is {data.hubShare.priok}% of national container calls; the top-3 share
                  is {data.hubShare.top3}%. A classic hub-and-feeder structure, modeled as such.
                </p>
              </div>
            </div>
          </section>

          {/* Forecast explorer */}
          <section aria-labelledby="fc-heading" className="container-shell py-16 sm:py-20">
            <div className="cs-reveal max-w-2xl">
              <p className="eyebrow">Live result explorer</p>
              <h2 id="fc-heading" className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
                Actual against forecast, five ports.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Pick a port and a model. The lines show what really happened against what the model predicted,
                across the full 86-week test window. No cherry-picked window: this is every tested week.
              </p>
            </div>
            <div className="cs-reveal mt-10">
              <ForecastChart />
            </div>

            <div className="cs-reveal mt-6 grid gap-6 lg:grid-cols-2">
              <ModelLadder />
              <div className="rounded-2xl border border-line/80 bg-ink p-5 text-canvas sm:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">Next 8 weeks, Priok</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Operational projection</h3>
                <p className="mt-2 text-sm leading-6 text-canvas/70">
                  The deployed model's rolling 8-week outlook, regenerated on the last data refresh. This is the
                  number a berth planner opens on Monday.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  {data.priokProjection.map((p) => (
                    <li key={p.yw}>
                      <p className="font-mono text-[10px] text-canvas/50">{p.yw.slice(4)}W{p.yw.slice(4)} · {p.yw.slice(0, 4)}</p>
                      <p className="text-xl font-bold tabular-nums">{Math.round(p.v)}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-[10px] text-canvas/50">weekly container calls · LSTM, refit on full history</p>
              </div>
            </div>
          </section>

          {/* Anomaly timeline */}
          <section aria-labelledby="an-heading" className="border-t border-line/80 bg-white/30 dark:bg-white/[0.02]">
            <div className="container-shell py-16 sm:py-20">
              <div className="cs-reveal max-w-2xl">
                <p className="eyebrow">Early warning</p>
                <h2 id="an-heading" className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
                  The radar caught what history recorded.
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  No model sees COVID coming. The point of an anomaly layer is to surface the break the moment it
                  happens. Backtested over six years, the detector's episodes line up with the documented record:
                  the 2020 lockdown trough and rebound, the 2021 Delta and PPKM drops, the 2023 freight recession,
                  and every recurring Lebaran shutdown.
                </p>
              </div>
              <div className="cs-reveal mt-10">
                <AnomalyTimeline />
              </div>
            </div>
          </section>

          {/* Method & stack */}
          <section aria-labelledby="mth-heading" className="container-shell py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="cs-reveal">
                <p className="eyebrow">Method</p>
                <h2 id="mth-heading" className="mt-4 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Honest evaluation or nothing.</h2>
                <ol className="mt-6 space-y-5 text-sm leading-6 text-muted">
                  <li className="flex gap-4">
                    <span className="mt-0.5 font-mono text-xs font-bold text-coral">01</span>
                    <span><strong className="text-ink">Aggregate.</strong> Daily AIS counts become ISO-weekly series per port and target: container calls, import and export tonnage.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="mt-0.5 font-mono text-xs font-bold text-coral">02</span>
                    <span><strong className="text-ink">Feature.</strong> Lags 1 to 8 weeks, rolling stats at 4/8/12, Ramadan window and Lebaran week flags. Leakage-tested by unit test.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="mt-0.5 font-mono text-xs font-bold text-coral">03</span>
                    <span><strong className="text-ink">Validate.</strong> Expanding-window walk-forward over 86 test weeks, 2025 onward. The seasonal-naive forecast is the bar; every model must beat it to matter.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="mt-0.5 font-mono text-xs font-bold text-coral">04</span>
                    <span><strong className="text-ink">Warn.</strong> Seasonal residuals, z-score with a re-fit COVID baseline, Isolation Forest for cross-port shape checks.</span>
                  </li>
                </ol>
              </div>
              <div className="cs-reveal">
                <p className="eyebrow">Reproducibility</p>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em]">Everything ships.</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  The repo carries the pipeline as code, executed notebooks with saved outputs, a Streamlit
                  dashboard (forecast, anomaly, and benchmark views), and a test suite that asserts zero
                  train-test leakage. Data refresh is a single script run against the live IMF PortWatch feed.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                  {STACK.map((s) => (
                    <li key={s} className="rounded-full border border-line bg-white/50 px-3 py-1.5 font-mono text-xs text-ink/70 dark:bg-white/[0.04]">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="border-t border-line/80">
            <div className="container-shell flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-lg font-semibold leading-7 tracking-[-0.02em]">
                Want the full methodology? The repo has every line of it.
              </p>
              <a
                href="https://github.com/Darelrk/ContainerPort-ID"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                ContainerPort-ID on GitHub <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </div>
          </section>
        </main>

        <Footer data={content.footer} />
        <ScrollToTop />
      </div>
    </div>
  )
}
