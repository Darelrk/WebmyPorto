import { Fragment, useRef } from 'react'
import { useGSAP, EASE_OUT, useReducedMotionSafe, gsap } from '../../lib/gsap'

export default function TextReveal({ as: Tag = 'h2', text = '', className = '', delay = 0 }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const words = text.split(' ').filter(Boolean)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const spans = el.querySelectorAll('.tr-word')
    if (reduce) { gsap.set(spans, { y: 0, opacity: 1 }); return }
    gsap.fromTo(spans,
      { yPercent: 55, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: EASE_OUT, stagger: 0.05, delay,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
  }, { scope: ref })

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="tr-word inline-block" aria-hidden="true">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}
