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
  const contactEl = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const p = pointer.current

    // Auto-rotate + cursor tilt.
    mesh.current.rotation.y += delta * 0.15
    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, -p.y * 0.4, 0.04)
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, p.x * 0.15, 0.04)

    // Phase 1 — hero: blob shrinks & smooths over the first viewport of scroll.
    const heroProgress = MathUtils.clamp(window.scrollY * 2.2 / window.innerHeight, 0, 1) //how far have to scroll ~ progress ~ scale speed

    // Phase 2 — contact: as the section's top travels up from the viewport
    // bottom to its middle, the blob drifts left behind the "Get In Touch"
    // heading and grows back to hero size. Anchoring completion to mid-viewport
    // (not the very top) means it finishes even though the short final section
    // never scrolls its heading all the way up. viewport.width keeps the
    // leftward target on-screen at any aspect.
    if (!contactEl.current) contactEl.current = document.getElementById('contact')
    let toContact = 0
    if (contactEl.current) {
      const top = contactEl.current.getBoundingClientRect().top
      toContact = MathUtils.clamp(2 * (1 - top / (window.innerHeight * 0.55)), 0, 1) //heroprogress for contact
    }

    const scale = MathUtils.lerp(MathUtils.lerp(1.1, 0.4, heroProgress), 1.1, toContact) //from big to small, small to big
    group.current.scale.setScalar(scale)
    group.current.position.x = MathUtils.lerp(0, state.viewport.width * 0.25, toContact) // move left or right
    group.current.position.y = MathUtils.lerp(0.05, -1.1, toContact) // settle lower at contact
    if (material.current)
      material.current.distort = 0.3 * MathUtils.lerp(1 - heroProgress * 0.6, 1, toContact) //distort / water moving
  })

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={group} scale={1.4}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.5, 15]} />
          <MeshDistortMaterial
            ref={material}
            color="#1f8fd6"
            emissive="#0a4b73"
            emissiveIntensity={0.05}
            roughness={0.65}
            metalness={0.75}
            distort={0.3}
            speed={reduced ? 0 : 2}
          />
        </mesh>
      </group>
    </Float>
  )
}
