import { ArrowUpRight, Award, CalendarDays } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'

export default function Education({ educationData = [], certificationData = [] }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.edu-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT,
      scrollTrigger: { trigger: '.edu-label', start: 'top 85%', once: true } })
    gsap.fromTo('.edu-heading', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: '.edu-heading', start: 'top 82%', once: true } })
    gsap.fromTo('.edu-current', { opacity: 0, y: 32 },
      { opacity: 0.94, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.edu-current', start: 'top 80%', once: true } })
    gsap.fromTo('.edu-cert', { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, stagger: 0.08,
        scrollTrigger: { trigger: '.edu-cert-list', start: 'top 85%', once: true } })
  }, { scope: ref, revertOnUpdate: true })

  const education = educationData[0]

  return (
    <section id="education" ref={ref} className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <div className="flex flex-col justify-between gap-5 border-b border-line pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="edu-label text-xs font-bold text-coral">Education</p>
            <h2 className="edu-heading mt-4 max-w-2xl text-[clamp(2.7rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.07em]">A foundation for rigorous, practical work.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted">Formal study and certifications that support the work.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <article className="edu-current relative overflow-hidden rounded-[24px] bg-ink p-7 text-canvas sm:p-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-canvas/10" aria-hidden="true" />
            <div className="relative flex items-start justify-between gap-4">
              <p className="font-mono text-[10px] font-bold text-canvas/60">Current study</p>
              <CalendarDays size={20} strokeWidth={1.5} className="text-coral" />
            </div>
            <h3 className="relative mt-20 max-w-md text-3xl font-bold leading-tight tracking-[-0.06em]">{education?.degree}</h3>
            <p className="relative mt-3 text-base text-canvas/70">{education?.school}</p>
            <div className="relative mt-10 flex flex-wrap items-center gap-3 text-xs text-canvas/65">
              <span className="rounded-full border border-canvas/20 px-3 py-1.5">{education?.period}</span>
              <span className="rounded-full border border-coral/60 px-3 py-1.5 text-coral">GPA {education?.gpa}</span>
            </div>
            <p className="relative mt-8 max-w-md text-sm leading-6 text-canvas/65">{education?.description}</p>
          </article>

          <div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-xl font-bold tracking-[-0.04em]">Certifications</h3>
              <Award size={20} className="text-coral" strokeWidth={1.5} />
            </div>
            <div className="divide-y divide-line/80">
              {certificationData.map((item, index) => (
                <article key={item.id} className="edu-cert group grid gap-3 py-7 sm:grid-cols-[0.25fr_1fr_auto] sm:gap-6">
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <div>
                    <h4 className="text-lg font-bold tracking-[-0.04em]">{item.name}</h4>
                    <p className="mt-1 text-sm text-coral">{item.issuer}</p>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral" size={19} strokeWidth={1.5} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
