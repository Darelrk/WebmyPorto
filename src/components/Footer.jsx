import { ArrowUpRight, Github, Globe2, Linkedin, Mail } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Medium: Globe2,
  Kaggle: Globe2,
}

export default function Footer({ data = {} }) {
  const reduceMotion = useReducedMotion()
  const linkedin = data.socialLinks?.find((item) => item.name === 'LinkedIn')

  return (
    <footer id="contact" className="container-shell py-20 sm:py-28">
      <motion.div
        className="grid gap-10 border-b border-line pb-14 lg:grid-cols-[1fr_auto] lg:items-end"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="text-xs font-bold text-coral">{data.eyebrow}</p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.9rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.08em]">{data.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">{data.description}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <a
            href={`mailto:${data.email ?? 'darelrafif.kz@gmail.com'}`}
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-ink active:translate-y-0"
          >
            Let&apos;s work together <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
          {linkedin?.url && linkedin.url !== '#' && (
            <a href={linkedin.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-ink transition hover:text-coral">
              LinkedIn profile
            </a>
          )}
        </div>
      </motion.div>

      <div className="flex flex-col justify-between gap-8 pt-8 sm:flex-row sm:items-center">
        <div>
          <a href="#home" className="text-lg font-bold tracking-[-0.08em]">darelrk<span className="text-coral">.</span></a>
          <p className="mt-2 text-xs text-muted">{data.copyright}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4" aria-label="Social links">
          {data.socialLinks?.map((social) => {
            const Icon = iconMap[social.name] ?? Mail
            const disabled = social.url === '#'
            return (
              <a
                key={social.name}
                href={disabled ? undefined : social.url}
                target={disabled ? undefined : '_blank'}
                rel={disabled ? undefined : 'noreferrer'}
                aria-disabled={disabled}
                className={`inline-flex items-center gap-2 text-sm transition ${disabled ? 'cursor-not-allowed text-muted/50' : 'text-ink hover:text-coral'}`}
              >
                <Icon size={16} strokeWidth={1.7} />
                {social.name}
              </a>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
