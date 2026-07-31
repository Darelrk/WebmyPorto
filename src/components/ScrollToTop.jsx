import { ArrowUp } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollToTop() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 260], [0, 1])
  const scale = useTransform(scrollY, [0, 260], [0.86, 1])
  const pointerEvents = useTransform(scrollY, [0, 260], ['none', 'auto'])

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ opacity, scale, pointerEvents }}
      className="fixed bottom-6 right-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas shadow-soft transition hover:bg-coral sm:bottom-8 sm:right-8"
      aria-label="Back to top"
    >
      <ArrowUp size={18} strokeWidth={1.8} />
    </motion.button>
  )
}
