'use client'
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';


const Model = ({ modelPath }) => {

  const { scene } = useGLTF(modelPath)

  const groupRef = useRef()

  return <primitive ref={groupRef} object={scene.clone()} scale={1} position={[0, 0, 0]} />

}

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>

      <Canvas>
        <Model modelPath={"/assets/series-l2.glb"} />
        <Environment files={"/assets/studio-lights.exr"} />
        <OrbitControls />
      </Canvas>

    </div>
  )
}

export default Home