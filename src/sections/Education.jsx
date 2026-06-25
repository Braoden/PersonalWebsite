import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../data/content.js'
import SectionWrapper from '../components/SectionWrapper.jsx'

export default function Education() {
  return (
    <SectionWrapper id="education" eyebrow="Academics" title="Education">
      <ol className="relative ml-3 border-l border-white/10">
        {education.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 ml-8 last:mb-0"
          >
            <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent">
              <GraduationCap size={13} />
            </span>
            <div className="glass p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold text-text">{item.role}</h3>
                <span className="text-xs uppercase tracking-wider text-muted">{item.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-accent2">{item.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  )
}
