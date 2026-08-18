import { useRef } from 'react'
import { useReducedMotionSafe } from '../../lib/gsap'

export default function GlowButton({ children, href, glow = 'rgba(232,93,74,0.30)', className = '', ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--gx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }
  const cls = `group relative inline-flex items-center justify-center overflow-hidden ${className}`
  const glowLayer = (
    <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: `radial-gradient(130px circle at var(--gx, 50%) var(--gy, 50%), ${glow}, transparent 80%)` }} />
  )
  const content = <span className="relative z-10">{children}</span>
  if (href) return <a ref={ref} href={href} onMouseMove={onMove} className={cls} {...rest}>{glowLayer}{content}</a>
  return <button ref={ref} onMouseMove={onMove} className={cls} {...rest}>{glowLayer}{content}</button>
}
