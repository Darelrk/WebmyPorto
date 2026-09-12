import { ArrowUpRight, FlaskConical, Search, Database, Cpu, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'
import ResearchChart from './ResearchChart'

const PIPELINE_STEPS = [
  { icon: Search, label: 'Problem', desc: 'Gaps in synthetic tabular data: fidelity vs. privacy trade-off' },
  { icon: Database, label: 'Data', desc: 'Adult Census + California Housing, benchmark splits' },
  { icon: Cpu, label: 'Modeling', desc: 'GReaT (LLM), CTGAN, SDG — 3,000 synthetic rows each' },
  { icon: CheckCircle2, label: 'Validation', desc: 'XGBoost downstream classifier, TSTR protocol' },
]

function CompareSlider({ data }) {
  const wrapRef = useRef(null)

  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const clip = wrap.querySelector('.cmp-after')
    const handle = wrap.querySelector('.cmp-handle')
    let dragging = false

    const setPos = (clientX) => {
      const rect = wrap.getBoundingClientRect()
      const pct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100))
      gsap.to(clip, { clipPath: `inset(0 0 0 ${pct}%)`, duration: 0.15, ease: 'power2.out' })
      gsap.to(handle, { left: `${pct}%`, duration: 0.15, ease: 'power2.out' })
    }

    const onDown = () => { dragging = true }
    const onUp = () => { dragging = false }
    const onMove = (e) => { if (dragging) setPos(e.clientX ?? e.touches?.[0]?.clientX) }
    const onTouchMove = (e) => {
      if (dragging && e.cancelable) e.preventDefault()
      onMove(e)
    }
    const onClick = (e) => setPos(e.clientX ?? e.touches?.[0]?.clientX)

    wrap.addEventListener('mousedown', onDown)
    wrap.addEventListener('touchstart', onDown, { passive: true })
    wrap.addEventListener('click', onClick)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    window.addEventListener('touchcancel', onUp)
    window.addEventListener('mousemove', onMove)
    wrap.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      wrap.removeEventListener('mousedown', onDown)
      wrap.removeEventListener('touchstart', onDown)
      wrap.removeEventListener('click', onClick)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      window.removeEventListener('touchcancel', onUp)
      window.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('touchmove', onTouchMove)
    }
  }, { scope: wrapRef })

  const best = data.chartData.find((d) => d.featured) ?? data.chartData[0]
  const baseline = data.chartData.find((d) => d.model === 'Original') ?? data.chartData[data.chartData.length - 1]

  return (
    <div ref={wrapRef} className="relative mt-8 h-[110px] cursor-ew-resize select-none overflow-hidden rounded-xl border border-canvas/15">
      {/* Before: baseline */}
      <div className="absolute inset-0 flex items-center justify-between px-5 bg-canvas/[0.03]">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-canvas/50">Baseline</p>
          <p className="mt-0.5 text-xs text-canvas/65">{baseline.model}</p>
        </div>
        <p className="text-2xl font-bold text-canvas/60">{baseline.label}</p>
      </div>
      {/* After: best model (clipped) */}
      <div className="cmp-after absolute inset-0 flex items-center justify-between px-5 bg-coral/90"
        style={{ clipPath: 'inset(0 0 0 50%)' }}>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-canvas/75">Our Model</p>
          <p className="mt-0.5 text-xs font-medium text-canvas/90">{best.model}</p>
        </div>
        <p className="text-2xl font-bold text-canvas">{best.label}</p>
      </div>
      {/* Handle */}
      <div className="cmp-handle absolute top-0 bottom-0 w-[2px] bg-canvas" style={{ left: '50%' }}>
        <div className="absolute top-1/2 left-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas shadow-soft">
          <span className="text-[9px] font-bold text-ink">⇔</span>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedResearch({ data }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)
  const chartRef = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: EASE_OUT,
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
    gsap.fromTo('.res-badge',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)', stagger: 0.08,
        scrollTrigger: { trigger: '.res-badge', start: 'top 90%', once: true } })
    gsap.fromTo('.chart-label',
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: EASE_OUT, stagger: 0.05,
        scrollTrigger: { trigger: chartRef.current, start: 'top 85%', once: true } })
    // Process timeline step reveal
    gsap.fromTo('.pipe-step',
      { opacity: 0, x: -18 },
      { opacity: 1, x: 0, duration: 0.5, ease: EASE_OUT, stagger: 0.12,
        scrollTrigger: { trigger: '.pipe-line', start: 'top 88%', once: true } })
    gsap.fromTo('.pipe-bar',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: EASE_OUT,
        scrollTrigger: { trigger: '.pipe-line', start: 'top 88%', once: true },
        transformOrigin: 'left' })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <section id="research" className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <div ref={ref} className="overflow-hidden rounded-[28px] bg-ink p-7 text-canvas sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3 text-sm text-canvas/65">
                <FlaskConical size={18} className="text-coral" strokeWidth={1.5} />
                {data.eyebrow}
              </div>
              <h2 className="mt-8 max-w-xl text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.075em]">{data.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-canvas/70">{data.problem}</p>
              <div className="mt-9 grid gap-6 border-t border-canvas/15 pt-6 sm:grid-cols-2">
                <div className="res-badge rounded-lg bg-canvas/5 p-4">
                  <p className="text-xs font-bold text-coral">Method</p>
                  <p className="mt-2 text-sm leading-6 text-canvas/70">{data.solution}</p>
                </div>
                <div className="res-badge rounded-lg bg-canvas/5 p-4">
                  <p className="text-xs font-bold text-coral">Evidence</p>
                  <p className="mt-2 text-sm leading-6 text-canvas/70">{data.results}</p>
                </div>
              </div>
              <a href={data.link} target="_blank" rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-canvas hover:text-ink active:translate-y-0">
                View study <ArrowUpRight size={16} strokeWidth={1.8} />
              </a>

              {/* Process timeline */}
              <div className="pipe-line mt-10 border-t border-canvas/15 pt-6">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-canvas/50">Pipeline</p>
                <div className="relative mt-4">
                  <div className="pipe-bar absolute left-[15px] top-2 bottom-2 w-px bg-canvas/20" />
                  <ol className="space-y-4">
                    {PIPELINE_STEPS.map((s, i) => {
                      const Icon = s.icon
                      return (
                        <li key={s.label} className="pipe-step relative flex items-start gap-3 pl-0">
                          <div className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-canvas/25 bg-ink text-coral">
                            <Icon size={13} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-canvas">
                              <span className="mr-1.5 font-mono text-coral/80">0{i + 1}</span>{s.label}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-4 text-canvas/55">{s.desc}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>
            <div className="self-end rounded-[20px] border border-canvas/15 bg-canvas/[0.04] p-5 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] text-canvas/50">{data.chartTitle}</p>
                  <p className="mt-2 text-2xl font-bold tracking-[-0.05em]">Accuracy</p>
                </div>
                <p className="font-mono text-xs text-coral">{data.chartData?.length ?? 0} benchmarks</p>
              </div>
              <div ref={chartRef} className="mt-8">
                <ResearchChart data={data.chartData} title={data.chartTitle} />
              </div>
              {/* Before/after compare slider */}
              <CompareSlider data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
