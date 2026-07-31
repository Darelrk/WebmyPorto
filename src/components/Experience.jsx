import { ArrowUpRight, Briefcase } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const cleanText = (value = '') => value.replace(/\*\*/g, '')

export default function Experience({ data = [] }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="experience" className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold text-coral">Experience</p>
            <h2 className="mt-4 max-w-sm text-[clamp(2.7rem,5vw,4.4rem)] font-bold leading-[0.96] tracking-[-0.075em]">Experience applying data to real work.</h2>
          </div>
          <div className="divide-y divide-line/80 border-y border-line/80">
            {data.map((item, index) => (
              <motion.article
                key={item.id}
                className="grid gap-6 py-9 sm:grid-cols-[0.2fr_1fr] sm:gap-8"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start justify-between gap-4 sm:block">
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <span className="rounded-full border border-line px-3 py-1.5 text-xs text-muted sm:mt-4 sm:inline-block">{item.period}</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-0.05em]">{item.role}</h3>
                      <p className="mt-1 text-sm text-coral">{item.company}</p>
                    </div>
                    <Briefcase size={20} className="text-muted" strokeWidth={1.5} />
                  </div>
                  <div className="mt-7 grid gap-6 md:grid-cols-[1fr_auto]">
                    <ul className="space-y-3 text-sm leading-6 text-muted">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                          <span>{cleanText(highlight)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap content-start gap-2 md:max-w-[12rem] md:justify-end">
                      {item.tech.map((tech) => (
                        <span key={tech} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/70">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-coral">
                    Let&apos;s work together <ArrowUpRight size={16} strokeWidth={1.8} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
