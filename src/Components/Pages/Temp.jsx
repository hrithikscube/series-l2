import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import PhotoStudio from '../../Assets/photostudio.hdr';
import { Environment, useGLTF } from "@react-three/drei";
import BottleWithHand from '../../Assets/bottle-with-hand.glb';
import { TextureLoader } from "three";

import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";


const Model = ({ modelPath, texturePath, targetMeshName }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(texturePath);

        // Find the target mesh by name and apply the texture
        scene.traverse((child) => {
            if (child.isMesh && child.name === targetMeshName) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });
    }, [scene, texturePath, targetMeshName]);

    return <primitive ref={groupRef} object={scene} scale={12} position={[8, -12, 1]} />;
};


const Temp = () => {

    useEffect(() => {

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

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
                    markers: true
                }
            })
        })

        return () => ctx.revert()

    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="w-full h-screen hero-section">
                <div className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center">
                    <Canvas>
                        <Environment files={PhotoStudio} />
                        <Model texturePath="/series-l2/water-texture.jpeg" modelPath={BottleWithHand} targetMeshName="water" />
                        {/* <OrbitControls /> */}
                    </Canvas>
                </div>
            </div>

            <div className="w-full h-screen bg-blue-200">

            </div>

            <div className="w-full h-screen bg-red-200">

            </div>

            <div className="w-full h-screen bg-amber-200">

            </div>

            <div className="w-full h-screen bg-purple-200">

            </div>
        </div>
    );
};

export default Temp;