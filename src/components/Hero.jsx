import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, EASE_IN_OUT, gsap } from '../lib/gsap'

export default function Hero({ data }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.timeline()
      .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT })
      .fromTo('.hero-title', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: EASE_OUT }, '-=0.2')
      .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 0.88, y: 0, duration: 0.65, ease: EASE_OUT }, '-=0.35')
      .fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: EASE_OUT }, '-=0.45')
      .fromTo('.hero-stats', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT }, '-=0.35')
      .fromTo('.hero-image-wrap', { opacity: 0, scale: 0.94, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: EASE_IN_OUT }, '-=0.55')
      .fromTo('.hero-card-coral', { opacity: 0, y: 10, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(2)' }, '-=0.25')
      .fromTo('.hero-card-open', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.3')
    // Subtle parallax on image + float on coral card
    gsap.to('.hero-image-wrap', {
      yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: '.hero-image-wrap', start: 'top bottom', end: 'bottom top', scrub: true }
    })
    gsap.to('.hero-card-coral', {
      y: -8, ease: 'none',
      scrollTrigger: { trigger: '.hero-card-coral', start: 'top bottom', end: 'bottom top', scrub: true }
    })
    // Magnetic CTA buttons
    gsap.utils.toArray('.hero-cta a').forEach((a) => {
      a.addEventListener('mouseenter', () => gsap.to(a, { y: -3, scale: 1.03, duration: 0.3, ease: 'elastic.out(1.2, 0.4)' }))
      a.addEventListener('mouseleave', () => gsap.to(a, { y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }))
      a.addEventListener('mousedown', () => gsap.to(a, { scale: 0.97, duration: 0.15, ease: 'power2.in' }))
      a.addEventListener('mouseup', () => gsap.to(a, { scale: 1.03, duration: 0.2, ease: 'back.out(2)' }))
    })
    // Hover pop on stat cards
    gsap.utils.toArray('.hero-stats > div').forEach((el) => {
      el.addEventListener('mouseenter', () => gsap.to(el, { y: -4, duration: 0.25, ease: 'back.out(2.5)' }))
      el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.4, ease: 'power2.out' }))
    })
  }, { scope: ref })

  return (
    <section id="home" ref={ref} className="relative overflow-hidden border-b border-line/80">
      <div className="container-shell grid min-h-[calc(100dvh-72px)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:py-16">
        <div className="hero-left">
          <p className="eyebrow hero-eyebrow mb-5">{data.eyebrow}</p>
          <h1 className="hero-title max-w-3xl text-[clamp(3rem,5vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.085em] text-ink">
            {data.title}
          </h1>
          <p className="hero-subtitle mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {data.subtitle}
          </p>
          <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
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
          <div className="hero-stats mt-12 grid max-w-xl grid-cols-3 border-t border-line pt-5">
            {data.stats?.map((stat) => (
              <div key={stat.label} className="pr-4">
                <p className="eyebrow text-ink/70">{stat.label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] sm:min-h-[560px]">
          <div className="hero-image-wrap absolute inset-x-0 top-8 bottom-0 overflow-hidden rounded-[28px] bg-mist sm:inset-x-8 sm:top-12">
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
              <p className="max-w-[15rem] text-sm leading-5">{data.caption}</p>
              <ArrowDownRight size={22} strokeWidth={1.5} />
            </div>
          </div>
          <div className="hero-card-coral absolute right-0 top-0 w-40 rounded-2xl bg-coral p-5 text-canvas shadow-float sm:right-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-canvas/75">{data.featuredLabel}</p>
            <p className="mt-6 text-4xl font-bold tracking-[-0.08em]">{data.featuredStudy}</p>
            <p className="mt-2 text-xs leading-4 text-canvas/80">{data.featuredDescription}</p>
          </div>
          <div className="hero-card-open absolute bottom-4 left-0 w-48 rounded-2xl border border-line bg-canvas/95 p-4 shadow-soft sm:left-2">
            <p className="text-xs font-bold text-ink">Open to</p>
            <p className="mt-1 text-xs leading-4 text-muted">Data science roles and project collaboration.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
