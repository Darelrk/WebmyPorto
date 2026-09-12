import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { EASE_OUT, prefersReducedMotion } from './motion'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

export { gsap, ScrollTrigger, useGSAP }

export { EASE_OUT, prefersReducedMotion }

// Legacy eases still used by some components (buttons, etc.)
export const EASE_IN_OUT = 'power2.inOut'
export const EASE_BOUNCE = 'back.out(1.4)'
export const EASE_ELASTIC = 'elastic.out(1, 0.5)'

// Backward-compatible alias for prefersReducedMotion
export const useReducedMotionSafe = prefersReducedMotion
