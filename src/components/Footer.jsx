import { ArrowUpRight, Github, Globe2, Linkedin, Mail } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, useReducedMotionSafe, gsap } from '../lib/gsap'
import MagneticButton from './ui/MagneticButton'

export default function Footer({ data = {} }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)
  const linkedin = data.socialLinks?.find((item) => item.name === 'LinkedIn')

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.footer-heading', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    gsap.fromTo('.footer-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    gsap.fromTo('.social-link', { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <footer id="contact" ref={ref} className="container-shell py-20 sm:py-28">
      <div className="footer-heading grid gap-10 border-b border-line pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-bold text-coral">{data.eyebrow}</p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.9rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.08em]">{data.title}</h2>
          <p className="footer-desc mt-5 max-w-xl text-base leading-7 text-muted">{data.description}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <MagneticButton href={linkedin?.url ?? '#'} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-ink active:translate-y-0">
            Let&apos;s work together <ArrowUpRight size={16} strokeWidth={1.8} />
          </MagneticButton>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 pt-8 sm:flex-row sm:items-center">
        <div>
          <a href="#home" className="text-lg font-bold tracking-[-0.08em]">darelrk<span className="text-coral">.</span></a>
          <p className="mt-2 text-xs text-muted">{data.copyright}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4" aria-label="Social links">
          {data.socialLinks?.map((social) => {
            const Icon = { GitHub: Github, LinkedIn: Linkedin, Medium: Globe2, Kaggle: Globe2 }[social.name] ?? Mail
            const disabled = social.url === '#'
            return (
              <a
                key={social.name}
                href={disabled ? undefined : social.url}
                target={disabled ? undefined : '_blank'}
                rel={disabled ? undefined : 'noreferrer'}
                aria-disabled={disabled}
                className={`social-link inline-flex items-center gap-2 text-sm transition ${disabled ? 'cursor-not-allowed text-muted/50' : 'text-ink hover:text-coral'}`}
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
