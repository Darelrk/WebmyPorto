import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function About({ data, expertise = [] }) {
  const reduceMotion = useReducedMotion()
  const highlights = [
    {
      title: expertise[0]?.title ?? 'Data analysis',
      text: expertise[0]?.description ?? 'Turn raw data into findings teams can use.',
      className: 'bg-ink text-canvas',
    },
    {
      title: expertise[1]?.title ?? 'Machine learning and research',
      text: expertise[1]?.description ?? 'Build and evaluate models for real data problems.',
      className: 'bg-mist text-ink',
    },
  ]

  return (
    <section id="about" className="border-b border-line/80">
      <div className="container-shell grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
        <div>
          <p className="text-xs font-bold text-coral">{data.label ?? 'About'}</p>
          <p className="mt-6 max-w-[14rem] text-sm leading-6 text-muted">
            {data.supportLine}
          </p>
        </div>
        <div>
          <motion.h2
            className="max-w-3xl text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.96] tracking-[-0.075em] text-ink"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {data.heading}
          </motion.h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{data.text}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-ink">
            <span className="rounded-full border border-line px-3 py-2">{data.institution}</span>
            <span className="rounded-full border border-line px-3 py-2">{data.degree}</span>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-[1.35fr_0.65fr]">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                className={`rounded-[22px] p-6 sm:min-h-[210px] ${item.className}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[14rem] text-xl font-bold tracking-[-0.04em]">{item.title}</h3>
                  <ArrowUpRight size={19} strokeWidth={1.6} />
                </div>
                <p className={`mt-16 max-w-sm text-sm leading-6 ${index === 0 ? 'text-canvas/70' : 'text-ink/70'}`}>
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
