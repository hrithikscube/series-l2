/* eslint-disable */
import gsap from 'gsap/dist/gsap';
import BottlePath from '../../Assets/bottle.glb';
// import GasBottles from '../../Assets/gas_bottles_set.glb';
// import WaterBottle from '../../Assets/water_bottle.glb';

import React, { useEffect, useState } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import GLBViewer from '../GLBViewer';
// import GLTFViewer from '../GLTFViewer';

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

        let ctx2 = gsap.context(() => {

            gsap.to('.para-text', {
                opacity: 100,
                stagger: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.section-2',
                    start: '-50% top',
                    end: 'bottom bottom',
                    scrub: 2,
                    // markers: true,
                }
            })

        })

        return () => {
            ctx1.revert()
            ctx2.revert()
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
                    <GLBViewer
                        noControls={true}
                        modelColor={"#f2f2f2"}
                        modelPath={BottlePath}
                        parallaxControl={property.parallaxControl}
                        triggerAnimation={property.triggerAnimation}
                    />

                    {/* <GLTFViewer rotation={rotation} triggerAnimation={property.triggerAnimation} modelPath={GasBottles} /> */}

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

                        <h1 className='intro-text lg:text-[9rem] text-[4rem] z-8 text-white font-thin tracking-wider text-glow'>LWL8 - SERIES L2</h1>

                    </div>
                </div>

            </div>

            <div className='section-2 flex flex-col w-full h-screen items-center justify-center bg-blue-200 lg:text-base text-sm z-[9] relative'>
                <div className='flex flex-row flex-wrap gap-2 lg:w-6/12 mx-auto items-center justify-center lg:p-0 p-6'>
                    {React.Children.toArray(
                        "Proident do laborum ex ea labore esse et. Nulla deserunt voluptate Lorem culpa proident ullamco ipsum nostrud. Tempor fugiat fugiat reprehenderit laborum sit laborum. Excepteur et ullamco pariatur qui ut.".split(' ').map((item, index) => (
                            <span key={index} className='lg:text-lg text-base font-medium opacity-50 para-text text-[#121212]'>{item}</span>
                        ))
                    )}
                </div>
            </div>

            <div className='section-3 flex flex-col w-full h-screen lg:p-10 p-6 items-center justify-center bg-red-200 lg:text-base text-sm z-[9] relative'>


                <div className='flex flex-col mx-auto text-center gap-4 lg:p-10'>

                    <p className='lg:text-base text-sm text-[#121212]'>Introducing Series L2</p>

                    <h2 className='lg:text-3xl text-2xl font-bold text-[#121212]'>Designed for those who live life on the go</h2>

                </div>

            </div>


            <div className='section-4 flex flex-col w-full h-screen lg:p-10 p-6 items-center justify-center bg-blue-200 lg:text-base text-sm z-[9] relative'>


                <div className='flex flex-col w-full mx-auto text-center gap-4 lg:p-10 h-full'>

                    <h2 className='lg:text-3xl text-2xl font-bold text-[#121212]'>Smart Reminders with Gentle Vibration</h2>

                    <div className='lg:w-6/12 w-full mx-auto h-[450px] flex-shrink-0'>
                        <GLBViewer noControls={true} parallaxControl={false} modelPath={BottlePath} modelColor="#ffffff" />
                    </div>

                    <p className='lg:text-sm text-sm text-[#121212] lg:w-6/12 mx-auto text-center'>Stay on track with your hydration goals effortlessly. The Series L2 bottle sends gentle vibration reminders to keep you drinking throughout the day.</p>

                </div>

            </div>

            <div className='section-5 flex flex-col w-full h-screen lg:p-10 p-6 items-center justify-center bg-red-200 lg:text-base text-sm z-[9] relative'>


                <div className='flex flex-col w-full mx-auto text-center gap-4 lg:p-10 h-full'>

                    <h2 className='lg:text-3xl text-2xl font-bold text-[#121212]'>Ergonomic Design & Durable Quality</h2>
                    <div className='lg:w-6/12 w-full mx-auto h-[450px] flex-shrink-0'>
                        <GLBViewer noControls={true} parallaxControl={false} modelPath={BottlePath} modelColor="#ffffff" />
                    </div>

                    <p className='lg:text-sm text-sm text-[#121212] lg:w-6/12 mx-auto text-center'>Built for comfort and durablity, the Series L2 is made from Tritan, offering a sleek ergonomic design that feels natural to carry wherever you go.</p>

                </div>

            </div>

            <div className='section-6 flex flex-col w-full h-screen lg:p-10 p-6 items-center justify-center bg-blue-200 lg:text-base text-sm z-[9] relative'>


                <div className='flex flex-col w-full mx-auto text-center gap-4 lg:p-10 h-full'>

                    <h2 className='lg:text-3xl text-2xl font-bold text-[#121212]'>Dynamic Dot Matrix Display</h2>

                    <div className='lg:w-6/12 w-full mx-auto h-[450px] flex-shrink-0'>
                        <GLBViewer noControls={true} parallaxControl={false} modelPath={BottlePath} modelColor="#ffffff" />
                    </div>

                    <p className='lg:text-sm text-sm text-[#121212] lg:w-6/12 mx-auto text-center'>Get essential information at a glance. The dot matrix display shows the time, your daily water intake percentage, and fun animations, making hydration more engaging.</p>

                </div>

            </div>

            <div className='section-7 flex flex-col w-full lg:h-screen lg:p-10 p-6 items-center justify-center bg-red-200 lg:text-base text-sm z-[9] relative'>


                <div className='flex flex-col w-full mx-auto text-center gap-4 lg:p-10 h-full'>

                    <h2 className='lg:text-3xl text-2xl font-bold text-[#121212]'>Seamless Pairing with the LWL8 App</h2>

                    <div className='w-60 mx-auto h-[430px] flex-shrink-0 rounded-3xl bg-[#f2f2f2] border-4 border-[#121212]/60 mt-6'>
                    </div>

                    <p className='lg:text-sm text-sm text-[#121212] lg:w-6/12 mx-auto text-center'>Connect to the LWL8 app for a personalized hydration experience. Track monitor, and acheive your goals with smart insights synced directly to your device.</p>


                    <div className='flex items-center justify-center gap-2'>

                        <button className='p-2 text-xs border border-[#121212] rounded-full px-4'>Android</button>
                        <button className='p-2 text-xs border border-[#121212] rounded-full px-4'>IOS</button>

                    </div>

                </div>

            </div>

            <div className='section-8 flex flex-col w-full min-h-screen lg:p-10 p-6 items-center justify-center bg-blue-200 lg:text-base text-sm z-[9] relative'>


                <div className='flex flex-col w-full mx-auto text-center gap-4 lg:p-10 h-full'>

                    <p className='lg:text-base text-sm text-[#121212] lg:w-6/12 mx-auto text-center'>Your Lifestlye Companion</p>
                    <h2 className='lg:text-3xl text-2xl font-bold text-[#121212]'>Designed to enhance your Active Lifestyle.</h2>


                    <div className='flex flex-col w-full h-[550px] relative mt-8 rounded-3xl overflow-hidden'>

                        <img src="https://picsum.photos/id/235/900/600" alt="image" className='w-full h-full object-cover ' />

                        <div className='w-full min-h-20 bg-black/40 flex flex-col items-center justify-end lg:p-10 p-4 absolute left-0 bottom-0'>

                            <p className='lg:text-base text-sm lg:leading-normal leading-loose text-white text-center lg:w-5/12 mx-auto'>The Series L1 supports your fitness goals, reminding you to refuel after every rep or run.</p>

                        </div>

                    </div>

                    <div className='flex flex-col w-full h-[550px] relative mt-6 rounded-3xl overflow-hidden'>

                        <img src="https://picsum.photos/id/236/900/600" alt="image" className='w-full h-full object-cover ' />

                        <div className='w-full min-h-20 bg-black/40 flex flex-col items-center justify-end lg:p-10 p-4 absolute left-0 bottom-0'>

                            <p className='lg:text-base text-sm lg:leading-normal leading-loose text-white text-center lg:w-5/12 mx-auto'>Whether you're hiking, biking or exploring, the durable Series L2 is built to go the distance.</p>

                        </div>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default Home