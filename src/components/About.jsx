import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'

export default function About({ data, expertise = [] }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.about-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT,
      scrollTrigger: { trigger: '.about-eyebrow', start: 'top 85%', once: true } })
    gsap.fromTo('.about-h2', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT,
      scrollTrigger: { trigger: '.about-h2', start: 'top 80%', once: true } })
    gsap.fromTo('.about-body', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT,
      scrollTrigger: { trigger: '.about-body', start: 'top 85%', once: true } })
    gsap.fromTo('.about-pills span', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.07,
      scrollTrigger: { trigger: '.about-pills', start: 'top 88%', once: true } })
    gsap.fromTo('.hl-card', { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: EASE_OUT, stagger: 0.12,
        scrollTrigger: { trigger: '.about-grid', start: 'top 82%', once: true } })
  }, { scope: ref, revertOnUpdate: true })

  const highlights = [
    { title: expertise[0]?.title ?? 'Data analysis', text: expertise[0]?.description ?? 'Turn raw data into findings teams can use.', className: 'bg-ink text-canvas' },
    { title: expertise[1]?.title ?? 'Machine learning and research', text: expertise[1]?.description ?? 'Build and evaluate models for real data problems.', className: 'bg-mist text-ink' },
  ]

  return (
    <section id="about" ref={ref} className="border-b border-line/80">
      <div className="container-shell grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
        <div>
          <p className="about-eyebrow text-xs font-bold text-coral">{data.label ?? 'About'}</p>
          <p className="mt-6 max-w-[14rem] text-sm leading-6 text-muted">{data.supportLine}</p>
        </div>
        <div>
          <h2 className="about-h2 max-w-3xl text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.96] tracking-[-0.075em] text-ink">{data.heading}</h2>
          <p className="about-body mt-7 max-w-2xl text-lg leading-8 text-muted">{data.text}</p>
          <div className="about-pills mt-6 flex flex-wrap gap-3 text-sm font-semibold text-ink">
            <span className="rounded-full border border-line px-3 py-2">{data.institution}</span>
            <span className="rounded-full border border-line px-3 py-2">{data.degree}</span>
          </div>
          <div className="about-grid mt-12 grid gap-4 sm:grid-cols-[1.35fr_0.65fr]">
            {highlights.map((item, index) => (
              <article key={item.title} className={`hl-card rounded-[22px] p-6 sm:min-h-[210px] ${item.className}`}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[14rem] text-xl font-bold tracking-[-0.04em]">{item.title}</h3>
                  <ArrowUpRight size={19} strokeWidth={1.6} />
                </div>
                <p className={`mt-16 max-w-sm text-sm leading-6 ${index === 0 ? 'text-canvas/70' : 'text-ink/70'}`}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
