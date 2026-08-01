import React, { Suspense, lazy } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import content from './data/content.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ScrollToTop from './components/ScrollToTop'

const Education = lazy(() => import('./components/Education'))
const Expertise = lazy(() => import('./components/Expertise'))
const Experience = lazy(() => import('./components/Experience'))
const FeaturedResearch = lazy(() => import('./components/FeaturedResearch'))
const Projects = lazy(() => import('./components/Projects'))
const Footer = lazy(() => import('./components/Footer'))

function SectionSkeleton() {
  return (
    <div className="container-shell py-24" aria-label="Loading section" role="status">
      <div className="h-3 w-24 animate-pulse rounded bg-line/70" />
      <div className="mt-5 h-12 max-w-xl animate-pulse rounded bg-line/70" />
      <div className="mt-4 h-4 max-w-2xl animate-pulse rounded bg-line/50" />
    </div>
  )
}

export default function App() {
  const reduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
    <motion.div
      className="relative min-h-[100dvh] overflow-x-clip bg-canvas text-ink"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="surface-grid absolute inset-x-0 top-0 h-[52rem] opacity-60" />
        <div className="paper-noise absolute inset-0 opacity-[0.035]" />
        <div className="absolute -right-48 top-24 h-96 w-96 rounded-full bg-mist/30 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar data={content.navbar} />
        <main>
          <Hero data={content.hero} />
          <About data={content.about} expertise={content.expertise} />

          <Suspense fallback={<SectionSkeleton />}>
            <Education
              educationData={content.education}
              certificationData={content.certifications}
            />
            <Expertise data={content.expertise} softSkills={content.softSkills} />
            <Experience data={content.experience} />
            <FeaturedResearch data={content.research} />
            <Projects data={content.projects} />
            <Footer data={content.footer} />
          </Suspense>
        </main>
        <ScrollToTop />
      </div>
    </motion.div>
    </MotionConfig>
  )
}
