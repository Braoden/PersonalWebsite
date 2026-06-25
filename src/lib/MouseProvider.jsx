import { createContext, useContext, useEffect, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import useIsTouch from '../hooks/useIsTouch.js'

/**
 * Global cursor state, consumed by both 3D (useFrame) and DOM (Framer Motion).
 *
 *  - `pointer`  : a mutable ref { x, y } normalized to -1..1. Read this inside
 *                 R3F useFrame loops — it never triggers React re-renders.
 *  - `mvX/mvY`  : Framer Motion values (same -1..1 range) for DOM parallax.
 *  - `isTouch`  : disables interactions on touch devices.
 *
 * The background <Canvas> uses `pointer-events: none`, so R3F's own pointer
 * never updates — this single window listener is the shared source of truth.
 */
const MouseContext = createContext(null)

export function MouseProvider({ children }) {
  const isTouch = useIsTouch()
  const pointer = useRef({ x: 0, y: 0 })
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)

  useEffect(() => {
    if (isTouch) return

    const onMove = (e) => {
      // Normalize to -1..1 with the origin at screen center.
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      pointer.current.x = x
      pointer.current.y = y
      mvX.set(x)
      mvY.set(y)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [isTouch, mvX, mvY])

  return (
    <MouseContext.Provider value={{ pointer, mvX, mvY, isTouch }}>
      {children}
    </MouseContext.Provider>
  )
}

export function useMouse() {
  const ctx = useContext(MouseContext)
  if (!ctx) throw new Error('useMouse must be used within <MouseProvider>')
  return ctx
}
