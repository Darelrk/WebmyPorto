import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero({ data }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative overflow-hidden border-b border-line/80">
      <div className="container-shell grid min-h-[calc(100dvh-72px)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-5">{data.eyebrow}</p>
          <h1 className="max-w-3xl text-[clamp(3rem,5vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.085em] text-ink">
            {data.title}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {data.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${data.email ?? 'darelrafif.kz@gmail.com'}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-coral active:translate-y-0"
            >
              {data.cta}
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
            <a
              href={data.secondaryHref ?? '#projects'}
              className="inline-flex items-center gap-2 px-1 py-3 text-sm font-bold text-ink transition hover:text-coral"
            >
              {data.secondaryCta}
              <ArrowDownRight size={16} strokeWidth={1.8} />
            </a>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-line pt-5">
            {data.stats?.map((stat) => (
              <div key={stat.label} className="pr-4">
                <p className="eyebrow text-ink/70">{stat.label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[430px] sm:min-h-[560px]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-x-0 top-8 bottom-0 overflow-hidden rounded-[28px] bg-mist sm:inset-x-8 sm:top-12">
            <img
              src="/profile_circle.png"
              alt="Portrait of Darrell Rafif Kenzie"
              className="h-full w-full object-cover object-center grayscale-[0.15] mix-blend-multiply"
              width="500"
              height="500"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-canvas">
              <p className="max-w-[15rem] text-sm leading-5">
                {data.caption}
              </p>
              <ArrowDownRight size={22} strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute right-0 top-0 w-40 rounded-2xl bg-coral p-5 text-canvas shadow-float sm:right-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-canvas/75">{data.featuredLabel}</p>
            <p className="mt-6 text-4xl font-bold tracking-[-0.08em]">{data.featuredStudy}</p>
            <p className="mt-2 text-xs leading-4 text-canvas/80">{data.featuredDescription}</p>
          </div>
          <div className="absolute bottom-4 left-0 w-48 rounded-2xl border border-line bg-canvas/95 p-4 shadow-soft sm:left-2">
            <p className="text-xs font-bold text-ink">Open to</p>
            <p className="mt-1 text-xs leading-4 text-muted">Data science roles and project collaboration.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
