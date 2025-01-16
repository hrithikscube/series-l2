'use client'
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import seriesl2 from '../assets/series-l2.glb';
import studio from '../assets/studio-lights.exr';
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
        <Model modelPath={seriesl2} />
        <Environment files={studio} />
        <OrbitControls />
      </Canvas>

    </div>
  )
}

export default Home