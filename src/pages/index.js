import React, { useRef } from 'react'
import Studio from '../assets/studio-lights.exr'
import SeriesL2 from '../assets/series-l2.glb'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'


const Model = ({ modelPath }) => {

  const { scene } = useGLTF(modelPath)

  const groupRef = useRef()

  return <primitive ref={groupRef} object={scene.clone()} scale={1} position={[0, 0, 0]} />

}

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>

      <Canvas>
        <Model modelPath={SeriesL2} />
        <Environment files={Studio} />
        <OrbitControls />
      </Canvas>

    </div>
  )
}

export default Home