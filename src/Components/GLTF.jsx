/* eslint-disable */

import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// const Model = ({ modelPath, rotation, texturePath }) => {
//     const groupRef = useRef();
//     const { scene } = useGLTF(modelPath);

//     useEffect(() => {
//         if (groupRef.current && typeof rotation !== 'undefined') {
//             groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
//         }
//     }, [rotation]);

//     useEffect(() => {
//         if (texturePath) {
//             const textureLoader = new THREE.TextureLoader();
//             textureLoader.load(texturePath, (texture) => {
//                 scene.traverse((child) => {
//                     if (child.isMesh) {
//                         child.material.map = texture;
//                         child.material.needsUpdate = true;
//                     }
//                 });
//             });
//         }
//     }, [texturePath, scene]);

//     return <primitive ref={groupRef} object={scene} scale={[0.6, 0.6, 0.6]} position={[0, -0.05, 0]} />;
// };

const Model = ({ modelPath, texturePath, meshName, rotation }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);
    const textureLoader = new THREE.TextureLoader();

    useEffect(() => {
        // Load the texture
        const texture = textureLoader.load(texturePath, () => {
            scene.traverse((child) => {
                console.log(child.name, child.isMesh)

                // Apply texture only to the specific mesh name
                if (child.isMesh && child.name === meshName) {
                    child.material.color.set(0xbef264);

                    child.material.transparent = true;
                    child.material.opacity = 0.98; // Slight opacity
                    child.material.roughness = 2; // High roughness for a matte finish
                    child.material.metalness = 0; // No metallic effect
                    child.material.needsUpdate = true;
                }
            });
        });
    }, [texturePath, scene, meshName]);

    useEffect(() => {
        if (groupRef.current && rotation) {
            groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }, [rotation]);

    return <primitive ref={groupRef} object={scene} scale={[0.6, 0.6, 0.6]} position={[0, -0.05, 0]} />;
};


// const Lights = () => {
//     const directionalLightRef = useRef();
//     // useHelper(directionalLightRef, THREE.DirectionalLightHelper);

//     return (
//         <>
//             <ambientLight intensity={1} />
//             <hemisphereLight intensity={0} />
//             <directionalLight
//                 ref={directionalLightRef}
//                 position={[5, 10, 7.5]}
//                 castShadow={false}
//                 shadow-mapSize={[1024, 1024]}
//                 intensity={5}
//             />
//         </>
//     );
// };

const Lights = () => {
    const directionalLightRef = useRef()

    return (
        <>
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={0.6} />
            <directionalLight
                ref={directionalLightRef}
                position={[1, 10, 10]}
                castShadow
                shadow-mapSize={[1024, 1024]}
                intensity={1}
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
        const duration = 2.5; // in seconds

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

const GLTF = ({ modelPath, noControls, rotation, triggerAnimation, id, texturePath, meshName }) => {
    return (
        <Canvas id={id} shadows
            camera={{
                position: [0, 1.5, 3],
                // position: [0, 0, 0],
                fov: 4
            }}>
            <Lights />
            <Model meshName={meshName} modelPath={modelPath} rotation={rotation} texturePath={texturePath} />
            {!noControls && <OrbitControls enableDamping />}
            <CameraAnimation triggerAnimation={triggerAnimation} />
        </Canvas>
    );
};

export default GLTF;
