import { useRef } from 'react'
import { useGSAP, EASE_BOUNCE, useReducedMotionSafe, gsap } from '../lib/gsap'

export default function ResearchChart({ data = [], title = 'Research results' }) {
  const chartData = Array.isArray(data) ? data : []
  const maxValue = Math.max(...chartData.map((item) => item.value), 1)
  const minValue = Math.min(...chartData.map((item) => item.value), maxValue)
  const valueRange = maxValue - minValue
  const featured = chartData.find((item) => item.featured) ?? chartData[0]
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo(
      '.chart-bar',
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.9,
        ease: EASE_BOUNCE,
        stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        transformOrigin: 'bottom',
      }
    )
  }, { scope: ref, dependencies: [chartData], revertOnUpdate: true })

  return (
    <div ref={ref} aria-label={title} role="img">
      <div className="flex h-[230px] items-end gap-2 border-b border-canvas/15 px-1 pb-0 sm:gap-3 overflow-hidden">
        {chartData.map((item) => (
          <div key={item.model} className="flex h-full flex-1 flex-col justify-end gap-3">
            <div
              className={`chart-bar w-full rounded-t-[5px] ${
                item.featured ? 'bg-coral' : 'bg-canvas/35'
              }`}
              style={{
                height: `${
                  valueRange > 0 ? 25 + ((item.value - minValue) / valueRange) * 75 : 100
                }%`,
              }}
              title={`${item.model}: ${item.label}`}
            />
            <div className="min-h-8 text-center font-mono text-[9px] leading-3 text-canvas/60">
              {item.model}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-xs text-canvas/60">
        <span>Framework · Accuracy</span>
        {featured && (
          <span className="font-mono text-coral">
            {featured.model} {featured.label}
          </span>
        )}
      </div>
    </div>
  )
}
