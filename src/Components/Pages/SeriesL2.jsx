/* eslint-disable */

import GLTF from '../GLTF';
import gsap from 'gsap/dist/gsap';
import GLTFViewer from '../GLTFViewer';
import React, { useEffect, useState } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import WaterBottle from '../../Assets/water_bottle.glb';

const SeriesL2 = () => {
    const [rotation, setRotation] = useState({
        x: 0,
        y: 0,
        z: 0
    })

    console.log(rotation, 'rotation')

    useEffect(() => {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

        let ctx = gsap.context(() => {

            gsap.set('.dot-matrix-text', {
                x: '100%',
                opacity: 0,
            })

            gsap.to('.dot-matrix-text', {
                x: '-100%',
                duration: 20,
                ease: 'none',
                opacity: 100,
                repeat: -1
            })

            gsap.to('.pin-this-bottle', {
                scrollTrigger: {
                    trigger: '.intro-section',
                    start: 'top top',
                    endTrigger: '.bottle-information-4',
                    end: 'bottom bottom',
                    pin: true,
                    pinSpacing: false,
                    onUpdate: (self) => {
                        setRotation({
                            ...rotation,
                            y: 10 * self.progress
                        })
                    }
                    // markers: true
                }
            })

            gsap.to('.lifestyle-container', {
                x: '-100%',
                scrollTrigger: {
                    trigger: '.lifestyle-container',
                    start: 'top top',
                    end: '300% bottom',
                    // markers: true,
                    pin: '.lifestyle-container',
                    pinSpacing: true,
                    scrub: 1
                }
            })


        })

        return () => ctx.revert()

    }, [])



    return (
        <div className='flex flex-col w-full overflow-x-hidden'>


            <div className='w-full h-screen flex flex-col items-center justify-center lg:p-10 p-6 bg-black'>

                <div className='w-full h-44 relative overflow-x-hidden'>
                    <div>
                        <img src="dot-matrix.svg" alt="dot-matrix" className='w-full h-full object-cover' />
                    </div>

                    <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center dot-matrix-text'>

                        <h1 className='lg:text-9xl text-glow text-4xl doto text-center text-white'>LWL8 Series L2</h1>

                    </div>

                </div>

            </div>


            <div className='w-full flex flex-col min-h-screen text-center relative'>

                <div className='flex flex-col items-center justify-start lg:p-10 p-6'>
                    <p className='section-sub-text'>Active Lifestyle Companion</p>

                    <h2 className='font-bold text-[#121212]/80 lg:text-9xl text-7xl'>Series L2</h2>
                </div>

                <div className='w-5/12 mx-auto h-[550px]'>
                    <GLTFViewer modelPath={WaterBottle} />
                </div>

            </div>


            <div className='w-full flex flex-col lg:p-10 p-6 text-center'>

                <div className='flex flex-col text-center lg:gap-6 gap-4'>
                    <p className='section-sub-text'>Introducing Series L2</p>

                    <h2 className='section-title lg:w-6/12 mx-auto'>Designed for those who live life on the go</h2>

                </div>
            </div>


            <div className='flex flex-row w-full h-screen intro-section'>

                <div className="lg:w-6/12 h-full flex flex-col items-center justify-center pin-this-bottle lg:p-10 p-6">

                    <div className='w-full h-full flex-shrink-0'>
                        <GLTF noControls={true} rotation={rotation} modelPath={WaterBottle} />
                    </div>

                </div>

            </div>


            <div className='flex flex-row w-full h-screen items-end justify-end -mt-[100vh]'>

                <div className="lg:w-6/12 h-full flex flex-col flex-shrink-0">


                    <div className='flex flex-col w-full h-full flex-shrink-0 items-center justify-center bottle-information-1 lg:p-10 p-6'>


                        <div className='flex flex-col gap-2 w-10/12'>

                            <h3 className='lg:text-xl md:text-lg text-base text-[#121212] font-semibold'>Stay on track with your hydration goals effortlessly.</h3>
                            <p className='lg:text-xl md:text-lg text-base text-[#121212]'>The Series L2 bottle sends gentle vibration reminders to keep you drinking throughout the day.</p>

                        </div>


                    </div>

                    <div className='flex flex-col w-full h-full flex-shrink-0 items-center justify-center bottle-information-2 lg:p-10 p-6'>

                        <div className='flex flex-col gap-2 w-10/12'>

                            <h3 className='lg:text-xl md:text-lg text-base text-[#121212] font-semibold'>Built for comfort and durability, the Series L2 is made from Tritan™,</h3>
                            <p className='lg:text-xl md:text-lg text-base text-[#121212]'> offering a sleek, ergonomic design that feels natural to carry wherever you go.</p>

                        </div>
                    </div>

                    <div className='flex flex-col w-full h-full flex-shrink-0 items-center justify-center bottle-information-3 lg:p-10 p-6'>

                        <div className='flex flex-col gap-2 w-10/12'>

                            <h3 className='lg:text-xl md:text-lg text-base text-[#121212] font-semibold'>Get essential information at a glance. </h3>
                            <p className='lg:text-xl md:text-lg text-base text-[#121212]'>The dot matrix display shows the time, your daily water intake percentage, and fun animations, making hydration more engaging.</p>

                        </div>
                    </div>

                    <div className='flex flex-col w-full h-full flex-shrink-0 items-center justify-center bottle-information-4 lg:p-10 p-6'>
                        <div className='flex flex-col gap-2 w-10/12'>

                            <h3 className='lg:text-xl md:text-lg text-base text-[#121212] font-semibold'>Personalised Animations and Graffiti.</h3>
                            <p className='lg:text-xl md:text-lg text-base text-[#121212]'>Make your bottle your own with animations and graffiti displayed on the screen.</p>

                        </div>
                    </div>


                </div>

            </div>

            {/* pin spacer do not delete */}
            <div className='w-full h-screen' />
            <div className='w-full h-screen' />
            <div className='w-full h-screen' />
            {/* pin spacer do not delete */}

            <div className='w-full flex flex-col lg:p-10 p-6 text-center'>

                <div className='flex flex-col text-center lg:gap-6 gap-4'>
                    <p className='section-sub-text'>Your Lifestyle Companion</p>

                    <h2 className='section-title lg:w-8/12 mx-auto'>Designed to enhance your Active Lifestyle.</h2>

                </div>
            </div>

            <div className='flex flex-col w-full h-screen lifestyle-container flex-shrink-0'>
                <div className='flex flex-row items-start w-[200vw] flex-shrink-0 justify-start h-screen'>

                    {
                        React.Children.toArray([...Array(2)].map((item, index) => (
                            <div className='w-[100vw] flex-shrink-0 h-screen py-14 last:pr-10 first:pl-10'>
                                <div className='flex flex-col w-11/12 h-full relative rounded-2xl overflow-hidden first:ml-auto'>

                                    <img src={`https://picsum.photos/id/${50 + index}/1200/800`} alt="placeholder-image" className='w-full h-full object-cover ' />

                                    <div className='w-full min-h-20 bg-black/40 flex flex-col items-center justify-end lg:p-10 p-4 absolute left-0 bottom-0'>
                                        <p className='lg:text-base text-sm lg:leading-normal leading-loose text-white text-center lg:w-5/12 mx-auto'>The Series L1 supports your fitness goals, reminding you to refuel after every rep or run.</p>
                                    </div>
                                </div>
                            </div>
                        )))
                    }

                </div>
            </div>


            <div className='w-full flex flex-col lg:p-10 p-6 text-center h-screen items-center justify-center bg-black text-white'>

                <div className='flex flex-col text-center lg:gap-6 gap-4'>
                    <h2 className='lg:text-5xl/snug font-bold lg:w-6/12 mx-auto'>Sync, Connect and Drink Water Smarter with LWL8</h2>
                    <p className='section-sub-text lg:w-5/12 mx-auto'>Step-by-step guide to syncing, utilising lights, and Bluetooth functionality.</p>

                    <button className='lg:text-base text-sm font-medium hover:underline'>See how it works</button>
                </div>
            </div>


        </div>
    )
}

export default SeriesL2