import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Single source of truth for motion language across the portfolio.
// Replaces the scattered hardcoded durations/eases in components.
export const EASE = {
  entrance: 'expo.out', // matches legacy EASE_OUT used widely
  soft: 'power3.out',
}

export const DUR = {
  enter: 0.6,
  micro: 0.25,
  drawer: 0.3,
  counter: 1.2,
}

export const STAGGER = {
  card: 0.07,
  chip: 0.05,
}

// Backward-compatible alias for the legacy EASE_OUT export in gsap.js
export const EASE_OUT = EASE.entrance

// Single implementation of the reduced-motion preference.
// (Consolidates the duplicate useReducedMotionSafe in gsap.js.)
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Shared scroll-entrance primitive.
// target: selector or element(s) to animate.
// opts.trigger: element/selector that owns the ScrollTrigger (defaults to target).
// Under reduced motion, snaps to final state without transform or ScrollTrigger.
export function reveal(target, opts = {}) {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 })
    return
  }
  const {
    y = 24,
    duration = DUR.enter,
    stagger,
    start = 'top 85%',
    trigger,
  } = opts
  gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: EASE.entrance,
      stagger,
      scrollTrigger: { trigger: trigger || target, start, once: true },
    }
  )
}
