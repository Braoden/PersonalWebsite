import { ArrowUp } from 'lucide-react'
import { nav, meta } from '../data/content.js'
import { useScrollTo } from '../lib/SmoothScroll.jsx'

export default function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {meta.name}
        </p>

        <button
          onClick={() => scrollTo('#hero')}
          aria-label="Back to top"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  )
}
