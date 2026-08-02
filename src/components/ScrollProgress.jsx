import { useRef } from 'react'
import { useGSAP, useReducedMotionSafe, gsap, ScrollTrigger } from '../lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const reduceMotion = useReducedMotionSafe()

  useGSAP(() => {
    if (reduceMotion || !barRef.current) return
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, { scope: barRef })

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
      style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
      aria-hidden="true"
    />
  )
}
