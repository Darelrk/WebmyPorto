// Motion tokens + reduced-motion gate shared across the portfolio.
// ponytail: no reveal()/STAGGER/DUR here; components animate inline with gsap.fromTo.
export const EASE = {
  entrance: 'expo.out', // matches legacy EASE_OUT used widely
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

const MAX_SCROLL_VELOCITY = 1800

export function normalizeScrollVelocity(velocity) {
  return Math.max(-1, Math.min(1, velocity / MAX_SCROLL_VELOCITY))
}
