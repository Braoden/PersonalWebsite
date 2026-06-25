import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition.js'

/**
 * Blended trailing cursor: a crisp dot that tracks the pointer 1:1 and a soft
 * ring that lags behind via a spring and scales up over interactive elements.
 * Hidden entirely on touch devices. Uses mix-blend-mode so it reads on any bg.
 */
export default function CustomCursor() {
  const { isTouch } = useMousePosition()
  const [hovering, setHovering] = useState(false)

  // Raw pixel position (the normalized context value isn't pixel-accurate).
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (isTouch) return
    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    // Grow the ring over anything interactive.
    const isInteractive = (el) =>
      el?.closest?.('a, button, input, textarea, [data-cursor="hover"]')
    const over = (e) => setHovering(!!isInteractive(e.target))

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [isTouch, x, y])

  if (isTouch) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 56 : 34, height: hovering ? 56 : 34, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      {/* Crisp dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  )
}
