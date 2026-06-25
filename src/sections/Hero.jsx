import { motion, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../data/content.js'
import useMousePosition from '../hooks/useMousePosition.js'
import MagneticButton from '../components/MagneticButton.jsx'

export default function Hero() {
  const { mvX, mvY } = useMousePosition()
  // Cursor parallax for the hero text (eases opposite to the 3D blob behind it).
  const tx = useTransform(mvX, [-1, 1], [14, -14])
  const ty = useTransform(mvY, [-1, 1], [10, -10])

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-6 text-center">
      <motion.div style={{ x: tx, y: ty }} className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          {hero.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-text"
        >
          {hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {hero.ctas.map((cta) => (
            <MagneticButton key={cta.label} href={cta.target} primary={cta.primary}>
              {cta.label}
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
