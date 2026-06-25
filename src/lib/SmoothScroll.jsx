import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Provides Lenis smooth scrolling + a `scrollTo(target)` for nav anchors.
// Smooth scrolling is skipped entirely when the user prefers reduced motion.
const ScrollContext = createContext({ scrollTo: () => {} })

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // native scrolling; nav falls back to scrollIntoView

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenisRef.current = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -10 })
    else el.scrollIntoView({ behavior: 'smooth' }) // reduced-motion fallback
  }

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>
}

export const useScrollTo = () => useContext(ScrollContext).scrollTo
