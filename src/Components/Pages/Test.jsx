import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import WaterBottle from '../../Assets/water_bottle.glb';

import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

const Model = ({ modelPath, rotation, position }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        if (groupRef.current && typeof rotation !== 'undefined') {
            groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }, [rotation]);

    useEffect(() => {
        if (groupRef.current && typeof position !== 'undefined') {
            groupRef.current.position.set(position.x, position.y, position.z);
        }
    }, [position]);


    return <primitive ref={groupRef} object={scene} scale={[1, 1, 1]} position={[0, -1, 0]} />;
}

const Lights = () => {
    const directionalLightRef = useRef()

    return (
        <>
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={0.6} />
            <directionalLight
                ref={directionalLightRef}
                position={[5, 10, 7.5]}
                castShadow
                shadow-mapSize={[1024, 1024]}
                intensity={1}
            />
        </>
    )
}

const Test = () => {

    const [rotation, setRotation] = useState({
        x: 0, y: 0, z: 0
    })

    const [position, setPosition] = useState({
        x: 0, y: -1, z: 0
    })

    useEffect(() => {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

        let ctx = gsap.context(() => {

            gsap.to('.water-bottle-section', {
                scrollTrigger: {
                    trigger: '.water-bottle-section',
                    start: 'top top',
                    pin: true,
                    endTrigger: '.section-4',
                    end: 'bottom bottom',
                    pinSpacing: false,
                    markers: true,
                    onUpdate: (self) => {
                        setRotation({
                            ...rotation,
                            x: 10 * self.progress,
                            y: 10 * self.progress,
                        })
                    }
                }
            })

        })

        return () => ctx.revert()

    }, [])

    return (
        <div>
            <div className='flex flex-col items-center justify-center w-full h-screen water-bottle-section'>
                <Canvas shadows camera={{ position: [0, 3.5, 6], fov: 50 }}>
                    <Model modelPath={WaterBottle} rotation={rotation} position={position} />
                    <Lights />
                    {/* <OrbitControls /> */}
                </Canvas>
            </div>

            <div className='section-2 flex flex-col items-center justify-center w-full h-screen bg-blue-200 text-[5rem] font-medium text-[#121212]/90'>

                Section 2

            </div>

            <div className='section-3 flex flex-col items-center justify-center w-full h-screen bg-blue-400 text-[5rem] font-medium text-[#121212]/90'>

                Section 3

            </div>

            <div className='section-4 flex flex-col items-center justify-center w-full h-screen bg-blue-600 text-[5rem] font-medium text-[#121212]/90'>

                Section 4

            </div>


        </div>
    )
}

export default Test