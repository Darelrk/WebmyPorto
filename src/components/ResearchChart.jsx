import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ResearchChart({ data = [], title = 'Research results' }) {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const chartData = data.length ? data : []
  const maxValue = Math.max(...chartData.map((item) => item.value), 1)
  const minValue = Math.min(...chartData.map((item) => item.value), maxValue)
  const valueRange = maxValue - minValue
  const featured = chartData.find((item) => item.featured) ?? chartData[0]

  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldReveal = mounted && !reduceMotion

  return (
    <div aria-label={title} role="img">
      <div className="flex h-[230px] items-end gap-2 border-b border-canvas/15 px-1 pb-0 sm:gap-3">
        {chartData.map((item, index) => (
          <div key={item.model} className="flex h-full flex-1 flex-col justify-end gap-3">
            <motion.div
              className={`w-full rounded-t-[5px] ${item.featured ? 'bg-coral' : 'bg-canvas/35'}`}
              initial={shouldReveal ? { height: 0 } : false}
              whileInView={{
                height: `${valueRange > 0 ? 25 + ((item.value - minValue) / valueRange) * 75 : 100}%`,
              }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: shouldReveal ? index * 0.06 : 0, ease: [0.16, 1, 0.3, 1] }}
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
        {featured && <span className="font-mono text-coral">{featured.model} {featured.label}</span>}
      </div>
    </div>
  )
}
