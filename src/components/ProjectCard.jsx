import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import useMousePosition from '../hooks/useMousePosition.js'

/**
 * Project card with a cursor-following 3D perspective tilt and a glare
 * highlight that tracks the pointer across the surface. Tilt is disabled on
 * touch devices (the card stays flat and fully usable).
 */
export default function ProjectCard({ project, index }) {
  const { isTouch } = useMousePosition()
  const ref = useRef(null)

  // Tilt + glare position, smoothed with springs.
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(125,211,252,0.18), transparent 55%)`

  const onMove = (e) => {
    if (isTouch || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width // 0..1
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 12) // rotateY
    rx.set((0.5 - py) * 12) // rotateX
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(50)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="glass group relative flex flex-col p-7 [transform-style:preserve-3d]"
    >
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[var(--radius)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-2xl font-semibold text-text">{project.title}</h3>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
          {project.language}
        </span>
      </div>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-accent2">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-5 text-sm">
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="link-underline inline-flex items-center gap-1.5 text-text hover:text-accent"
        >
          <Github size={16} /> Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-text hover:text-accent"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </motion.article>
  )
}
