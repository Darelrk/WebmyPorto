import { useRef } from 'react'
import { useGSAP, gsap, useReducedMotionSafe } from '../../lib/gsap'

export default function MagneticButton({ children, href, strength = 0.35, className = '', ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  useGSAP(() => {
    if (reduce) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => { xTo(0); yTo(0) }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, { scope: ref })

  const cls = `inline-flex items-center justify-center ${className}`
  if (href) return <a ref={ref} href={href} className={cls} {...rest}>{children}</a>
  return <button ref={ref} className={cls} {...rest}>{children}</button>
}
