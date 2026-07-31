import { ArrowUpRight, FlaskConical } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import ResearchChart from './ResearchChart'

export default function FeaturedResearch({ data }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="research" className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <motion.div
          className="overflow-hidden rounded-[28px] bg-ink p-7 text-canvas sm:p-10 lg:p-14"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3 text-sm text-canvas/65">
                <FlaskConical size={18} className="text-coral" strokeWidth={1.5} />
                {data.eyebrow}
              </div>
              <h2 className="mt-8 max-w-xl text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.075em]">{data.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-canvas/70">{data.problem}</p>
              <div className="mt-9 grid gap-6 border-t border-canvas/15 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold text-coral">Method</p>
                  <p className="mt-2 text-sm leading-6 text-canvas/70">{data.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-coral">Evidence</p>
                  <p className="mt-2 text-sm leading-6 text-canvas/70">{data.results}</p>
                </div>
              </div>
              <a
                href={data.link}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-canvas hover:text-ink active:translate-y-0"
              >
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
              <div className="mt-8">
                <ResearchChart data={data.chartData} title={data.chartTitle} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
