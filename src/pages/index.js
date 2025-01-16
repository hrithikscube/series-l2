// 'use client'
// import React, { useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Environment, OrbitControls, useGLTF } from '@react-three/drei';


// const Model = ({ modelPath }) => {

//   const { scene } = useGLTF(modelPath)

//   const groupRef = useRef()

//   return <primitive ref={groupRef} object={scene.clone()} scale={12} position={[0, -1, 0]} />

// }

// const Home = () => {
//   return (
//     <div className='flex flex-col items-center justify-center w-full h-screen'>

//       <Canvas>
//         <Model modelPath={"/assets/series-l2.glb"} />
//         <Environment files={"/assets/studio-lights.exr"} />
//         <OrbitControls />
//       </Canvas>

//     </div>
//   )
// }

// export default Home

import gsap from 'gsap/dist/gsap';
import React, { useEffect } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

const Test = () => {

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    let ctx = gsap.context(() => {

      let btl = gsap.timeline({
        repeat: -1
      })

      btl.to('.floating-bottle', {
        y: '10%',
        x: '10%',
        rotate: '-=10%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      btl.to('.floating-bottle', {
        y: '0%',
        x: '0%',
        rotate: '0%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      btl.to('.floating-bottle', {
        y: '-10%',
        x: '-10%',
        rotate: '15%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      btl.to('.floating-bottle', {
        y: '0%',
        x: '0%',
        rotate: '0%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      let tl1 = gsap.timeline({
        repeat: -1
      })

      let tl2 = gsap.timeline({
        repeat: -1
      })

      let tl3 = gsap.timeline({
        repeat: -1
      })

      let tl4 = gsap.timeline({
        repeat: -1
      })


      tl1.to('.circle1', {
        y: '+=12%',
        x: '+=12%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      tl1.to('.circle1', {
        y: '0%',
        x: '0%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      tl2.to('.circle2', {
        y: '-=5%',
        x: '-=5%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      tl2.to('.circle2', {
        y: '0%',
        x: '0%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      tl3.to('.circle3', {
        y: '-15%',
        x: '15%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      tl3.to('.circle3', {
        y: '0%',
        x: '0%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })


      tl4.to('.circle4', {
        y: '10%',
        x: '-10%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })

      tl4.to('.circle4', {
        y: '0%',
        x: '0%',
        duration: 4,
        ease: 'power1.inOut',
        stagger: 0.1
      })



    })

    return () => ctx.revert()

  }, [])

  return (
    <div className='flex flex-row w-full h-screen items-center justify-center'>

      <div className='flex items-center justify-center lg:w-4/12 mx-auto relative'>
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
    </div>
  )
}

export default Test