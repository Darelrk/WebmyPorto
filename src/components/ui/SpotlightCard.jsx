import { useRef } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

export default function SpotlightCard({
  children,
  as: Tag = 'article',
  className = '',
  spotlightColor = 'rgba(232, 93, 74, 0.14)',
  spotlightSize = 360,
  ...props
}) {
  const ref = useRef(null)
  const isReduced = prefersReducedMotion()

  const handleMouseMove = (e) => {
    if (isReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at var(--spot-x, -999px) var(--spot-y, -999px), ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </Tag>
  )
}
