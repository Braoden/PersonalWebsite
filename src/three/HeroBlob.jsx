import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { MathUtils } from 'three'

/**
 * Hero centerpiece: an organic, slowly-rotating distorted sphere.
 *  - auto-rotates on its own
 *  - tilts toward the cursor (pointer ref, -1..1)
 *  - recedes & calms as you scroll past the hero (scroll-linked, per spec)
 *
 * High-detail icosahedron geometry gives MeshDistortMaterial smooth, pole-free
 * waves. `pointer` is a ref so this never causes React re-renders.
 */
export default function HeroBlob({ pointer, reduced }) {
  const group = useRef()
  const mesh = useRef()
  const material = useRef()

  useFrame((_, delta) => {
    if (!group.current) return
    const p = pointer.current

    // Auto-rotate + cursor tilt.
    mesh.current.rotation.y += delta * 0.15
    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, -p.y * 0.4, 0.04)
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, p.x * 0.15, 0.04)

    // Scroll progress over the first viewport: blob shrinks & smooths out.
    const progress = MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1)
    const scale = MathUtils.lerp(1.5, 0.5, progress)
    group.current.scale.setScalar(scale)
    group.current.position.y = progress * 0.1 // drift up & away
    if (material.current) material.current.distort = 0.4 * (1 - progress * 0.6)
  })

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={group} scale={1.4}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.25, 14]} />
          <MeshDistortMaterial
            ref={material}
            color="#1f8fd6"
            emissive="#0a4b73"
            emissiveIntensity={0.35}
            roughness={0.18}
            metalness={0.55}
            distort={0.4}
            speed={reduced ? 0 : 1.8}
          />
        </mesh>
      </group>
    </Float>
  )
}
