/* eslint-disable */
import gsap from 'gsap/dist/gsap';
// import BottlePath from '../../Assets/bottle.glb';
// import GasBottles from '../../Assets/gas_bottles_set.glb';
// import BeerBottle from '../../Assets/beer_bottle.glb';
import WaterBottle from '../../Assets/water_bottle.glb';

import React, { useEffect, useState } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import GLTFViewer from '../GLTFViewer';

const Home = () => {

    useEffect(() => {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

        let ctx1 = gsap.context(() => {
            gsap.set('.intro-text', {
                // opacity: 0,
                translateX: '100%',
            })

            gsap.set('.intro-text-container', {
                backgroundColor: '#000'
            })

            gsap.to('.intro-text', {
                translateX: 0,
                duration: 3,
                ease: 'none',
                opacity: 1,
                // onComplete: () => {
                //   gsap.to('.intro-text', {
                //     translateX: '-110%',
                //     duration: 3,
                //     ease: 'none',
                //     opacity: 1,
                //   })
                // }

                onComplete: () => {
                    setProperty({
                        ...property,
                        triggerAnimation: true,
                        parallaxControl: true,
                    })
                    gsap.to('.intro-text-container', {
                        opacity: 0,
                    })
                }
            })

        })

        // let ctx2 = gsap.context(() => {

        //     gsap.to('.hero-section', {
        //         scrollTrigger: {
        //             trigger: '.hero-section',
        //             pin: true,
        //             start: 'top top',
        //             endTrigger: '.section-3',
        //             end: 'bottom bottom',
        //             markers: false,
        //             pinSpacing: false,
        //             onUpdate: (self) => {
        //                 setRotation({
        //                     ...rotation,
        //                     y: 10 * self.progress
        //                 })
        //             }
        //         }
        //     })
        // })

        return () => {
            ctx1.revert()
            // ctx2.revert()
        }

    }, [])

    const [property, setProperty] = useState({
        triggerAnimation: false,
        parallaxControl: false
    })

    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });


    return (
        <div className='flex flex-col w-full relative main-container overflow-x-hidden'>

            <div className='hero-section flex flex-col items-center justify-center w-full h-screen relative z-10'>

                <div className='w-full h-full'>
                    {/* <GLBViewer
            noControls={true}
            modelColor={"#f2f2f2"}
            modelPath={BottlePath}
            parallaxControl={property.parallaxControl}
            triggerAnimation={property.triggerAnimation}
          /> */}

                    <GLTFViewer rotation={rotation} triggerAnimation={property.triggerAnimation} modelPath={WaterBottle} />

                </div>

                <div className='flex flex-col items-center justify-center w-full h-full flex-shrink-0 absolute top-0 left-0 intro-text-container'>
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

                        <h1 className='intro-text text-[9rem] z-8 text-white font-thin tracking-wider text-glow'>LWL8 - SERIES L2</h1>

                    </div>
                </div>

            </div>

            <div className='section-2 flex flex-col w-full h-screen items-center justify-center bg-blue-200 lg:text-base text-sm z-[9] relative'>
                Section 2
            </div>

            <div className='section-3 flex flex-col w-full h-screen items-center justify-center bg-red-200 lg:text-base text-sm z-[9] relative'>
                Section 3
            </div>

        </div>
    )
}

export default Home