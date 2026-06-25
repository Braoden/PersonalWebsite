import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition.js'
import HeroBlob from './HeroBlob.jsx'
import Particles from './Particles.jsx'
import FloatingShapes from './FloatingShapes.jsx'

// Page sections in scroll order — index drives where the floating shapes go.
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact']

/**
 * Fixed, full-viewport background canvas sitting behind all page content.
 *
 * Performance contract (per spec):
 *   - Suspense-wrapped, pixel ratio capped to [1, 2]
 *   - rendering pauses (frameloop="never") when the tab is hidden OR the user
 *     prefers reduced motion
 *   - particle count / shape count reduced on small screens
 *
 * React context does NOT cross the R3F reconciler boundary, so we read the
 * shared mouse ref here (outside <Canvas>) and pass it down as a prop.
 */
export default function SceneCanvas() {
  const { pointer } = useMousePosition()
  const reducedMotion = useReducedMotion()
  const [hidden, setHidden] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [section, setSection] = useState(0)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)

    // Mark a section "active" as it crosses the viewport's vertical center.
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const idx = SECTION_IDS.indexOf(e.target.id)
          if (idx !== -1) setSection(idx)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [])

  const animate = !reducedMotion && !hidden
  const particleCount = isMobile ? 900 : 2600

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={animate ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Accent-tinted lighting for a premium, glassy look (no HDRI fetch). */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[7, 6, 2]} intensity={1.1} />
        <pointLight position={[-5, -2, 2]} intensity={40} color="#38bdf8" distance={20} />
        <pointLight position={[5, 3, -2]} intensity={30} color="#7dd3fc" distance={20} />

        <Suspense fallback={null}>
          <Particles pointer={pointer} count={particleCount} animate={animate} />
          <FloatingShapes pointer={pointer} reduced={!animate} isMobile={isMobile} section={section} />
          <HeroBlob pointer={pointer} reduced={!animate} />
        </Suspense>
      </Canvas>
    </div>
  )
}
