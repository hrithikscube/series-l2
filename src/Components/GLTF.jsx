/* eslint-disable */

import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import PhotoStudioEnv from '../Assets/photostudio.hdr';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

// const Model = ({ modelPath, texturePath, meshName, rotation }) => {
//     const groupRef = useRef();
//     const { scene } = useGLTF(modelPath);
//     const textureLoader = new THREE.TextureLoader();

//     // useEffect(() => {
//     //     // Load the texture
//     //     const texture = textureLoader.load(texturePath, () => {
//     //         scene.traverse((child) => {
//     //             console.log(child.name, child.isMesh)

//     //             if (child.isMesh && child.name === meshName) {
//     //                 child.material.color.set(0xbef264);
//     //                 child.material.transparent = true;
//     //                 child.material.opacity = 0.98;
//     //                 child.material.roughness = 2;
//     //                 child.material.metalness = 0;
//     //                 child.material.needsUpdate = true;
//     //             }
//     //         });
//     //     });
//     // }, [texturePath, scene, meshName]);

//     useEffect(() => {
//         if (groupRef.current && rotation) {
//             groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
//         }
//     }, [rotation]);

//     return <primitive ref={groupRef} object={scene.clone()} scale={[0.6, 0.6, 0.6]} position={[0, -0.05, 0]} />;
// };

const Model = ({ modelPath, videoPath, meshName, rotation }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        if (typeof videoPath !== 'undefined') {
            // Create video element
            const video = document.createElement("video");
            video.src = videoPath;
            video.loop = true;
            video.muted = true; // Autoplay policies require muted videos
            video.play();

            // Create video texture
            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.format = THREE.RGBAFormat;

            // Traverse scene and apply video texture to specific mesh
            scene.traverse((child) => {
                if (child.isMesh && child.name === meshName) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: videoTexture,
                        transparent: false,
                        opacity: 1,
                        roughness: 1,
                        metalness: 0,
                    });
                    child.material.needsUpdate = true;
                }
            });

            return () => {
                video.pause();
                video.src = "";
            };
        }
    }, [scene, videoPath, meshName]);

    // Apply rotation
    useEffect(() => {
        if (groupRef.current && rotation) {
            groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }, [rotation]);

    return (
        <primitive
            ref={groupRef}
            object={scene.clone()}
            scale={[0.6, 0.6, 0.6]}
            position={[0, -0.05, 0]}
        />
    );
};


const Lights = () => {
    const directionalLightRef = useRef()

    return (
        <>
            <ambientLight intensity={1} />
            <hemisphereLight intensity={1} />
            <directionalLight
                ref={directionalLightRef}
                position={[1, 1, 1]}
                castShadow
                shadow-mapSize={[1024, 1024]}
                intensity={5}
            />
        </>
    )
}
const CameraAnimation = ({ triggerAnimation }) => {
    const { camera } = useThree();

    React.useEffect(() => {
        if (!triggerAnimation) return;

        const startZoom = 7;
        const endZoom = 0.6;
        const duration = 2.5;

        let t = 0;
        const animate = () => {
            t += 0.01;
            camera.zoom = THREE.MathUtils.lerp(startZoom, endZoom, t);
            camera.updateProjectionMatrix();

            if (t < 1) requestAnimationFrame(animate);
        };

        animate();
    }, [triggerAnimation, camera]);

    return null;
};

const GLTF = ({ modelPath, noControls, rotation, triggerAnimation, id, texturePath, videoPath, meshName }) => {
    const canvasRef = useRef()
    return (
        <Canvas ref={canvasRef} id={id} shadows
            camera={{
                position: [0, 1.5, 3],
                fov: 4
            }}>
            <ambientLight intensity={1} />
            <directionalLight position={[0.145, 0.2, 0.015]} intensity={0.8} />
            <Environment
                files={PhotoStudioEnv}
                background={false}
            />
            <Model
                meshName={meshName}
                modelPath={modelPath}
                rotation={rotation}
                // texturePath={texturePath}
                videoPath={videoPath}
            />
            {!noControls && <OrbitControls enableDamping />}
            <CameraAnimation triggerAnimation={triggerAnimation} />
        </Canvas>
    );
};

export default GLTF;
