import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

import SeriesL2 from '../../Assets/series-l2.glb';
import PhotoStudioEnv from '../../Assets/photostudio.hdr';
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

import gsap from 'gsap/dist/gsap'
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";


const Model = ({ modelPath, videoPath, meshName }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        if (typeof videoPath !== 'undefined') {
            const video = document.createElement("video");
            video.src = videoPath;
            video.loop = true;
            video.muted = true; // Autoplay requirement
            video.play();

            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.format = THREE.RGBAFormat;

            scene.traverse((child) => {
                if (child.isMesh && child.name === meshName) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: videoTexture,
                    });
                }
            });
        }
    }, [modelPath, videoPath, scene, meshName]);

    // useFrame(() => {
    //     if (groupRef.current) {
    //         groupRef.current.rotation.y += 0.005; // Rotate model
    //     }
    // });

    return <primitive ref={groupRef} object={scene} scale={12} position={[0, -1.5, 0]} />;
};

const Temp = () => {

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

        gsap.fromTo('.series-l2-subtext', {
            y: '120%',
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.5,
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

        gsap.set('.series-l2-bottle', {
            y: '50%',
            x: '50%',
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
                }
            })


            gsap.to('.series-l2-bottle', {
                x: 0,
                y: 0,
                ease: "power1.inOut",
                duration: 2,
                scrollTrigger: {
                    trigger: '.live-life-section',
                    pin: '.live-life-section',
                    start: 'top top',
                    end: 'bottom bottom',
                    markers: true,
                    scrub: 2
                }
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

            <div className="w-full mx-auto h-screen flex flex-col relative z-[20] live-life-section">

                <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center">

                    <h2 className="3xl:text-lg lg:text-base text-sm font-medium text-[#121212]">Introducing Series L2</h2>
                    <h2 className="3xl:text-5xl lg:text-4xl text-2xl font-bold text-[#121212] lg:w-4/12 mx-auto text-center">Designed for those who live life on the go</h2>

                </div>

                <div className="w-1/2 h-full series-l2-bottle debug">
                    <Canvas camera={{ position: [2, 1, 3] }}>
                        <ambientLight intensity={1} />
                        <directionalLight position={[0.145, 0.2, 0.015]} intensity={0.8} />
                        <Model
                            modelPath={SeriesL2}
                            meshName="body" />
                        <Environment files={PhotoStudioEnv} background={false} />
                        {/* <OrbitControls /> */}
                    </Canvas>
                </div>
            </div>


            {
                [...Array(10)].map((item, index) => (
                    <div className={`flex flex-col w-full h-screen ${index % 2 === 0 ? 'bg-blue-200' : 'bg-red-200'} items-center justify-center text-[5rem] font-semibold text-[#121212] z-[30] relative`}>

                        Section {index + 1}

                    </div>
                ))
            }




        </div>
    );
};

export default Temp;
