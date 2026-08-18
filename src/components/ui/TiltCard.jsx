import { useRef } from 'react'
import { useReducedMotionSafe } from '../../lib/gsap'

const MAX = 8 // ponytail: subtle tilt; bump if cards feel flat

export default function TiltCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotionSafe()
  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
