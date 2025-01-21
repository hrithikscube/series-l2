'use client'
import { Canvas, extend } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, shaderMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect, useRef } from 'react';

// with parallax & morphing
const BlobShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec3 vNormal;

    void main() {
      vec3 transformed = position;

      // Apply blob-like deformation based on time and position
      float freq = 2.0; // Frequency
      float amp = 0.1; // Amplitude
      float wave = sin(freq * (transformed.x + uTime)) * amp;
      transformed += normal * wave;

      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec3 vNormal;
    void main() {
      // Simple shading
      vec3 color = normalize(vNormal) * 0.5 + 0.5;
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ BlobShaderMaterial })

const Model = ({ modelPath }) => {
  const { scene, animations } = useGLTF(modelPath)
  const groupRef = useRef()
  const mixer = useRef(null)
  const blobMaterial = useRef(null)
  const mousePosition = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene)
      const action = mixer.current.clipAction(animations[0])
      const action2 = mixer.current.clipAction(animations[1])
      action.play()
      action2.play()

    }

    // Apply shader material to the target mesh
    scene.traverse((child) => {
      if (child.isMesh && child.name === "Icosphere") {
        // child.material = blobMaterial.current
        child.material.color.set(0x38bdf8);
      }
    })

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction()
        mixer.current = null
      }
    }
  }, [scene, animations])

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window
      mousePosition.current.x = (event.clientX / innerWidth) * 1 - 1
      mousePosition.current.y = -(event.clientY / innerHeight) * 1 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useFrame((state, delta) => {
    if (blobMaterial.current) {
      blobMaterial.current.uTime += delta
    }

    if (mixer.current) mixer.current.update(delta)

    if (groupRef.current) {
      const { x, y } = mousePosition.current
      groupRef.current.rotation.y = x * 0.2
      groupRef.current.rotation.x = y * 0.2
    }

    // Update shader uniform for animation

  })

  return (
    <>
      <primitive ref={groupRef} object={scene} scale={2} position={[0, 0, 0]} />
      <blobShaderMaterial ref={blobMaterial} />
    </>
  )
}


const Test = () => {

  return (
    <div className='flex flex-col w-full'>

      <div className='flex flex-col items-center justify-center w-full mx-auto h-screen'>

        <Canvas>
          <Model modelPath={"/assets/sphere-and-bottle.glb"} />
          <Environment files={"/assets/studio-lights.exr"} />
          {/* <OrbitControls /> */}
        </Canvas>

      </div>

    </div>
  )
}

export default Test