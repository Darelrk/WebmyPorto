import data from '../../lib/containerport'

const MODEL_ORDER = ['naive', 'sarima', 'xgboost', 'lstm']
const MODEL_LABEL = { naive: 'Seasonal naive', sarima: 'SARIMA', xgboost: 'XGBoost', lstm: 'LSTM' }

export default function ModelLadder() {
  const rows = [...data.priokModels]
    .sort((a, b) => MODEL_ORDER.indexOf(a.model) - MODEL_ORDER.indexOf(b.model))
  const maxSmape = Math.max(...rows.map((r) => r.smape))
  const minSmape = Math.min(...rows.map((r) => r.smape))
  const best = rows.find((r) => r.smape === minSmape)

  return (
    <div className="rounded-2xl border border-line/80 bg-white/40 p-5 sm:p-7 dark:bg-white/[0.03]">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">Model ladder, one port</p>
      <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Tanjung Priok, weekly calls</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        Every model is scored under the same expanding-window walk-forward. The naive baseline is the bar to clear; LSTM clears it with the lowest error.
      </p>

      <table className="mt-6 w-full text-left">
        <caption className="sr-only">Model comparison for Tanjung Priok weekly container calls</caption>
        <thead>
          <tr className="border-b border-line/80 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <th scope="col" className="pb-3 pr-2 font-semibold">Model</th>
            <th scope="col" className="pb-3 pr-2 font-semibold">sMAPE</th>
            <th scope="col" className="pb-3 font-semibold">Skill vs naive</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {rows.map((r) => (
            <tr key={r.model} className={r.model === best.model ? '' : ''}>
              <th scope="row" className="py-3 pr-2 text-sm font-semibold">
                {MODEL_LABEL[r.model] || r.model}
                {r.model === best.model && (
                  <span className="ml-2 rounded-md bg-coral/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-coral">best</span>
                )}
              </th>
              <td className="py-3 pr-2">
                <div className="flex items-center gap-2">
                  <span className="w-12 font-mono text-sm tabular-nums">{r.smape}%</span>
                  <span className="h-2 rounded-sm bg-line" style={{ width: `${(r.smape / maxSmape) * 100}%` }} aria-hidden="true" />
                </div>
              </td>
              <td className="py-3 font-mono text-sm tabular-nums">
                {r.skill === 0
                  ? <span className="text-muted">baseline</span>
                  : <span className={r.skill > 0 ? 'text-coral' : 'text-muted'}>{r.skill > 0 ? '+' : ''}{r.skill}%</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 font-mono text-[10px] text-muted">lower is better · skill = error reduction vs seasonal naive</p>
    </div>
  )
}
