import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../lib/gsap'
import TextReveal from './ui/TextReveal'
import TiltCard from './ui/TiltCard'

export default function Projects({ data = [] }) {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)
  const [featured, ...rest] = data

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo('.proj-header', { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
    gsap.fromTo('.proj-featured', { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.1,
        scrollTrigger: { trigger: '.proj-featured', start: 'top 82%', once: true } })
    gsap.fromTo('.proj-item', { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.55, ease: EASE_OUT, stagger: 0.08,
        scrollTrigger: { trigger: '.proj-list', start: 'top 85%', once: true } })
  }, { scope: ref, revertOnUpdate: true })

  return (
    <section id="projects" ref={ref} className="border-b border-line/80">
      <div className="container-shell py-24 sm:py-32">
        <div className="proj-header max-w-3xl">
          <p className="text-xs font-bold text-coral">Selected work</p>
          <TextReveal as="h2" text="Projects that make data useful." className="mt-4 text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.075em]" />
        </div>

        {featured && (
          <TiltCard as="a" href={featured.link} target="_blank" rel="noreferrer"
            className="proj-featured group mt-12 grid gap-8 rounded-[26px] bg-ink p-7 text-canvas transition-transform sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-canvas/50">Featured project</span>
                <ArrowUpRight className="text-coral transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-16 max-w-xl text-4xl font-bold leading-none tracking-[-0.07em] sm:text-6xl">{featured.title}</h3>
            </div>
            <div className="self-end">
              <p className="max-w-lg text-base leading-7 text-canvas/70">{featured.description}</p>
              {(featured.tags?.length ?? 0) > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-canvas/20 px-3 py-1.5 text-xs text-canvas/75">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </TiltCard>
        )}

        {rest.length > 0 && (
          <div className="proj-list mt-10 divide-y divide-line/80 border-y border-line/80">
            {rest.map((project, index) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="proj-item group grid gap-4 py-7 transition-colors hover:text-coral sm:grid-cols-[0.15fr_0.85fr_auto] sm:items-center sm:gap-7"
              >
                <span className="font-mono text-xs text-muted">0{index + 2}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.04em]">{project.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted group-hover:text-muted">{project.description}</p>
                  {(project.tags?.length ?? 0) > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/60">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <ArrowUpRight className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral" size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
