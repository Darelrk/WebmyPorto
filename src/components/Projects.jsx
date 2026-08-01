import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const tagGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const tagVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
}

const springFeedback = { type: 'spring', stiffness: 260, damping: 22 }

export default function Projects({ data = [] }) {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [featured, ...rest] = data
  const skipAnim = reduceMotion === true

  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldReveal = mounted && !skipAnim

  return (
    <section id="projects" className="border-b border-line/80">
      <motion.div
        className="container-shell py-24 sm:py-32"
        initial={shouldReveal ? 'hidden' : false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={sectionVariants}
      >
        <motion.div className="max-w-3xl" variants={itemVariants}>
          <p className="text-xs font-bold text-coral">Selected work</p>
          <h2 className="mt-4 text-[clamp(2.8rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.075em]">Projects that make data useful.</h2>
        </motion.div>

        {featured && (
          <motion.a
            href={featured.link}
            target="_blank"
            rel="noreferrer"
            className="group mt-12 grid gap-8 rounded-[26px] bg-ink p-7 text-canvas transition sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14"
            variants={itemVariants}
            whileHover={skipAnim ? undefined : { y: -6 }}
            whileTap={skipAnim ? undefined : { scale: 0.99 }}
            transition={skipAnim ? undefined : springFeedback}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-canvas/50">Featured project</span>
                <ArrowUpRight className="text-coral transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mt-16 max-w-xl text-4xl font-bold leading-none tracking-[-0.07em] sm:text-6xl">{featured.title}</h3>
            </div>
            <div className="self-end">
              <p className="max-w-lg text-base leading-7 text-canvas/70">{featured.description}</p>
              {(featured.tags?.length ?? 0) > 0 && (
                <motion.div className="mt-7 flex flex-wrap gap-2" variants={tagGroupVariants}>
                  {featured.tags.map((tag) => (
                    <motion.span key={tag} variants={tagVariants} className="rounded-full border border-canvas/20 px-3 py-1.5 text-xs text-canvas/75">{tag}</motion.span>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.a>
        )}

        {rest.length > 0 && (
          <div className="mt-10 divide-y divide-line/80 border-y border-line/80">
            {rest.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 py-7 transition-colors hover:text-coral sm:grid-cols-[0.15fr_0.85fr_auto] sm:items-center sm:gap-7"
                variants={itemVariants}
                whileHover={skipAnim ? undefined : { x: 6 }}
                whileTap={skipAnim ? undefined : { scale: 0.995 }}
                transition={skipAnim ? undefined : springFeedback}
              >
                <span className="font-mono text-xs text-muted">0{index + 2}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.04em]">{project.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted group-hover:text-muted">{project.description}</p>
                  {(project.tags?.length ?? 0) > 0 && (
                    <motion.div className="mt-4 flex flex-wrap gap-2" variants={tagGroupVariants}>
                      {project.tags.map((tag) => (
                        <motion.span key={tag} variants={tagVariants} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/60">{tag}</motion.span>
                      ))}
                    </motion.div>
                  )}
                </div>
                <ArrowUpRight className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-coral" size={20} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
