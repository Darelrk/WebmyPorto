import { ArrowUp } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP, useReducedMotionSafe, gsap, ScrollTrigger } from '../lib/gsap'

export default function ScrollToTop() {
  const btnRef = useRef(null)
  const reduceMotion = useReducedMotionSafe()

  useGSAP(() => {
    if (!btnRef.current) return
    if (reduceMotion) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -200',
        onEnter: () => { btnRef.current.style.opacity = '1'; btnRef.current.style.pointerEvents = 'auto' },
        onLeaveBack: () => { btnRef.current.style.opacity = '0'; btnRef.current.style.pointerEvents = 'none' },
      })
      return
    }
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -200',
      onEnter: () => gsap.to(btnRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)', pointerEvents: 'auto' }),
      onLeaveBack: () => gsap.to(btnRef.current, { opacity: 0, scale: 0.7, y: 8, duration: 0.25, ease: 'power2.in', pointerEvents: 'none' }),
    })
  }, { scope: btnRef })

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="stt-btn fixed bottom-6 right-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas shadow-soft transition hover:bg-coral sm:bottom-8 sm:right-8"
      aria-label="Back to top"
      style={{ opacity: 0, pointerEvents: 'none' }}
    >
      <ArrowUp size={18} strokeWidth={1.8} />
    </button>
  )
}
