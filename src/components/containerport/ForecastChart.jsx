import { useRef, useState } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../../lib/gsap'
import data from '../../lib/containerport'

const MODELS = [
  { key: 'lstm', label: 'LSTM', note: 'best on 8/10 ports' },
  { key: 'sarima', label: 'SARIMA', note: 'seasonal baseline challenger' },
  { key: 'xgboost', label: 'XGBoost', note: 'strong on small ports' },
]

function ywToDate(yw) {
  const y = Math.floor(yw / 100)
  const w = yw % 100
  const jan4 = new Date(Date.UTC(y, 0, 4))
  const day = jan4.getUTCDay() || 7
  const week1Mon = new Date(jan4)
  week1Mon.setUTCDate(jan4.getUTCDate() - day + 1)
  const d = new Date(week1Mon)
  d.setUTCDate(week1Mon.getUTCDate() + (w - 1) * 7)
  return d
}

function fmtTick(yw) {
  const d = ywToDate(yw)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

export default function ForecastChart() {
  const [port, setPort] = useState('Tanjung Priok')
  const [model, setModel] = useState('lstm')
  const [hover, setHover] = useState(null)
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.fc-line', { opacity: 0 }, {
      opacity: 1, duration: 0.9, ease: EASE_OUT, stagger: 0.15,
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    })
  }, { scope: ref, dependencies: [port, model], revertOnUpdate: true })

  const s = data.series[port]
  const weeks = s.weeks
  const actual = s.actual
  const pred = s[model]
  const n = weeks.length
  const W = 1000
  const H = 300
  const PAD = { l: 42, r: 12, t: 18, b: 26 }
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const values = actual.concat(pred.filter((v) => v != null))
  const vmax = Math.max(...values) * 1.08
  const x = (i) => PAD.l + (i / (n - 1)) * iw
  const y = (v) => PAD.t + ih - (v / vmax) * ih

  const line = (arr) => arr
    .map((v, i) => (v == null ? null : `${x(i)},${y(v)}`))
    .filter(Boolean)
    .join(' ')

  const actualPath = line(actual)
  const predPath = line(pred)

  const best = data.bestByPort[port]
  const hoveredPoint = hover != null ? { week: fmtTick(weeks[hover]), actual: actual[hover], pred: pred[hover] } : null

  // Model win/lose chip
  const isBest = best.model === model

  return (
    <div ref={ref} className="rounded-2xl border border-line/80 bg-white/40 p-5 sm:p-7 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">Walk-forward test, 86 weeks</p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{port}</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Best model here</p>
          <p className="font-mono text-sm font-bold">
            {best.model.toUpperCase()} · sMAPE {best.smape}% · skill +{best.skill}%
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose port">
        {Object.keys(data.series).map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={p === port}
            onClick={() => { setPort(p); setHover(null) }}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none ${
              p === port
                ? 'border-ink bg-ink text-canvas'
                : 'border-line/80 text-muted hover:border-ink/40 hover:text-ink'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Choose model">
        {MODELS.map((m) => (
          <button
            key={m.key}
            role="tab"
            aria-selected={m.key === model}
            onClick={() => setModel(m.key)}
            className={`rounded-md border px-3 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none ${
              m.key === model
                ? 'border-coral bg-coral/10 text-coral'
                : 'border-line/80 text-muted hover:border-coral/40 hover:text-ink'
            }`}
          >
            {m.label}
          </button>
        ))}
        <span className={`ml-1 self-center rounded-md px-2 py-1 font-mono text-[10px] ${isBest ? 'bg-coral/10 text-coral' : 'text-muted'}`}>
          {isBest ? 'best on this port' : 'challenger view'}
        </span>
      </div>

      <figure className="mt-6" aria-label={`Actual vs ${model} forecast for ${port}`}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full touch-none" role="img">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih * f} y2={PAD.t + ih * f}
              stroke="currentColor" strokeWidth="0.5" className="text-line" />
          ))}
          <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih} y2={PAD.t + ih}
            stroke="currentColor" strokeWidth="1" className="text-line" />
          {[0, 0.5, 1].map((f) => {
            const v = Math.round(vmax * (1 - f) / 5) * 5
            return (
              <text key={f} x={PAD.l - 6} y={PAD.t + ih * f + 3.5} textAnchor="end"
                className="fill-current font-mono text-[10px] text-muted">{v}</text>
            )
          })}
          {[0, Math.floor(n / 2), n - 1].map((i) => (
            <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
              className="fill-current font-mono text-[10px] text-muted">{fmtTick(weeks[i])}</text>
          ))}

          <polyline points={predPath} fill="none" stroke="#e85d4a" strokeWidth="2" strokeDasharray="1 0" className="fc-line" />
          <polyline points={actualPath} fill="none" stroke="currentColor" strokeWidth="1.6"
            className="text-ink fc-line" strokeLinejoin="round" />

          {weeks.map((yw, i) => (
            <rect key={yw} x={x(i) - iw / (2 * n)} y={PAD.t} width={iw / n} height={ih}
              fill="transparent" className="cursor-crosshair"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
          ))}
          {hover != null && pred[hover] != null && (
            <g pointerEvents="none">
              <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={PAD.t + ih}
                stroke="#e85d4a" strokeWidth="0.75" strokeDasharray="3 3" />
              <circle cx={x(hover)} cy={y(actual[hover])} r="4" className="fill-canvas stroke-current text-ink" strokeWidth="1.5" />
              <circle cx={x(hover)} cy={y(pred[hover])} r="4" fill="#e85d4a" />
            </g>
          )}
        </svg>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-ink" aria-hidden="true" />actual calls</span>
            <span className="inline-flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-coral" aria-hidden="true" />{model} forecast</span>
          </span>
          {hoveredPoint ? (
            <span className="font-mono text-[11px]">
              wk {hoveredPoint.week}: actual {hoveredPoint.actual} · forecast {Math.round(hoveredPoint.pred)}
            </span>
          ) : (
            <span className="text-muted/80">hover the chart to inspect a week</span>
          )}
        </figcaption>
      </figure>
    </div>
  )
}
