import { BarChart3, Brain, ChevronDown, Code2, Database, Settings2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useGSAP, EASE_OUT, EASE_BOUNCE, gsap } from '../lib/gsap'
import TextReveal from './ui/TextReveal'

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

function CategoryCard({ item, index }) {
  const [activeTool, setActiveTool] = useState(null)
  const Icon = iconMap[item.icon] ?? Code2
  const featured = index === 0

  const activeProf = activeTool ? (PROFICIENCY[activeTool] ?? 70) : null
  const activeUsedIn = activeTool ? (USED_IN[activeTool] || []) : []

  return (
    <article
      className={`exp-card group relative overflow-hidden rounded-[22px] p-7 sm:p-9 transition-all duration-300 ${
        featured ? 'min-h-[320px] bg-coral text-canvas lg:row-span-2' : 'min-h-[240px] bg-mist text-ink'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full border ${
            featured ? 'border-canvas/30' : 'border-ink/15'
          }`}
        >
          <Icon size={21} strokeWidth={1.5} />
        </div>
        <span className={`font-mono text-xs ${featured ? 'text-canvas/65' : 'text-ink/55'}`}>
          0{index + 1}
        </span>
      </div>
      <div className="mt-10 max-w-md">
        <h3 className="text-2xl font-bold tracking-[-0.05em]">{item.title}</h3>
        <p className={`mt-3 text-sm leading-6 ${featured ? 'text-canvas/75' : 'text-ink/70'}`}>
          {item.description}
        </p>

        {item.tools?.length > 0 && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool) => {
                const isActive = activeTool === tool
                return (
                  <button
                    key={`${item.id}-${tool}`}
                    type="button"
                    onClick={() => setActiveTool(isActive ? null : tool)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? featured
                          ? 'border border-canvas bg-canvas text-ink font-bold shadow-sm scale-[1.03]'
                          : 'border border-coral bg-coral text-canvas font-bold shadow-sm scale-[1.03]'
                        : featured
                        ? 'border border-canvas/25 bg-canvas/10 text-canvas hover:bg-canvas/20 hover:border-canvas/40'
                        : 'border border-ink/15 bg-canvas/70 text-ink hover:bg-canvas hover:border-ink/30'
                    }`}
                  >
                    <span>{tool}</span>
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-200 ${
                        isActive ? 'rotate-180' : 'opacity-60'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {activeTool && (
              <div
                className={`mt-4 rounded-xl border p-4 transition-all duration-300 ${
                  featured
                    ? 'border-canvas/25 bg-ink/40 text-canvas backdrop-blur-md'
                    : 'border-line bg-canvas text-ink shadow-soft'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{activeTool}</span>
                    <span className={`text-[11px] ${featured ? 'text-canvas/70' : 'text-muted'}`}>
                      Proficiency
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      featured ? 'text-canvas' : 'text-coral'
                    }`}
                  >
                    {activeProf}%
                  </span>
                </div>

                <div
                  className={`mt-2 h-1.5 w-full overflow-hidden rounded-full ${
                    featured ? 'bg-canvas/20' : 'bg-line'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      featured ? 'bg-canvas' : 'bg-coral'
                    }`}
                    style={{ width: `${activeProf}%` }}
                  />
                </div>

                {activeUsedIn.length > 0 && (
                  <div
                    className={`mt-3 border-t pt-2.5 ${
                      featured ? 'border-canvas/15' : 'border-line'
                    }`}
                  >
                    <p
                      className={`text-[10px] font-medium uppercase tracking-wider ${
                        featured ? 'text-canvas/60' : 'text-muted'
                      }`}
                    >
                      Used in projects:
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {activeUsedIn.map((project) => (
                        <span
                          key={project}
                          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                            featured
                              ? 'bg-canvas/15 text-canvas border border-canvas/20'
                              : 'bg-mist/60 text-ink border border-line/80'
                          }`}
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {featured && (
        <div
          className="absolute -bottom-10 -right-7 hidden h-44 w-44 rounded-full border border-canvas/25 transition-transform duration-500 group-hover:scale-110 md:block"
          aria-hidden="true"
        />
      )}
    </article>
  )
}

export default function Expertise({ data = [], softSkills = [] }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.exp-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    gsap.fromTo('.exp-heading', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT,
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
    gsap.fromTo('.exp-card', { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, stagger: 0.09,
        scrollTrigger: { trigger: '.exp-grid', start: 'top 82%', once: true } })
    gsap.fromTo('.skill-chip', { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 0.5, ease: EASE_BOUNCE, stagger: 0.05,
        scrollTrigger: { trigger: '.skill-list', start: 'top 88%', once: true } })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <section id="expertise" ref={ref} className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <div className="max-w-3xl">
          <TextReveal as="h2" text="Tools that turn questions into useful systems." className="text-[clamp(2.7rem,5vw,4.7rem)] font-bold leading-[0.96] tracking-[-0.075em]" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">A practical toolkit for finding signal, testing ideas, and making the result useful to the people who need it.</p>
        </div>

        <div className="exp-grid mt-14 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {data.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
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
