import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Scene from './Scene'
import Laptop from './Laptop'
import Chair from './Chair'
import FloorLamps from './FloorLamps'
import Me from './Me'

const DEG = Math.PI / 180

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        // gl={{ antialias: true }}
        shadows
        // flat
        // linear
        camera={{
          fov: 30,
          position: [7.8, 3, -8],
        }}
      >
        <ambientLight color="#333" />
        <OrbitControls
          target={[0, 1, 0]}
          maxPolarAngle={92.5 * DEG}
          // minAzimuthAngle={-200 * DEG}
          // maxAzimuthAngle={-160 * DEG}
        />
        <Scene />
        <Laptop />
        <Chair />
        <FloorLamps />
        <Me />
      </Canvas>
    </div>
  )
}

export default App
