import { BarChart3, Brain, ChevronDown, Code2, Database, Settings2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useGSAP, EASE_OUT, gsap } from '../lib/gsap'

const iconMap = {
  Brain: Brain,
  Settings: Settings2,
  BarChart3,
  Code: Code2,
  Database,
}

// Proficiency map — values 0-100
const PROFICIENCY = {
  Python: 93, Pandas: 88, NumPy: 87, SQL: 90, 'Looker Studio': 82,
  PyTorch: 85, XGBoost: 88, LSTM: 80, MAE: 78,
  'n8n': 85, 'Web Scraping': 82, 'Microsoft Excel': 90, 'SAP Analytics Cloud': 75,
  'Data validation': 92, Automation: 88,
}

// Associate tools with projects based on tech used
const USED_IN = {
  Python: ['Tabular Synthesis LLM', 'Missing Data Imputation', 'AFCEA Forecasting'],
  Pandas: ['Tabular Synthesis LLM', 'Missing Data Imputation'],
  NumPy: ['Missing Data Imputation'],
  SQL: ['Tabular Synthesis LLM', 'AFCEA Forecasting'],
  'Looker Studio': ['AFCEA Forecasting'],
  PyTorch: ['Tabular Synthesis LLM'],
  XGBoost: ['Tabular Synthesis LLM'],
  LSTM: ['AFCEA Forecasting'],
  MAE: ['AFCEA Forecasting'],
  'n8n': ['PLN Data Automation'],
  'Web Scraping': ['Blockchain QA'],
  'Microsoft Excel': ['AFCEA Forecasting', 'PLN Data Automation'],
  'SAP Analytics Cloud': ['ADSE Certification'],
  'Data validation': ['PLN Data Automation', 'Blockchain QA'],
  Automation: ['PLN Data Automation'],
}

function SkillTag({ tool }) {
  const [open, setOpen] = useState(false)
  const tagRef = useRef(null)
  const prof = PROFICIENCY[tool]
  const usedIn = USED_IN[tool] || []

  return (
    <div className="relative">
      <button
        ref={tagRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={`cursor-pointer rounded-full border transition-all hover:scale-[1.03] hover:shadow-sm ${open ? 'border-coral bg-coral/10' : 'border-ink/10'}`}
      >
        <span className={`px-2.5 py-1 text-xs font-medium ${open ? 'text-coral' : ''}`}>{tool}</span>
        <ChevronDown size={10} className={`inline ml-1 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-[min(12rem,calc(100vw-2rem))] rounded-xl border border-line bg-canvas p-3 shadow-soft">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink">Proficiency</span>
            <span className="text-coral">{prof ?? 70}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-line">
            <div
              className="h-full rounded-full bg-coral"
              style={{ width: `${prof ?? 70}%` }}
            />
          </div>
          {usedIn.length > 0 && (
            <div className="mt-2 border-t border-line pt-2">
              <p className="text-[10px] font-medium text-muted">Used in:</p>
              <ul className="mt-1 space-y-0.5">
                {usedIn.slice(0, 3).map((p) => (
                  <li key={p} className="text-[11px] text-ink">{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Expertise({ data = [], softSkills = [] }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.exp-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    gsap.fromTo('.exp-heading', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
    gsap.fromTo('.exp-card', { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, stagger: 0.09,
        scrollTrigger: { trigger: '.exp-grid', start: 'top 82%', once: true } })
    gsap.fromTo('.skill-chip', { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.05,
        scrollTrigger: { trigger: '.skill-list', start: 'top 88%', once: true } })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <section id="expertise" ref={ref} className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2.7rem,5vw,4.7rem)] font-bold leading-[0.96] tracking-[-0.075em]">Tools that turn questions into useful systems.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">A practical toolkit for finding signal, testing ideas, and making the result useful to the people who need it.</p>
        </div>

        <div className="exp-grid mt-14 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {data.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Code2
            const featured = index === 0
            return (
              <article key={item.id}
                className={`exp-card group relative overflow-hidden rounded-[22px] p-7 sm:p-9 ${featured ? 'min-h-[300px] bg-coral text-canvas lg:row-span-2' : 'min-h-[230px] bg-mist text-ink'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${featured ? 'border-canvas/30' : 'border-ink/15'}`}>
                    <Icon size={21} strokeWidth={1.5} />
                  </div>
                  <span className={`font-mono text-xs ${featured ? 'text-canvas/65' : 'text-ink/55'}`}>0{index + 1}</span>
                </div>
                <div className="mt-16 max-w-md">
                  <h3 className="text-2xl font-bold tracking-[-0.05em]">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${featured ? 'text-canvas/75' : 'text-ink/70'}`}>{item.description}</p>
                  {item.tools?.length > 0 && (
                    <div className={`mt-5 flex flex-wrap gap-2 ${featured ? 'text-canvas/80' : 'text-ink/70'}`}>
                      {item.tools.map((tool) => (
                        <SkillTag key={`${item.id}-${tool}`} tool={tool} />
                      ))}
                    </div>
                  )}
                </div>
                {featured && (
                  <div className="absolute -bottom-10 -right-7 hidden h-44 w-44 rounded-full border border-canvas/25 transition-transform duration-500 group-hover:scale-110 md:block" aria-hidden="true" />
                )}
              </article>
            )
          })}
        </div>
        {softSkills.length > 0 && (
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">How I work</p>
            <div className="skill-list mt-4 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span key={skill} className="skill-chip rounded-full border border-line px-3 py-1.5 text-sm text-muted">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
