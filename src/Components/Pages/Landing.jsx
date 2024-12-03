import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

const Landing = () => {

    const navigate = useNavigate()

    useEffect(() => {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

        let ctx = gsap.context(() => {

            gsap.to('.hydration-made-smarter', {
                opacity: 0
            })

            gsap.fromTo('.water-logo-animate', {
                y: '50%',
                scale: 2,
            }, {
                y: '0%',
                scale: 1,
                duration: 2,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.water-logo-animate',
                },
                onComplete: () => {
                    setEnableScroll(true)
                    gsap.to('.hydration-made-smarter', {
                        opacity: 1,
                        duration: 1,
                        ease: 'none'
                    })
                }
            })

        })

        return () => ctx.revert()

    }, [])

    const [enableScroll, setEnableScroll] = useState(false)

    return (
        <div className={`flex flex-col lg:w-10/12 w-11/12 mx-auto relative ${enableScroll ? '' : 'h-screen overflow-hidden'}`}>

            <div className='flex flex-col w-full items-center justify-start h-screen absolute top-0 left-0 lg:py-20 py-10 water-logo-animate'>
                <img src="/series-l2/water_logo.svg" alt="water_logo" className='w-96 h-40 mx-auto' />
            </div>

            <div className='w-full mx-auto flex flex-col lg:py-20 py-10 hydration-made-smarter opacity-0'>

                <img src="/series-l2/water_logo.svg" alt="water_logo" className='w-96 h-40 mx-auto' />


                <div className='flex flex-col lg:gap-6 gap-4 text-center lg:mt-6 mt-4'>

                    <h1 className='lg:text-7xl text-6xl font-bold text-[#121212]'>Hydration Made Smarter</h1>
                    <p className='lg:text-base text-sm text-[#121212]'>Track your water intake, stay hydrated, and embrace a sustainable lifestyle with LWL8.</p>

                </div>


                <div className='grid lg:grid-cols-2 lg:gap-10 gap-6 w-full lg:mt-10 mt-6'>

                    <div className='bg-[#f2f2f2] rounded-2xl flex flex-col justify-between h-[500px] lg:p-8 p-6'>

                        <div className='flex items-start w-full justify-between'>
                            <div>
                                <h2 className='lg:text-lg md:text-base text-sm font-semibold text-[#121212]'>Series L1</h2>
                                <p className='lg:text-base md:text-sm text-xs text-[#121212]'>Designed for those who live life on the go</p>
                            </div>

                            <button
                                onClick={() => {
                                    navigate('/series-l2')
                                }}
                                className='lg:text-base md:text-sm text-xs text-[#121212] font-medium'>Learn More</button>

                        </div>

                        <div className='w-full h-60'>
                            <img src="/series-l2/l2.svg" alt="l2" className='w-full h-full object-contain' />
                        </div>

                        <div className='flex items-end w-full justify-between'>
                            <div>
                                <h2 className='lg:text-lg md:text-base text-sm font-semibold text-[#121212]'>$ 78</h2>
                                <p className='lg:text-base md:text-sm text-xs text-[#121212]'>Inclusive of taxes</p>
                            </div>

                            <button className='lg:text-sm text-xs bg-[#121212]/90 text-white rounded-full p-2 px-4 font-medium'>Buy Now</button>

                        </div>


                    </div>

                    <div className='bg-[#f2f2f2] rounded-2xl flex flex-col justify-between h-[500px] lg:p-8 p-6'>

                        <div className='flex items-start w-full justify-between'>
                            <div>
                                <h2 className='lg:text-lg md:text-base text-sm font-semibold text-[#121212]'>Series L2</h2>
                                <p className='lg:text-base md:text-sm text-xs text-[#121212]'>Designed for those who live life on the go</p>
                            </div>

                            <button
                                onClick={() => {
                                    navigate('/series-l2')
                                }}
                                className='lg:text-base md:text-sm text-xs text-[#121212] font-medium'>Learn More</button>

                        </div>

                        <div className='w-full h-60'>
                            <img src="/series-l2/l2.svg" alt="l2" className='w-full h-full object-contain' />
                        </div>

                        <div className='flex items-end w-full justify-between'>
                            <div>
                                <h2 className='lg:text-lg md:text-base text-sm font-semibold text-[#121212]'>$ 78</h2>
                                <p className='lg:text-base md:text-sm text-xs text-[#121212]'>Inclusive of taxes</p>
                            </div>

                            <button className='lg:text-sm text-xs bg-[#121212]/90 text-white rounded-full p-2 px-4 font-medium'>Buy Now</button>

                        </div>


                    </div>


                </div>


            </div>

            <div className='w-full flex flex-col lg:p-10 p-6 text-center lg:pb-20 pb-10'>

                <div className='flex flex-col text-center gap-2'>
                    <p className='section-sub-text'>Highlights</p>

                    <h2 className='section-title lg:w-8/12 mx-auto'>Designed with Precision. Powered by Innovation</h2>
                </div>

            </div>

            <div className='flex flex-row items-start w-full justify-start overflow-x-scroll snap-x snap-mandatory lg:gap-10 gap-6'>

                {
                    [1, 2, 3].map(item => (
                        <div className='bg-[#f2f2f2] w-full rounded-3xl h-[450px] lg:h-[650px] flex-shrink-0 lg:p-10 p-6 flex flex-col justify-end'>
                            <div className='grid lg:grid-cols-2 items-center w-full '>

                                <h2 className='lg:text-lg text-base font-medium text-[#121212]'>Smart Hydration Tracking </h2>

                                <p className='lg:text-lg text-base text-[#121212]'>Automatically tracks your water intake, making it easy to reach daily hydration goals.</p>
                            </div>

                        </div>
                    ))
                }

            </div>

            <div className='pt-10 flex items-center justify-end'>
                <button className='w-32 grid grid-cols-3 items-center rounded-full bg-[#E0E0E0] p-3 '>

                    <div className='flex items-center justify-center'>
                        <img src="/series-l2/slider-arrow.svg" alt="slider-arrow" className='w-5 h-5' />
                    </div>

                    <p className='flex items-center justify-center'>1/5</p>

                    <div className='flex items-center justify-center'>
                        <img src="/series-l2/slider-arrow.svg" alt="slider-arrow" className='w-5 h-5 -rotate-180' />
                    </div>

                </button>
            </div>

            <div className='w-full flex flex-col lg:p-10 p-6 text-center lg:py-20 py-10'>

                <div className='flex flex-col text-center gap-2'>
                    <p className='section-sub-text'>Benefits</p>

                    <h2 className='section-title lg:w-8/12 mx-auto'>Stay Active, Energized, and Fully Hydrated</h2>
                </div>

            </div>

            <div className='flex flex-row items-start w-full justify-start overflow-x-scroll snap-x snap-mandatory lg:gap-10 gap-6'>

                {
                    [1, 2, 3].map((item, index) => (
                        <div className='bg-[#f2f2f2] w-full rounded-3xl lg:h-[550px] lg:text-[4rem] font-semibold  h-96 flex-shrink-0 lg:p-10 p-6 flex flex-col justify-center items-center'>
                            {index + 1}
                        </div>
                    ))
                }

            </div>

            <div className='flex items-center justify-end -mt-20 pr-10'>
                <button className='w-32 grid grid-cols-3 items-center rounded-full bg-[#E0E0E0] p-3 '>

                    <div className='flex items-center justify-center'>
                        <img src="/series-l2/slider-arrow.svg" alt="slider-arrow" className='w-5 h-5' />
                    </div>

                    <p className='flex items-center justify-center'>1/5</p>

                    <div className='flex items-center justify-center'>
                        <img src="/series-l2/slider-arrow.svg" alt="slider-arrow" className='w-5 h-5 -rotate-180' />
                    </div>

                </button>
            </div>

            <div className='w-full flex flex-col lg:p-10 p-6 text-center lg:py-20 py-10'>

                <div className='flex flex-col text-center gap-2'>
                    <p className='section-sub-text'>The LWL8 App</p>

                    <h2 className='section-title lg:w-8/12 mx-auto'>Track, Set, Achieve—All with the LWL8 App</h2>
                </div>

            </div>

            <div className=''>
                <div className='bg-[#f2f2f2] w-10/12 mx-auto overflow-hidden rounded-3xl lg:h-[550px] h-[450px] flex-shrink-0 lg:p-10 p-6 flex flex-col justify-end relative'>

                    <div className='w-full min-h-16 bg-[#121212]/80 bottom-0 left-0 absolute flex items-center justify-center text-center'>

                        <p className='lg:text-base text-sm text-[#f2f2f2]'>Define your daily hydration target to stay on track.</p>

                    </div>
                </div>

                <div className='grid lg:grid-cols-7 items-center w-full mt-6'>
                    {
                        ["Set Goal", "Track Intake", "Get Intake Reminders", "Bottle Settings", "Get more Insights", "Find your Bottle", "Intake History"].map(item => (
                            <h2 className='text-sm text-[#121212]/90 font-medium h-[52px] flex flex-col items-center justify-center border-r border-[#808080]/20 px-5'>{item}</h2>
                        ))
                    }
                </div>


                <button className='p-3 rounded-full text-white w-fit mx-auto bg-[#121212]/90 px-5 flex items-center justify-center lg:mt-8 mt-6 text-sm'>Learn More</button>

            </div>

            <div className='w-full flex flex-col lg:p-10 p-6 text-center lg:py-20 py-10'>

                <div className='flex flex-col text-center gap-2'>
                    <p className='section-sub-text'>What Our Users are Saying</p>

                    <h2 className='section-title lg:w-8/12 mx-auto'>Real Stories, Real Results</h2>
                </div>

            </div>

            <div className='flex items-center justify-start lg:gap-10 gap-8 w-full mx-auto pb-10 snap-x snap-mandatory overflow-x-auto'>

                {
                    [...Array(5)].map(item => (
                        <div className='w-8/12 mx-auto flex flex-row flex-shrink-0 bg-[#f2f2f2] h-96 rounded-3xl overflow-x-hidden'>

                            <div className='w-1/2 flex-shrink-0 h-full'>
                                <img src="/series-l2/hiker.jpeg" alt="hiker" className='w-full h-full object-cover' />
                            </div>

                            <div className='w-1/2 flex-shrink-0 h-full lg:p-8 p-4 flex flex-col lg:gap-4 gap-2 overflow-y-auto'>

                                <h3 className='lg:text-base text-sm font-medium text-[#121212]'>Zain Bergson <span className='font-[400] text-xs lg:text-sm'> &nbsp;&nbsp; Fitness enthusiast.</span></h3>


                                <h4 className='lg:text-2xl text-xl font-semibold text-[#121212]'>LWL8 has completely changed the way I stay hydrated!</h4>

                                <p className='lg:text-base text-sm text-[#121212]'>As someone always on the go, I used to struggle with drinking enough water during the day. Since getting the LWL8 smart bottle, I don’t have to think twice! The personalized reminders and hydration tracking features keep me on top of my water intake effortlessly.</p>

                            </div>

                        </div>
                    ))
                }

            </div>

            <div className='flex items-center justify-center w-full pb-10'>
                <button className='w-32 grid grid-cols-3 items-center mx-auto rounded-full bg-[#E0E0E0] p-3 '>

                    <div className='flex items-center justify-center'>
                        <img src="/series-l2/slider-arrow.svg" alt="slider-arrow" className='w-5 h-5' />
                    </div>

                    <p className='flex items-center justify-center'>1/5</p>

                    <div className='flex items-center justify-center'>
                        <img src="/series-l2/slider-arrow.svg" alt="slider-arrow" className='w-5 h-5 -rotate-180' />
                    </div>

                </button>
            </div>

        </div>
    )
}

export default Landing