import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, meta } from '../data/content.js'
import { useScrollTo } from '../lib/SmoothScroll.jsx'

export default function Navbar() {
  const scrollTo = useScrollTo()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (target) => {
    setOpen(false)
    scrollTo(target)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-white/5 bg-bg/70 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <button
            onClick={() => go('#hero')}
            className="font-display text-lg font-bold tracking-tight text-text"
          >
            {meta.name}
            <span className="text-accent">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => go(item.target)}
                  className="link-underline text-sm text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="text-text md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-lg md:hidden"
          >
            {nav.map((item, i) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                onClick={() => go(item.target)}
                className="font-display text-3xl font-semibold text-text"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
