import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

import gsap from 'gsap/dist/gsap'
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

import WaterAnimation from '../../Assets/water_animation.glb';
import WaterLayer from '../../Assets/water_layer.glb'
// import WaterMdd from '../../Assets/water_animation.mdd'

// import { MeshStandardMaterial } from "three";

import * as THREE from "three";

const Model = ({ modelPath, meshName, triggerAnimation }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);
    const clock = new THREE.Clock();

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.name === meshName) {
                const geometry = child.geometry;

                // Ensure the geometry has position attribute
                const positionAttribute = geometry.attributes.position;
                const vertexCount = positionAttribute.count;

                // Save the original positions
                const originalPositions = positionAttribute.array.slice();
                const tempPositions = new Float32Array(originalPositions);

                // Add the tempPositions to geometry for manipulation
                positionAttribute.array = tempPositions;
                positionAttribute.needsUpdate = true;

                if (triggerAnimation) {
                    child.userData.animateVertices = (time) => {
                        for (let i = 0; i < vertexCount; i++) {
                            const x = originalPositions[i * 3];
                            const y = originalPositions[i * 3 + 1];
                            const z = originalPositions[i * 3 + 2];

                            // Strong wave animation (storm effect)
                            const waveIntensityX = 0.1; // Increase for stronger wave heights
                            const waveIntensityY = 0.1;
                            const waveFrequency = 12;   // Higher values for choppier waves

                            // tempPositions[i * 3 + 2] = z + Math.sin(time * waveFrequency + x * 2) * waveIntensityX;
                            tempPositions[i * 3 + 1] = y + Math.sin(time * waveFrequency + z * 2) * waveIntensityY;
                        }
                        positionAttribute.needsUpdate = true;
                    };
                }

            }
        });
    }, [scene, meshName, triggerAnimation]);

    useFrame(() => {
        const elapsedTime = clock.getElapsedTime();

        // Traverse the scene and animate vertices
        scene.traverse((child) => {
            if (child.name === 'Plane') {
                child.visible = false
            }

            if (child.isMesh && child.name === meshName && child.userData.animateVertices) {
                child.material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9 })
                child.userData.animateVertices(elapsedTime);

            }
        });

        // Rotate the model
        // if (groupRef.current) {
        //     groupRef.current.rotation.y += 0.01;
        // }
    });

    return <primitive ref={groupRef} object={scene} scale={0.3} position={[0, 0, 0]} />;
};


const Temp = () => {

    const [triggerAnimation, setTriggerAnimation] = useState(false)

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

        gsap.fromTo('.series-l2-subtext', {
            y: '120%',
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut',
            stagger: 0.1
        })

        gsap.fromTo('.series-l2-text', {
            y: '100%',
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut',
            stagger: 0.1
        })

        let ctx = gsap.context(() => {

            gsap.to('.hero-bottle', {
                rotate: 75,
                y: '-90%',
                x: '100%',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: '30% top',
                    end: 'bottom bottom',
                    scrub: 3,
                },

            })

            gsap.to('.water-section', {
                scrollTrigger: {
                    trigger: '.water-section',
                    start: 'top top',
                    end: 'bottom bottom',
                    markers: true,
                    scrub: 2,
                    onUpdate: (self) => {
                        if (self.progress === 0) {
                            setTriggerAnimation(false)
                        }
                        else {
                            setTriggerAnimation(true)
                        }
                    }
                },

            })

        })

        return () => ctx.revert()

    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">


            <div className={`flex flex-col w-full h-screen bg-gradient-to-b from-[#f2f2f2] to-[#808080]/30 items-center justify-center text-[5rem] font-semibold text-[#121212] hero-section relative`}>

                <div className="w-full h-full object-contain hero-bottle z-[20] relative">

                    <img src="/series-l2/person-holding-bottle.webp" alt="hero-bottle" className="w-full h-full object-cover object-bottom" />

                </div>

                <div className="w-full h-full z-[10] absolute top-0 left-0 flex flex-col items-center justify-start lg:p-16 p-10">

                    <div className="flex items-center justify-center gap-2">
                        {
                            React.Children.toArray("Active Lifestyle Companion".split(' ').map(item => (
                                <h2 className="3xl:text-lg lg:text-base text-sm font-semibold text-[#121212] series-l2-subtext">{item}</h2>
                            )))
                        }
                    </div>

                    <div className="flex items-center justify-center">
                        {
                            React.Children.toArray("SeriesL2".split('').map((item, index) => (
                                <h1 className={`lg:text-9xl series-l2-text text-4xl font-bold text-[#676C6C] ${index === 5 ? 'mr-6' : ''}`}>{item}</h1>
                            )))
                        }

                    </div>
                </div>

            </div>

            <div className="w-full h-screen water-section debug">
                <Canvas camera={{ position: [1, 1, 1] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[0.145, 0.2, 0.015]} intensity={0.8} />
                    <Model
                        triggerAnimation={triggerAnimation}
                        // mddPath={WaterMdd}
                        modelPath={WaterAnimation}
                        meshName="Cylinder" />
                    {/* <OrbitControls /> */}
                </Canvas>
            </div>

        </div>
    );
};

export default Temp;
