import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../../lib/gsap'
import data from '../../lib/containerport'

function ywToLabel(yw) {
  const y = yw.slice(0, 4)
  const w = yw.slice(4)
  return `${y} W${parseInt(w, 10)}`
}

const DIR_STYLE = {
  drop: { label: 'drop', cls: 'bg-ink text-canvas' },
  spike: { label: 'spike', cls: 'border border-coral text-coral' },
}

export default function AnomalyTimeline() {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.an-row', { opacity: 0, x: -12 }, {
      opacity: 1, x: 0, duration: 0.45, ease: EASE_OUT, stagger: 0.05,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
    })
  }, { scope: ref, revertOnUpdate: true })

  const events = data.anomalies.labeled

  return (
    <div ref={ref} className="rounded-2xl border border-line/80 bg-white/40 p-5 sm:p-7 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">Disruption radar</p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Detected events, 2020–2026</h3>
        </div>
        <p className="font-mono text-xs text-muted">{data.anomalies.total} episodes logged · {events.length} match documented history</p>
      </div>
      <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
        The anomaly layer watches y(t) minus y(t−52) residuals with a z-score test. Dates that line up with known shocks, not calendar noise.
      </p>

      <ol className="mt-6 divide-y divide-line/60">
        {events.map((e) => (
          <li key={`${e.port}-${e.yw}`} className="an-row flex items-center gap-4 py-3">
            <span className="w-24 shrink-0 font-mono text-xs tabular-nums text-muted">{ywToLabel(e.yw)}</span>
            <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${DIR_STYLE[e.dir].cls}`}>
              {DIR_STYLE[e.dir].label}
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-sm font-semibold">{e.label}</span>
              <span className="ml-2 text-xs text-muted">{e.port}</span>
            </span>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted" title="max absolute z-score">z {e.z}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-[10px] text-muted">source: anomaly_log.csv · z-score on 52-week seasonal residuals</p>
    </div>
  )
}
