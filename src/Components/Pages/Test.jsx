import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import WaterBottle from '../../Assets/water_bottle.glb';

import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { Vector3 } from 'three';


function generateXValues(n, max = 4, step = 0.08) {
    const range = Math.floor(max / step); // Number of steps in one phase
    const result = [];
    for (let i = 0; i < n; i++) {
        const phase = Math.floor(i / range) % 4;
        const position = (i % range) * step; // Incremental step

        if (phase === 0) result.push(+position.toFixed(1)); // 0 to max
        else if (phase === 1) result.push(+(max - position).toFixed(1)); // max to 0
        else if (phase === 2) result.push(-position.toFixed(1)); // 0 to -max
        else result.push(-(max - position).toFixed(1)); // -max to 0
    }
    return result;
}

let xValues = generateXValues(120);

console.log(xValues, 'xValues')

const Model = ({ modelPath, rotation, position }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    // Store the target position and a smooth position
    const targetPosition = useRef(new Vector3(0, -1, 0));
    const smoothPosition = useRef(new Vector3(0, -1, 0));

    useEffect(() => {
        if (position) {
            targetPosition.current.set(position.x, position.y, position.z);
        }
    }, [position]);

    useEffect(() => {
        if (rotation && groupRef.current) {
            groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }, [rotation]);

    useFrame(() => {
        if (groupRef.current) {
            smoothPosition.current.lerp(targetPosition.current, 0.1); // Smooth interpolation
            groupRef.current.position.copy(smoothPosition.current);
        }
    });

    return <primitive ref={groupRef} object={scene} scale={[1.1, 1.1, 1.1]} />;
};

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
                            z: 10 * self.progress,
                        })

                        // console.log(Math.round(100 * self.progress))
                        // setPosition({
                        //     ...position,
                        //     x: xValues[Math.round(100 * self.progress)]
                        // })

                        const progressIndex = Math.round(self.progress * (xValues.length - 1));
                        setPosition({
                            ...position,
                            // x: xValues[progressIndex],s
                            x: -xValues[progressIndex]
                        });
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

            {
                React.Children.toArray([...Array(10)].map((item, index) => (
                    <div className='section-3 flex flex-col items-center justify-center w-full h-screen bg-blue-400 text-[5rem] font-medium text-[#121212]/90'>

                        Section {3 + index}

                    </div>
                )))
            }

            <div className='section-4 flex flex-col items-center justify-center w-full h-screen bg-blue-600 text-[5rem] font-medium text-[#121212]/90'>

                Section 4

            </div>


        </div>
    )
}

export default Test