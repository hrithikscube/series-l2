/* eslint-disable */

import React, { useEffect, useState } from 'react'
import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'

import BottlePath from './Assets/bottle.glb'
import GLBViewer from './Components/GLBViewer'
import Marquee from 'react-fast-marquee'

const App = () => {

  useEffect(() => {

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

    let ctx1 = gsap.context(() => {
      gsap.set('.intro-text', {
        opacity: 0,
        translateX: '100%',
      })

      gsap.to('.intro-text', {
        translateX: 0,
        duration: 3,
        ease: 'none',
        opacity: 1,
        onComplete: () => {
          gsap.to('.intro-text', {
            translateX: '-110%',
            duration: 3,
            ease: 'none',
            opacity: 1,
            onComplete: () => {
              gsap.to('.initial-video-section', {
                translateY: '-100%'
              })
            }
          })
        }
      })

      // setTimeout(() => {
      //   gsap.to('.initial-video-section', {
      //     translateY: '-100%',
      //     duration: 2,
      //     ease: 'none'
      //   })
      // }, 4000)

    })


    let ctx = gsap.context(() => {
      gsap.to('.hero-section', {
        scrollTrigger: {
          trigger: '.hero-section',
          pin: true,
          start: 'top top',
          endTrigger: '.section-3',
          end: 'bottom bottom',
          // markers: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            console.log(self.progress, 'val')
          }
        }
      })
    })

    return () => {
      ctx1.revert()
      ctx.revert()
    }

  }, [])

  const [params, setParams] = useState({
    x: 0.0,
    y: 0.0,
    z: 0.0
  })

  return (
    <div className='flex flex-col w-full relative main-container'>

      <div className='w-full h-screen bg-black flex flex-col items-center justify-center z-10 initial-video-section absolute top-0 left-0'>

        <div className='w-full relative text-center flex items-center justify-center'>

          <div
            className="w-full h-full absolute top-0 left-0"
            style={{
              background: `radial-gradient(circle, #808080 20%, transparent 21%) 0 0,
                 radial-gradient(circle, #808080 20%, transparent 21%) 5px 5px`,
              backgroundSize: '10px 10px',
            }}
          >
          </div>

          {/* <Marquee speed={120} className='w-full h-full'> */}
          <h1 className='intro-text text-[9rem] z-8 text-[#f2f2f2] font-thin tracking-wider text-glow'>LWL8 - Series L2</h1>
          {/* </Marquee> */}

        </div>
      </div>

      <div className='hero-section flex flex-col items-center justify-center w-full h-screen p-10'>

        <div className='w-full h-full'>
          <GLBViewer noControls={true} x={params.x} y={params.y} params={params.x} modelPath={BottlePath} modelColor={"null"} />
        </div>

      </div>

      <div className='flex flex-col w-full h-screen items-center justify-center bg-blue-200 lg:text-base text-sm'>
        Section 2
      </div>

      <div className='section-3 flex flex-col w-full h-screen items-center justify-center bg-red-200 lg:text-base text-sm'>
        Section 3
      </div>



    </div>
  )
}

export default App