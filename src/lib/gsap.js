import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

export { gsap, ScrollTrigger, useGSAP }

//*) Match framer-motion's [0.16, 1, 0.3, 1] feel
export const EASE_OUT = 'expo.out'
export const EASE_IN_OUT = 'power2.inOut'
export const EASE_BOUNCE = 'back.out(1.4)'
export const EASE_ELASTIC = 'elastic.out(1, 0.5)'

// Single source for reduced-motion preference (no framer-motion dependency)
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotionSafe() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
