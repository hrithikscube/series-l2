import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import SeriesL2 from '../../Assets/series-l2.glb';
import PhotoStudioEnv from '../../Assets/photostudio.hdr';
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

// const VideoBox = ({ videoPath }) => {
//     const boxRef = useRef();
//     let scaleFactor = 0;

//     // Load video texture
//     useEffect(() => {
//         const video = document.createElement("video");
//         video.src = videoPath;
//         video.loop = true;
//         video.muted = true;
//         video.play();

//         const videoTexture = new THREE.VideoTexture(video);
//         videoTexture.minFilter = THREE.LinearFilter;
//         videoTexture.magFilter = THREE.LinearFilter;
//         videoTexture.format = THREE.RGBAFormat;

//         // Assign video texture to material
//         if (boxRef.current) {
//             boxRef.current.material = new THREE.MeshStandardMaterial({
//                 map: videoTexture,
//             });
//         }
//     }, [videoPath]);

//     // Add rotation and zoom animation
//     useFrame(({ clock }) => {
//         if (boxRef.current) {
//             // Rotation animation
//             // boxRef.current.rotation.z += 0.01;
//             boxRef.current.rotation.y += 0.05;
//             // boxRef.current.rotation.x += 0.01;

//             // Zoom animation (scaling effect)
//             // scaleFactor = 1 + 0.3 * Math.sin(clock.elapsedTime * 2); // Oscillates between 0.7 and 1.3
//             // boxRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         }
//     });

//     return (
//         <mesh ref={boxRef}>
//             <boxGeometry args={[2, 2, 2]} />
//             <meshStandardMaterial />
//         </mesh>
//     );
// };

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

    return <primitive ref={groupRef} object={scene} scale={12} position={[0, -1, 0]} />;
};

const Temp = () => {

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[0.145, 0.2, 0.015]} intensity={0.8} />
                    <Environment
                        files={PhotoStudioEnv}
                        background
                    />
                    <Model
                        modelPath={SeriesL2}
                        meshName="body" />

                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    );
};

export default Temp;
