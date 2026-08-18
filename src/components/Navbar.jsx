import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotionSafe, gsap } from '../lib/gsap'
import MagneticButton from './ui/MagneticButton'

export default function Navbar({ data }) {
  const reduceMotion = useReducedMotionSafe()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('system')
  const [menuVisible, setMenuVisible] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    if (!mobileMenuOpen) return
    if (reduceMotion) { setMenuVisible(true); return }
    setMenuVisible(true)
    gsap.fromTo(menuRef.current,
      { opacity: 0, height: 0, overflow: 'hidden' },
      { opacity: 1, height: 'auto', duration: 0.25, ease: 'power2.out' })
  }, [mobileMenuOpen, reduceMotion])

  useEffect(() => {
    if (mobileMenuOpen) return
    if (!menuRef.current || !menuVisible) return
    if (reduceMotion) { setMenuVisible(false); return }
    const menu = menuRef.current
    gsap.to(menu, {
      opacity: 0, height: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => setMenuVisible(false),
    })
    return () => gsap.killTweensOf(menu)
  }, [mobileMenuOpen, reduceMotion, menuVisible])

  const links = data.links ?? []
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-xl">
      <div className="container-shell flex h-[72px] items-center justify-between gap-6">
        <a href="#home" className="shrink-0 text-lg font-bold tracking-[-0.08em] text-ink" aria-label="Darelrk home">
          {data.logo}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-ink hover:text-ink"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
          </button>
          <MagneticButton href={`mailto:${data.email}`} className="rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-canvas transition hover:-translate-y-0.5 hover:bg-coral active:translate-y-0">
            {data.cta}
          </MagneticButton>
        </div>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
          {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {menuVisible && (
        <div id="mobile-navigation" ref={menuRef} className="lg:hidden overflow-hidden border-t border-line/80 bg-canvas" style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}>
          <nav className="container-shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="border-b border-line/70 py-3 text-base text-ink">{link.name}</a>
            ))}
            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={toggleTheme} className="flex items-center gap-2 text-sm text-muted">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              <a href={`mailto:${data.email}`} onClick={closeMenu} className="font-bold text-coral">{data.cta}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
