import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, SpotLight, MeshDiscardMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

const DEG = Math.PI / 180

const DEFAULT_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#f0f',
  wireframe: true,
})

const getMaterial = (name) => {
  if (name === 'Plane') {
    const map = new THREE.TextureLoader().load('/floor-diffuse-1k.jpg')
    map.wrapS = THREE.MirroredRepeatWrapping
    map.wrapT = THREE.MirroredRepeatWrapping
    map.repeat.x = 8
    map.repeat.y = 8
    map.flipY = false
    const metalnessRoughnessMap = new THREE.TextureLoader().load(
      '/floor-metalness-floor-roughness-1k.jpg'
    )
    metalnessRoughnessMap.wrapS = THREE.MirroredRepeatWrapping
    metalnessRoughnessMap.wrapT = THREE.MirroredRepeatWrapping
    metalnessRoughnessMap.repeat.x = 8
    metalnessRoughnessMap.repeat.y = 8
    metalnessRoughnessMap.flipY = false
    const normalMap = new THREE.TextureLoader().load('/floor-normal-1k.jpg')
    normalMap.wrapS = THREE.MirroredRepeatWrapping
    normalMap.wrapT = THREE.MirroredRepeatWrapping
    normalMap.repeat.x = 8
    normalMap.repeat.y = 8
    normalMap.flipY = false
    return new THREE.MeshPhysicalMaterial({
      map,
      roughnessMap: metalnessRoughnessMap,
      metalnessMap: metalnessRoughnessMap,
      normalMap,
    })
  }

  if (name === 'Plane003') {
    const map = new THREE.TextureLoader().load('/persan-carpet-diffuse-1k.jpg')
    map.flipY = false
    const normalMap = new THREE.TextureLoader().load(
      '/persan-carpet-normal-1k.jpg'
    )
    normalMap.flipY = false

    return new THREE.MeshPhysicalMaterial({
      map,
      normalMap,
    })
  }

  if (name === 'Large_light_fixture') {
    const map = new THREE.TextureLoader().load('/lamp-diffuse-1k.jpg')
    map.flipY = false

    const metalnessRoughnessMap = new THREE.TextureLoader().load(
      '/lamp-metalness-lamp-roughness-1k.png'
    )
    metalnessRoughnessMap.flipY = false

    const emissiveMap = new THREE.TextureLoader().load('/lamp-emission-1k.jpg')
    emissiveMap.flipY = false

    return new THREE.MeshPhysicalMaterial({
      map,
      roughnessMap: metalnessRoughnessMap,
      metalnessMap: metalnessRoughnessMap,
      emissive: '#FFE7C1',
      emissiveIntensity: 1,
      emissiveMap,
    })
  }

  if (name === 'desk') {
    const map = new THREE.TextureLoader().load('/desk-all-diffuse-1k.jpg')
    map.flipY = false
    const normalMap = new THREE.TextureLoader().load('/desk-all-normal-1k.jpg')
    normalMap.flipY = false
    return new THREE.MeshPhysicalMaterial({
      map,
      normalMap,
    })
  }

  return DEFAULT_MATERIAL
}

export default function Scene(props) {
  const group = useRef()
  const { nodes } = useGLTF('/scene.gltf')

  const light = useRef()
  const lightTarget = useRef()
  // useHelper(light, THREE.SpotLightHelper, '#0ff')

  useEffect(() => {
    if (light.current && lightTarget.current) {
      light.current.target = lightTarget.current
    }
  }, [])

  const lightProps = useControls({
    position: [0.4281999999999994, 1.1541999999999983, 0.5590999999999989],
    'target-position': [0.4169999999999996, -0.0019999999999999723, -0.097],
    attenuation: { min: 0, max: 10, value: 1.5 },
    penumbra: { min: 0, max: 1, value: 0.125 },
    anglePower: { min: 0, max: 40, value: 6.8 },
    angle: { min: 0, max: 90, value: 75 },
    radiusTop: { min: 0, max: 1, value: 0.06 },
    intensity: { min: 0, max: 10, value: 1 },
  })

  return (
    <group ref={group} {...props}>
      <group name="Scene">
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={useMemo(() => getMaterial('Plane'), [])}
        />
        <mesh
          name="Plane003"
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={useMemo(() => getMaterial('Plane003'), [])}
          rotation={[0, -Math.PI / 4, 0]}
          scale={[2, 1, 2]}
        />
        <mesh
          name="Large_light_fixture"
          castShadow
          receiveShadow
          geometry={nodes.Large_light_fixture.geometry}
          material={useMemo(() => getMaterial('Large_light_fixture'), [])}
          position={[0.426, 0.696, 0.8]}
          rotation={[0, -1.53, 0]}
          scale={1.225}
        ></mesh>
        <mesh
          name="drawers"
          // castShadow
          receiveShadow
          geometry={nodes.drawers.geometry}
          material={useMemo(() => getMaterial('desk'), [])}
          position={[0, -0.088, 0.727]}
          rotation={[-Math.PI, 0.074, -Math.PI]}
        />
        <mesh
          name="hull"
          castShadow
          receiveShadow
          geometry={nodes.hull.geometry}
          material={useMemo(() => getMaterial('desk'), [])}
          position={[0, -0.088, 0.727]}
          rotation={[-Math.PI, 0.074, -Math.PI]}
        />
        <mesh
          name="knobs"
          castShadow
          receiveShadow
          geometry={nodes.knobs.geometry}
          material={useMemo(() => getMaterial('desk'), [])}
          position={[0, -0.088, 0.727]}
          rotation={[-Math.PI, 0.074, -Math.PI]}
        />
        <mesh
          name="legs"
          castShadow
          receiveShadow
          geometry={nodes.legs.geometry}
          material={useMemo(() => getMaterial('desk'), [])}
          position={[0, -0.088, 0.727]}
          rotation={[-Math.PI, 0.074, -Math.PI]}
        />
      </group>

      <spotLight
        color="#FFE7C1"
        position={[0, 3, 0]}
        castShadow
        intensity={2}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        penumbra={0.25}
      />

      <SpotLight
        color="#FFE7C1"
        position={Object.values(lightProps.position)}
        target-position={Object.values(lightProps['target-position'])}
        ref={light}
        castShadow
        penumbra={lightProps.penumbra}
        intensity={lightProps.intensity}
        angle={lightProps.angle * DEG}
        anglePower={lightProps.anglePower}
        attenuation={lightProps.attenuation}
        radiusTop={lightProps.radiusTop}
        shadow-camera-fov={lightProps.angle * DEG}
        shadow-camera-near={0.05}
        shadow-camera-far={5}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
      />
      <mesh
        ref={lightTarget}
        position={Object.values(lightProps['target-position'])}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <MeshDiscardMaterial />
      </mesh>
    </group>
  )
}
