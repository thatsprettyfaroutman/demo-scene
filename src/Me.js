import React, { useMemo, useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const DEFAULT_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#f0f',
  wireframe: true,
})

const getMaterial = (name) => {
  if (name === 'me') {
    const map = new THREE.TextureLoader().load('/me2-diffuse-1k.jpg')
    map.flipY = false

    return new THREE.MeshStandardMaterial({
      map,
    })
  }

  return DEFAULT_MATERIAL
}

export default function Me(props) {
  const group = useRef()
  const { nodes, animations } = useGLTF('/me2.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['Armature|mixamo.com|Layer0'].play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Mesh_0"
            geometry={nodes.Mesh_0.geometry}
            material={useMemo(() => getMaterial('me'), [])}
            skeleton={nodes.Mesh_0.skeleton}
            castShadow
            receiveShadow
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/me2.gltf')
