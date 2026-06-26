import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { MathUtils, TetrahedronGeometry, Vector3 } from 'three'

// Decorative wireframe accents that bob (Float), spin, parallax to the cursor,
// AND relocate to a fresh spot each time you scroll into a new section.
const SHAPES = [
  { geo: 'icosahedron', size: 0.6, speed: 1.2 },
  { geo: 'torus', size: 0.5, speed: 1.6 },
  { geo: 'octahedron', size: 0.55, speed: 1.0 },
  { geo: 'icosahedron', size: 0.45, speed: 1.8 },
  { geo: 'tetrahedron', size: 0.5, speed: 3.0},
]

// Deterministic 0..1 hash so every (shape, section) pair has a stable position
// (no jitter on re-render, but each section looks different).
const hash = (a, b) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return x - Math.floor(x)
}

// Where shape `i` sits while section `s` is active. Shapes alternate to the
// left/right edges so they frame the content rather than cover it.
function targetFor(i, s) {
  const side = i % 2 === 0 ? -1 : 1
  const x = side * (2.6 + hash(i, s) * 2.4) // 2.6..5.0 out from center
  const y = (hash(i + 10, s) - 0.5) * 5.5
  const z = -2 - hash(i + 20, s) * 3
  return [x, y, z]
}

function Shape({ geo, size }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.3
    ref.current.rotation.y += delta * 0.4
  })
  return (
    <mesh ref={ref}>
      {geo === 'icosahedron' && <icosahedronGeometry args={[size, 0]} />}
      {geo === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
      {geo === 'torus' && <torusGeometry args={[size, size * 0.35, 12, 32]} />}
      {geo === 'tetrahedron' && <tetrahedronGeometry args={[size, 0]} />}
      <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.45} />
    </mesh>
  )
}

export default function FloatingShapes({ pointer, reduced, isMobile, section = 0 }) {
  const group = useRef()
  const shapes = isMobile ? SHAPES.slice(0, 2) : SHAPES

  // Stable initial positions (section 0) so React never snaps the meshes on
  // re-render; one wrapper-group ref per shape to animate via lerp.
  const initial = useMemo(() => shapes.map((_, i) => targetFor(i, 0)), [shapes.length])
  const refs = useRef([])

  // Recompute targets only when the active section changes.
  const targets = useMemo(
    () => shapes.map((_, i) => new Vector3(...targetFor(i, section))),
    [section, shapes.length],
  )

  useFrame(() => {
    if (!group.current) return
    const p = pointer.current
    // Cursor parallax for the whole cluster.
    group.current.position.x = MathUtils.lerp(group.current.position.x, p.x * 0.8, 0.03)
    group.current.position.y = MathUtils.lerp(group.current.position.y, -p.y * 0.5, 0.03)
    // Ease each shape toward its current section's target.
    refs.current.forEach((g, i) => {
      if (g && targets[i]) g.position.lerp(targets[i], reduced ? 1 : 0.045)
    })
  })

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Float key={i} speed={reduced ? 0 : s.speed} rotationIntensity={0.8} floatIntensity={1.2}>
          <group ref={(el) => (refs.current[i] = el)} position={initial[i]}>
            <Shape geo={s.geo} size={s.size} />
          </group>
        </Float>
      ))}
    </group>
  )
}
