import { useEffect, useRef, useState } from 'react'

// Port from amicro (src/hooks/useCanvasSetup.ts) — canvas perf hook, zero deps.
// - caches logical size via ResizeObserver (no per-frame reflow)
// - pauses animation off-screen (IntersectionObserver) and on hidden tab
// - reads prefers-reduced-motion once on mount (also pauses on mobile)
export function useCanvasSetup() {
  const canvasRef = useRef(null)
  const rect = useRef({ width: 0, height: 0 })
  const isVisible = useRef(true)

  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.innerWidth < 768)
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        rect.current = { width, height }
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
      }
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
      },
      { rootMargin: '100px' }
    )
    io.observe(canvas)

    const handleVisibility = () => {
      isVisible.current = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return { canvasRef, rect, isVisible, reducedMotion }
}
