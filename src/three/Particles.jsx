import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, MathUtils } from 'three'

/**
 * Drifting particle field behind every section, with mouse-parallax depth.
 *
 * ponytail: the cloud parallaxes & rotates as a whole toward the cursor rather
 * than doing per-particle repulsion — cheap, reads as depth, and keeps the
 * background canvas light. Upgrade path: move positions in a shader if true
 * per-point cursor repulsion is wanted.
 */
export default function Particles({ pointer, count = 2600, animate = true }) {
  const points = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Spread through a wide, deep box around the camera.
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!points.current || !animate) return
    const p = pointer.current
    // Slow constant drift...
    points.current.rotation.y += delta * 0.02
    // ...plus parallax that eases toward the cursor.
    points.current.rotation.x = MathUtils.lerp(points.current.rotation.x, p.y * 0.12, 0.03)
    points.current.position.x = MathUtils.lerp(points.current.position.x, p.x * 0.6, 0.03)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#7dd3fc"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
