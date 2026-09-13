import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../../lib/gsap'
import data from '../../data/casestudies.json'

// ===== block renderers (data-driven, no per-project components) =====
function FanChart({ d }) {
  const s = d.scenarios
  const [W, H] = [300, 300]
  const PAD = { l: 46, r: 14, t: 16, b: 28 }
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const vals = s.flatMap((r) => [r.p10, r.p90, r.arima, r.lstm, r.xgb, r.ensemble])
  const vmax = Math.max(...vals) + 2
  const vmin = Math.min(...vals) - 2
  const x = (i) => PAD.l + (i / (s.length - 1)) * iw
  const y = (v) => PAD.t + ih - ((v - vmin) / (vmax - vmin)) * ih
  const line = (key) => s.map((r, i) => `${x(i)},${y(r[key])}`).join(' ')
  const band = s.map((r, i) => `${x(i)},${y(r.p90)}`).join(' ')
    + ' ' + [...s].map((r, i) => `${x(s.length - 1 - i)},${y(s[s.length - 1 - i].p10)}`).join(' ')
  return (
    <figure aria-label="Fan chart of credit gap forecasts">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih * f} y2={PAD.t + ih * f} className="stroke-line" strokeWidth="0.5" />
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih} y2={PAD.t + ih} className="stroke-line" strokeWidth="1" />
        <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} className="stroke-muted" strokeWidth="0.75" strokeDasharray="4 3" />
        <polygon points={band} fill="rgba(232,93,74,0.10)" />
        <polyline points={line('ensemble')} fill="none" stroke="#e85d4a" strokeWidth="2.2" />
        <polyline points={line('lstm')} fill="none" className="stroke-ink" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />
        <polyline points={line('arima')} fill="none" className="stroke-ink" strokeWidth="1" opacity="0.35" strokeDasharray="2 2" />
        {[0, Math.floor(s.length / 2), s.length - 1].map((i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === s.length - 1 ? 'end' : 'middle'} className="fill-current font-mono text-[10px] text-muted">{s[i].date}</text>
        ))}
        <text x={PAD.l - 6} y={y(0) + 3.5} textAnchor="end" className="fill-current font-mono text-[10px] text-muted">0</text>
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-coral" aria-hidden="true" />ensemble</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-5 rounded-sm bg-coral/10" aria-hidden="true" />P10-P90 band</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-ink/40" aria-hidden="true" />LSTM / ARIMA</span>
      </figcaption>
    </figure>
  )
}

function BarCompare({ d }) {
  const t = d.table
  const max = Math.max(...t.map((r) => r.accuracy))
  const base = t.find((r) => r.model === 'Original')?.accuracy ?? 0
  return (
    <figure aria-label="Accuracy comparison bar chart">
      <div className="flex h-[240px] items-end gap-3 border-b border-line pb-0 sm:gap-5">
        {t.map((r) => (
          <div key={r.model} className="flex h-full flex-1 flex-col justify-end gap-2">
            <span className={`text-center font-mono text-[11px] tabular-nums ${r.featured ? 'text-coral font-bold' : 'text-muted'}`}>{r.accuracy}%</span>
            <div className={`chart-bar w-full rounded-t-[5px] ${r.featured ? 'bg-coral' : r.model === 'Original' ? 'bg-ink/70' : 'bg-ink/20'}`}
              style={{ height: `${(r.accuracy / max) * 82}%` }} />
            <span className="text-center font-mono text-[10px] leading-tight text-muted">{r.model}<br />{r.type}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-4">
        <div className="absolute left-0 right-0 border-t border-dashed border-ink/40" style={{ bottom: `${(base / max) * 82 * 0.92}%` }} aria-hidden="true" />
        <span className="absolute right-0 font-mono text-[10px] text-muted" style={{ bottom: '4px' }}>original data: {base}%</span>
      </div>
    </figure>
  )
}

function MetricTable({ d }) {
  const t = d.table
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Full benchmark metrics per framework</caption>
      <thead>
        <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          <th scope="col" className="pb-3 pr-3">Framework</th>
          <th scope="col" className="pb-3 pr-3">Accuracy</th>
          <th scope="col" className="pb-3 pr-3">AUC-ROC</th>
          <th scope="col" className="pb-3 pr-3">Precision</th>
          <th scope="col" className="pb-3 pr-3">Recall</th>
          <th scope="col" className="pb-3">F1</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line/60">
        {t.map((r) => (
          <tr key={r.model} className={r.featured ? 'bg-coral/[0.06]' : ''}>
            <th scope="row" className="py-3 pr-3 text-sm font-semibold">{r.model}{r.featured && <span className="ml-2 rounded-md bg-coral/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-coral">best</span>}</th>
            <td className="py-3 pr-3 font-mono text-sm tabular-nums">{r.accuracy}%</td>
            <td className="py-3 pr-3 font-mono text-sm tabular-nums">{r.auc.toFixed(4)}</td>
            <td className="py-3 pr-3 font-mono text-sm tabular-nums">{r.precision}%</td>
            <td className="py-3 pr-3 font-mono text-sm tabular-nums">{r.recall}%</td>
            <td className="py-3 font-mono text-sm tabular-nums">{r.f1}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function MethodBars({ d }) {
  const m = [...d.methods].sort((a, b) => a.rmse - b.rmse)
  const max = Math.max(...m.map((r) => r.rmse))
  const CAT = { 'Deep Learning': 'bg-coral', 'Hybrid V2': 'bg-ink/45', 'Hybrid V1': 'bg-ink/30', 'Pure Classical': 'bg-ink/15' }
  return (
    <ul className="space-y-4" aria-label="RMSE per method">
      {m.map((r, i) => (
        <li key={r.name}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-semibold">{i === 0 ? r.name + ' ' : r.name}<span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-muted">{r.category}</span></span>
            <span className={`font-mono text-sm tabular-nums ${i === 0 ? 'text-coral font-bold' : 'text-muted'}`}>{r.rmse}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-sm bg-line/50">
            <div className={`h-full rounded-sm ${CAT[r.category] ?? 'bg-ink/20'}`} style={{ width: `${(r.rmse / max) * 100}%` }} />
          </div>
          <p className="mt-1 text-xs text-muted">{r.note}</p>
        </li>
      ))}
    </ul>
  )
}

function GemList({ d }) {
  return (
    <ol className="divide-y divide-line/60" aria-label="Hidden gem universities">
      {d.hiddenGems.map((g, i) => (
        <li key={g.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5">
          <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
          <span className="min-w-0 flex-1">
            <span className="text-sm font-semibold">{g.name}</span>
            <span className="ml-2 text-xs text-muted">{g.country}</span>
          </span>
          <span className="font-mono text-xs tabular-nums text-muted">QS {g.qs}</span>
          <span className="font-mono text-xs text-coral">CS {g.cs}</span>
          <span className="rounded-md bg-coral/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-coral">+{g.delta}</span>
        </li>
      ))}
    </ol>
  )
}

function FindingList({ d }) {
  const items = [
    { t: 'Simple architecture works best', d: 'Encoder 64-32-16 with a mirrored decoder. Every added mechanism made it worse.' },
    { t: 'Dynamic masking hurt', d: 'The fixed 0.4 mask rate beat adaptive schemes on every fold.' },
    { t: 'The baseline was already optimal', d: 'Hybrids seeded with MAE features never surpassed the plain MAE.' },
    { t: 'Classical methods stay flat', d: 'KMeans and KNN show near-zero variance across folds: stable but weaker.' },
  ]
  return (
    <ol className="space-y-5">
      {items.map((f, i) => (
        <li key={f.t} className="flex gap-4">
          <span className="mt-1 font-mono text-xs font-bold text-coral">{String(i + 1).padStart(2, '0')}</span>
          <span>
            <strong className="text-sm">{f.t}.</strong>{' '}
            <span className="text-sm leading-6 text-muted">{f.d}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function WhyList({ items }) {
  return (
    <ol className="space-y-5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4">
          <span className="mt-1 font-mono text-xs font-bold text-coral">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-sm leading-6 text-muted">{it}</span>
        </li>
      ))}
    </ol>
  )
}

function InsightList({ d }) {
  return (
    <ol className="space-y-5">
      {d.insights.map((it, i) => (
        <li key={it.title} className="flex gap-4">
          <span className="mt-1 font-mono text-xs font-bold text-coral">{String(i + 1).padStart(2, '0')}</span>
          <span>
            <strong className="text-sm">{it.title}.</strong>{' '}
            <span className="text-sm leading-6 text-muted">{it.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function MethodSteps({ steps }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2">
      {steps.map((s) => (
        <li key={s.n} className="flex gap-4">
          <span className="mt-0.5 font-mono text-xs font-bold text-coral">{s.n}</span>
          <span>
            <strong className="block text-sm">{s.t}.</strong>
            <span className="text-sm leading-6 text-muted">{s.d}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

// ===== shell =====

export default function WorkBody({ blocks, dkey }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.wb-reveal', { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT, stagger: 0.07,
      scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true },
    })
  }, { scope: ref, revertOnUpdate: true })

  const d = data[dkey]

  const render = (b, i) => {
    const shell = (children) => (
      <section key={i} className="wb-reveal rounded-2xl border border-line/80 bg-white/40 p-5 sm:p-7 dark:bg-white/[0.03]">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">{b.title}</p>
        {b.note && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{b.note}</p>}
        <div className="mt-6">{children}</div>
      </section>
    )
    switch (b.type) {
      case 'fan-chart': return shell(<FanChart d={d} />)
      case 'bar-compare': return shell(<BarCompare d={d} />)
      case 'metric-table': return shell(<MetricTable d={d} />)
      case 'method-bars': return shell(<MethodBars d={d} />)
      case 'gem-list': return shell(<GemList d={d} />)
      case 'why-list': return shell(<WhyList items={b.items} />)
      case 'insight-list': return shell(<InsightList d={d} />)
      case 'finding-list': return shell(<FindingList d={d} />)
      case 'method-steps': return shell(<MethodSteps steps={b.steps} />)
      default: return null
    }
  }

  return (
    <div ref={ref} className="mt-10 space-y-6">
      {blocks.map(render)}
    </div>
  )
}
