'use client'
import { Canvas, extend } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, shaderMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap/dist/gsap';
import React, { useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import CollidingSpheres from '@/components/CollidingSpheres';

// without parallax

// const Model = ({ modelPath }) => {
//   const { scene, animations } = useGLTF(modelPath) // Load model and animations
//   const groupRef = useRef()
//   const mixer = useRef(null) // Reference for AnimationMixer

//   useEffect(() => {
//     if (animations.length > 0) {
//       // Create an AnimationMixer for the scene
//       mixer.current = new THREE.AnimationMixer(scene)

//       // Play the first animation (or modify to choose specific animations)
//       const action = mixer.current.clipAction(animations[0])
//       action.play()
//     }

//     return () => {
//       // Dispose of the mixer when the component unmounts
//       if (mixer.current) {
//         mixer.current.stopAllAction()
//         mixer.current = null
//       }
//     }
//   }, [scene, animations])

//   useFrame((state, delta) => {
//     // Update the animation mixer to play animations
//     if (mixer.current) mixer.current.update(delta)
//   })

//   return <primitive ref={groupRef} object={scene} scale={1} position={[0, 0, 0]} />
// }

// with parallax
// const Model = ({ modelPath }) => {
//   const { scene, animations } = useGLTF(modelPath) // Load model and animations
//   const groupRef = useRef()
//   const mixer = useRef(null) // Reference for AnimationMixer

//   const mousePosition = useRef({ x: 0, y: 0 }) // Ref to store mouse position

//   useEffect(() => {
//     if (animations.length > 0) {
//       // Create an AnimationMixer for the scene
//       mixer.current = new THREE.AnimationMixer(scene)

//       // Play the first animation
//       const action = mixer.current.clipAction(animations[0])
//       action.play()
//     }

//     return () => {
//       // Dispose of the mixer when the component unmounts
//       if (mixer.current) {
//         mixer.current.stopAllAction()
//         mixer.current = null
//       }
//     }
//   }, [scene, animations])

//   useEffect(() => {
//     // Update mouse position on mouse move
//     const handleMouseMove = (event) => {
//       const { innerWidth, innerHeight } = window
//       mousePosition.current = {
//         x: (event.clientX / innerWidth) * 2 - 1,
//         y: -(event.clientY / innerHeight) * 2 + 1,
//       }
//     }

//     window.addEventListener("mousemove", handleMouseMove)

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove)
//     }
//   }, [])

//   useFrame((state, delta) => {
//     // Update the animation mixer to play animations
//     if (mixer.current) mixer.current.update(delta)

//     // Apply parallax effect
//     if (groupRef.current) {
//       const { x, y } = mousePosition.current
//       groupRef.current.rotation.y = x * 0.2 // Adjust multiplier for sensitivity
//       groupRef.current.rotation.x = y * 0.2
//     }
//   })

//   return <primitive ref={groupRef} object={scene} scale={2} position={[0, 0, 0]} />
// }

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
      action.play()
    }

    // Apply shader material to the target mesh
    scene.traverse((child) => {
      if (child.isMesh && child.name === "Icosphere") {
        // child.material = blobMaterial.current
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
      mousePosition.current.x = (event.clientX / innerWidth) * 2 - 1
      mousePosition.current.y = -(event.clientY / innerHeight) * 2 + 1
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
      <primitive ref={groupRef} object={scene} scale={1.5} position={[0, 0, 0]} />
      <blobShaderMaterial ref={blobMaterial} />
    </>
  )
}


const Test = () => {

  // useEffect(() => {

  //   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  //   let ctx = gsap.context(() => {

  //     let btl = gsap.timeline({
  //       repeat: -1
  //     })

  //     btl.to('.floating-bottle', {
  //       y: '10%',
  //       x: '10%',
  //       rotate: '-=10%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     btl.to('.floating-bottle', {
  //       y: '0%',
  //       x: '0%',
  //       rotate: '0%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     btl.to('.floating-bottle', {
  //       y: '-10%',
  //       x: '-10%',
  //       rotate: '15%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     btl.to('.floating-bottle', {
  //       y: '0%',
  //       x: '0%',
  //       rotate: '0%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     let tl1 = gsap.timeline({
  //       repeat: -1
  //     })

  //     let tl2 = gsap.timeline({
  //       repeat: -1
  //     })

  //     let tl3 = gsap.timeline({
  //       repeat: -1
  //     })

  //     let tl4 = gsap.timeline({
  //       repeat: -1
  //     })


  //     tl1.to('.circle1', {
  //       y: '+=12%',
  //       x: '+=12%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     tl1.to('.circle1', {
  //       y: '0%',
  //       x: '0%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     tl2.to('.circle2', {
  //       y: '-=5%',
  //       x: '-=5%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     tl2.to('.circle2', {
  //       y: '0%',
  //       x: '0%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     tl3.to('.circle3', {
  //       y: '-15%',
  //       x: '15%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     tl3.to('.circle3', {
  //       y: '0%',
  //       x: '0%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })


  //     tl4.to('.circle4', {
  //       y: '10%',
  //       x: '-10%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })

  //     tl4.to('.circle4', {
  //       y: '0%',
  //       x: '0%',
  //       duration: 4,
  //       ease: 'power1.inOut',
  //       stagger: 0.1
  //     })



  //   })

  //   return () => ctx.revert()

  // }, [])

  return (
    <div className='flex flex-col w-full'>

      {/* <div className='flex flex-col w-full h-screen items-center justify-center'>
        <div className='flex items-center justify-center lg:w-4/12 mx-auto relative h-[550px]'>
          <div className='w-96 h-[450px] floating-bottle z-[2]'>
            <img src="l2-bottle.webp" alt="l2-bottle" className='w-full h-full object-contain' />
          </div>

          <div className='w-full h-full absolute top-0 left-0 circle1 flex items-start justify-start'>
            <div className='w-40 h-40 bg-blue-200 rounded-full' />
          </div>


          <div className='w-full h-full absolute top-0 left-0 circle2 flex items-end justify-end'>
            <div className='w-52 h-52 bg-purple-200 rounded-full' />
          </div>


          <div className='w-full h-full absolute top-0 left-0 circle3 flex items-end justify-start'>
            <div className='w-40 h-40 bg-red-200 rounded-full' />
          </div>

          <div className='w-full h-full absolute top-0 left-0 circle4 flex items-start justify-end'>
            <div className='w-44 h-44 bg-green-200 rounded-full' />
          </div>

        </div>
      </div> */}

      <div className='flex flex-col items-center justify-center w-1/2 mx-auto debug h-screen'>

        <Canvas>
          <Model modelPath={"/assets/sphere.glb"} />
          <Environment files={"/assets/studio-lights.exr"} />
          {/* <OrbitControls /> */}
        </Canvas>

      </div>

      {/* <div className='flex flex-col items-center justify-center w-full h-screen'>
        <CollidingSpheres modelPath="/assets/sphere.glb" />
      </div> */}
    </div>
  )
}

export default Test