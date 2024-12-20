import gsap from 'gsap/dist/gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import React, { useEffect } from 'react'

const ProductLandingPage = () => {

    useEffect(() => {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

        let ctx = gsap.context(() => {

            gsap.to('.pin-this', {
                scrollTrigger: {
                    trigger: '.section-1',
                    start: 'top top',
                    pin: '.pin-this',
                    endTrigger: '.end-pin-here',
                    end: 'bottom bottom',
                    markers: true,
                    scrub: 2
                }
            })

        })

        return () => ctx.revert()

    }, [])

    return (
        <div>

            <div className='grid grid-cols-2 w-full h-screen section-1'>

                <div className='w-full bg-amber-100 h-screen pin-this'>

                </div>

                <div className='w-full h-screen flex-shrink-0 flex flex-col'>

                    <div className='w-full h-full flex-shrink-0 bg-purple-200 flex flex-col items-center justify-center'>

                        <div className='flex flex-col lg:p-16 p-6'>
                            <h2 className='lg:text-2xl text-xl font-medium text-[#121212]'>Stay on track with your hydration goals effortlessly</h2>
                            <p className='lg:text-2xl text-xl text-[#121212]'>The Series L2 bottle sends gentle vibration reminders to keep you drinking throughout the day</p>
                        </div>
                    </div>

                    <div className='w-full h-full flex-shrink-0 bg-purple-300 flex flex-col items-center justify-center'>
                        <div className='flex flex-col lg:p-16 p-6'>
                            <h2 className='lg:text-2xl text-xl font-medium text-[#121212]'>Built for comfort and durability, the Series L2 is made from Tritan™,</h2>
                            <p className='lg:text-2xl text-xl text-[#121212]'> offering a sleek, ergonomic design that feels natural to carry wherever you go.</p>
                        </div>

                    </div>

                    <div className='w-full h-full flex-shrink-0 bg-purple-400 flex flex-col items-center justify-center'>

                        <div className='flex flex-col lg:p-16 p-6'>
                            <h2 className='lg:text-2xl text-xl font-medium text-[#121212]'>Get essential information at a glance.</h2>
                            <p className='lg:text-2xl text-xl text-[#121212]'>The dot matrix display shows the time, your daily water intake percentage, and fun animations, making hydration more engaging.</p>
                        </div>

                    </div>

                    <div className='w-full h-full flex-shrink-0 bg-purple-500 flex flex-col items-center justify-center end-pin-here'>
                        <div className='flex flex-col lg:p-16 p-6'>
                            <h2 className='lg:text-2xl text-xl font-medium text-[#121212]'>Personalised Animations and Graffiti.</h2>
                            <p className='lg:text-2xl text-xl text-[#121212]'>Make your bottle your own with animations and graffiti displayed on the screen.</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductLandingPage