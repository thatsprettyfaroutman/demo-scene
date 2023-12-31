import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const DEFAULT_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#f0f',
  wireframe: true,
})

const getMaterial = (name) => {
  if (name === 'chair') {
    const map = new THREE.TextureLoader().load('/chair-diffuse-1k.jpg')
    map.flipY = false
    const roughnessMap = new THREE.TextureLoader().load(
      '/chair-roughness-1k.jpg'
    )
    roughnessMap.flipY = false
    const normalMap = new THREE.TextureLoader().load('/chair-normal-1k.jpg')
    normalMap.flipY = false
    return new THREE.MeshPhysicalMaterial({
      map,
      roughnessMap,
      normalMap,
    })
  }

  return DEFAULT_MATERIAL
}

export default function Chair(props) {
  const { nodes } = useGLTF('/chair.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, -0.072]} scale={0.59}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Base.geometry}
          material={useMemo(() => getMaterial('chair'), [])}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.017}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Leg_frame.geometry}
          material={useMemo(() => getMaterial('chair'), [])}
          scale={1.694}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/chair.gltf')
