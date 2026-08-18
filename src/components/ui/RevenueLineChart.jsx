import { useEffect, useRef } from 'react'
import { useCanvasSetup } from '../../lib/useCanvasSetup'

const smoothstep = (min, max, value) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}
const hash = (x, y) => {
  const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return h - Math.floor(h)
}

export default function RevenueLineChart({ theme = 'dark', data, height = 230 }) {
  const { canvasRef, rect, isVisible, reducedMotion } = useCanvasSetup()
  const values = Array.isArray(data) && data.length > 1 ? data : [1200, 1500, 1100, 1800, 2200, 2900, 1750]
  const valuesRef = useRef(values)
  const fromRef = useRef(values)
  const startRef = useRef(0)

  useEffect(() => {
    fromRef.current = valuesRef.current
    valuesRef.current = values
    startRef.current = performance.now()
  }, [values])

  useEffect(() => {
    let req
    let time = 0
    const draw = () => {
      if (!isVisible.current) { req = requestAnimationFrame(draw); return }
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const { width: w, height: h } = rect.current
      if (w === 0 || h === 0) { req = requestAnimationFrame(draw); return }

      time += reducedMotion ? 0 : 0.02
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, w, h)

      const prog = reducedMotion ? 1 : Math.min(1, (performance.now() - startRef.current) / 500)
      const e = 1 - Math.pow(2, -10 * prog)

      const points = values.length
      const maxVal = Math.max(...values, ...fromRef.current) * 1.2
      const stepX = w / (points - 1)
      const cell = Math.max(2, Math.round(w / 200))

      const lineColor = theme === 'light' ? '#171717' : '#ffffff'
      const rgb = theme === 'light' ? '23, 23, 23' : '255, 255, 255'

      ctx.beginPath()
      for (let i = 0; i < points; i++) {
        const target = valuesRef.current[i]
        const from = fromRef.current[i]
        const val = from + (target - from) * e
        const x = i * stepX
        const y = h - (val / maxVal) * h
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.lineWidth = 2.5
      ctx.strokeStyle = lineColor
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.stroke()

      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      ctx.save()
      ctx.clip()

      for (let x = 0; x <= w; x += cell) {
        for (let y = 0; y <= h; y += cell) {
          const jx = x + cell / 2
          const jy = y + cell / 2
          const jit = hash(jx, jy)

          const gradientFalloff = Math.max(0, 1 - jy / h)
          const waveRaw = reducedMotion ? 0 : Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7)
          const mod = smoothstep(-1.5, 1.5, waveRaw)

          const sz = cell * (0.3 * gradientFalloff + 0.3 * mod) * (0.8 + 0.4 * jit)
          if (sz > 0) {
            ctx.fillStyle = `rgba(${rgb}, ${(0.45 * gradientFalloff + 0.25).toFixed(3)})`
            ctx.fillRect(x + (cell - sz) / 2, y + (cell - sz) / 2, sz, sz)
          }
        }
      }

      ctx.restore()
      ctx.restore()
      req = requestAnimationFrame(draw)
    }
    startRef.current = performance.now()
    req = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(req)
  }, [theme, values, reducedMotion])

  return (
    <div className="w-full flex flex-col" style={{ height }}>
      <div className="relative w-full h-full flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  )
}
