import { motion } from 'framer-motion'

// Standard section shell: id anchor, optional eyebrow + heading, and a
// fade/slide-in reveal when the section scrolls into view.
export default function SectionWrapper({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2 className="font-display font-bold text-text">{title}</h2>}
        </motion.div>
      )}
      {children}
    </section>
  )
}
