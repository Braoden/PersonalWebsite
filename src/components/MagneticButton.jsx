import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition.js'

/**
 * A button/link that subtly pulls toward the cursor when the pointer is near.
 * Renders an <a> when `href` is given, otherwise a <button>. On touch devices
 * the magnetism is disabled (renders a plain, full-strength control).
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  primary = false,
  strength = 0.4,
  ...rest
}) {
  const { isTouch } = useMousePosition()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (isTouch || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-display text-sm font-medium tracking-wide transition-colors duration-300'
  const variant = primary
    ? 'bg-accent text-bg hover:bg-accent2'
    : 'border border-white/15 text-text hover:border-accent hover:text-accent'

  const Tag = href ? motion.a : motion.button
  const tagProps = href ? { href, ...(href.startsWith('#') ? {} : { target: '_blank', rel: 'noreferrer' }) } : { onClick, type: 'button' }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${variant} ${className}`}
      {...tagProps}
      {...rest}
    >
      {children}
    </Tag>
  )
}
