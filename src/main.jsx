import React from 'react'
import ReactDOM from 'react-dom/client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import App from './App.jsx'
import './index.css'

// Lenis smooth scroll → GSAP ScrollTrigger sync
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => {
    // Expo-out: slow start, accelerate, decelerate
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  },
  smoothWheel: true,
  // Mobile-friendly: no smooth scroll on touch (jank-prone on small screens)
  smoothTouch: false,
  // Reduce sensitivity on small screens
  wheelMultiplier: 1.1,
  touchMultiplier: 1,
  // Prevent double-RAF with GSAP ticker
  autoRaf: false,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

// Honor reduced-motion: disable Lenis smoothing if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis.destroy()
} else if (window.innerWidth < 768) {
  // Disable smooth scroll on mobile (touch devices jank with custom scroll)
  lenis.destroy()
  document.documentElement.style.scrollBehavior = 'auto'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
