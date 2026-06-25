import { motion } from 'framer-motion'
import { skills } from '../data/content.js'
import SectionWrapper from '../components/SectionWrapper.jsx'

export default function Skills() {
  return (
    <SectionWrapper id="skills" eyebrow="Tech Stack" title="Skills & Tools">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, i) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass p-7"
          >
            <h3 className="mb-5 font-display text-lg font-semibold text-text">{group.group}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
