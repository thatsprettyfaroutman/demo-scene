import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export default function Laptop(props) {
  const { nodes } = useGLTF('/laptop.gltf')

  const material = (
    <meshPhysicalMaterial
      attach="material"
      map={useTexture('/laptop-diffuse-05k.jpg', (t) => (t.flipY = false))}
      metalnessMap={useTexture(
        '/laptop-metalness-laptop-roughness-05k.jpg',
        (t) => (t.flipY = false)
      )}
      roughnessMap={useTexture(
        '/laptop-metalness-laptop-roughness-05k.jpg',
        (t) => (t.flipY = false)
      )}
      emissive="#fff"
      emissiveIntensity={1}
      emissiveMap={useTexture(
        '/laptop-emission-05k.jpg',
        (t) => (t.flipY = false)
      )}
      normalMap={useTexture('/laptop-normal-05k.jpg', (t) => (t.flipY = false))}
    />
  )

  return (
    <group {...props} dispose={null}>
      <group
        position={[0.029, 0.697, 0.65]}
        rotation={[-Math.PI, 0.071, -Math.PI]}
        scale={1.281}
      >
        <mesh castShadow receiveShadow geometry={nodes.Plane001.geometry}>
          {material}
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/laptop.gltf')
useTexture.preload('/laptop-diffuse-05k.jpg')
useTexture.preload('/laptop-metalness-laptop-roughness-05k.jpg')
useTexture.preload('/laptop-emission-05k.jpg')
useTexture.preload('/laptop-normal-05k.jpg')
