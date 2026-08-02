import { ArrowUpRight, FlaskConical } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'
import ResearchChart from './ResearchChart'

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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
