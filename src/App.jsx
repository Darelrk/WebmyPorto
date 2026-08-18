import React, { Suspense, lazy, useRef, useLayoutEffect } from 'react'
import { useGSAP, gsap, useReducedMotionSafe } from './lib/gsap'
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
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'expo.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative min-h-[100dvh] overflow-x-clip bg-canvas text-ink">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="surface-grid absolute inset-x-0 top-0 h-[52rem] opacity-60" />
        <div className="paper-noise absolute inset-0 opacity-[0.035]" />
        <div className="absolute -right-48 top-24 hidden h-96 w-96 rounded-full bg-mist/30 blur-3xl md:block" aria-hidden="true" />
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
    </div>
  )
}
