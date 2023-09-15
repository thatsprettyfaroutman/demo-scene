import React, { useRef, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

const DEG = Math.PI / 180

export default function FloorLamps(props) {
  const { nodes } = useGLTF('/floor-lamps.gltf')

  const light1 = useRef()
  const light2 = useRef()
  const target1 = useRef()
  const target2 = useRef()

  useEffect(() => {
    if (light1.current && target1.current) {
      light1.current.target = target1.current
    }
    if (light2.current && target2.current) {
      light2.current.target = target2.current
    }
  }, [])

  const material = (
    <meshPhysicalMaterial
      attach="material"
      map={useTexture('/floor-lamp-diffuse-05k.jpg', (t) => (t.flipY = false))}
      metalnessMap={useTexture(
        '/floor-lamp-metalness-floor-lamp-roughness-05k.jpg',
        (t) => (t.flipY = false)
      )}
      roughnessMap={useTexture(
        '/floor-lamp-metalness-floor-lamp-roughness-05k.jpg',
        (t) => (t.flipY = false)
      )}
      emissive="#fff"
      emissiveIntensity={1}
      emissiveMap={useTexture(
        '/floor-lamp-emission-05k.jpg',
        (t) => (t.flipY = false)
      )}
      normalMap={useTexture(
        '/floor-lamp-normal-05k.jpg',
        (t) => (t.flipY = false)
      )}
    />
  )

  return (
    <group {...props}>
      <group position={[-1.919, 0, -0.722]} ref={target1}>
        <mesh
          castShadow
          geometry={nodes.legs001.geometry}
          position={[0.02, 0.962, 0.01]}
          rotation={[Math.PI, Math.PI / 3, -2.041]}
          scale={0.005}
        >
          {material}
        </mesh>
        <mesh
          castShadow
          geometry={nodes.shade.geometry}
          position={[0.024, 1.302, 0]}
          rotation={[-Math.PI, 0.829, -Math.PI]}
        >
          {material}
        </mesh>
        <mesh
          castShadow
          geometry={nodes.shadeframe.geometry}
          position={[0.024, 1.302, 0]}
          rotation={[-Math.PI, 0.829, -Math.PI]}
        >
          {material}
        </mesh>
        <mesh position={[0.05, 1.3, 0]}>
          <meshBasicMaterial color="#fff" />
          <sphereGeometry args={[0.05, 12, 4]} />
          <pointLight color="#fff" intensity={0.1} />
          <spotLight
            color="#fff"
            ref={light1}
            intensity={2}
            castShadow
            penumbra={0.75}
            angle={17 * DEG}
            shadow-camera-fov={17 * DEG}
            shadow-camera-near={0.001}
            shadow-camera-far={5}
            // shadow-mapSize-width={1024 * 2}
            // shadow-mapSize-height={1024 * 2}
          />
        </mesh>
      </group>
      <group position={[1.297, 0, 2.486]} ref={target2}>
        <mesh
          castShadow
          geometry={nodes.legs002.geometry}
          position={[0.02, 0.962, 0.01]}
          rotation={[Math.PI, Math.PI / 3, -2.041]}
          scale={0.005}
        >
          {material}
        </mesh>
        <mesh
          castShadow
          geometry={nodes.shade001.geometry}
          position={[0.024, 1.302, 0]}
          rotation={[-Math.PI, 0.829, -Math.PI]}
        >
          {material}
        </mesh>
        <mesh
          castShadow
          geometry={nodes.shadeframe001.geometry}
          position={[0.024, 1.302, 0]}
          rotation={[-Math.PI, 0.829, -Math.PI]}
        >
          {material}
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <meshBasicMaterial color="#fff" />
          <sphereGeometry args={[0.05, 12, 4]} />
          <pointLight color="#fff" intensity={0.1} />
          <spotLight
            color="#fff"
            ref={light2}
            intensity={2}
            castShadow
            penumbra={0.75}
            angle={17 * DEG}
            shadow-camera-fov={17 * DEG}
            shadow-camera-near={0.001}
            shadow-camera-far={5}
            // shadow-mapSize-width={1024 * 2}
            // shadow-mapSize-height={1024 * 2}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/floor-lamps.gltf')
useTexture.preload('/floor-lamp-diffuse-05k.jpg')
useTexture.preload('/floor-lamp-metalness-floor-lamp-roughness-05k.jpg')
useTexture.preload('/floor-lamp-emission-05k.jpg')
useTexture.preload('/floor-lamp-normal-05k.jpg')
