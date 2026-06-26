import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { about, meta } from '../data/content.js'
import SectionWrapper from '../components/SectionWrapper.jsx'
import MagneticButton from '../components/MagneticButton.jsx'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function About() {
  return (
    <SectionWrapper id="about" eyebrow="Who I Am" title={about.heading}>
      <div className="grid items-start gap-12 md:-mx-8 md:grid-cols-[1fr_1.4fr]">
        {/* Stylized avatar — monogram over an accent gradient (no portrait sourced). */}
        <motion.div {...reveal} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="glass relative mx-auto flex aspect-square w-56 items-center justify-center overflow-hidden md:w-full md:max-w-xs">
            <div
              className="absolute inset-0 opacity-80"
              style={{ background: 'radial-gradient(circle at 30% 25%, #38bdf8, transparent 60%), radial-gradient(circle at 75% 80%, #7dd3fc, transparent 55%)' }}
            />
            <span className="relative font-display text-7xl font-bold text-bg/80">
              {meta.name.split(' ').map((w) => w[0]).join('')}
            </span>
          </div>
          <p className="mt-6 text-center text-sm text-accent2 md:text-left">{about.summary}</p>
          <div className="mt-12 flex justify-center">
            <MagneticButton href={meta.resumeUrl} primary download>
              <Download size={16} /> Download Resume
            </MagneticButton>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5 rounded-2xl bg-surface/6 p-6 backdrop-blur-md">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...reveal}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed text-muted sm:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
