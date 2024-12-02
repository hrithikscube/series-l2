/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ modelPath, rotation }) => {
    const groupRef = useRef();
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }, [rotation]);

    return <primitive ref={groupRef} object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const Lights = () => {
    const directionalLightRef = useRef();
    // useHelper(directionalLightRef, THREE.DirectionalLightHelper);

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
    );
};

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

const GLTF = ({ modelPath, noControls, rotation, triggerAnimation }) => {
    return (
        <Canvas shadows camera={{ position: [0, 3, 3], fov: 50, isPerspectiveCamera: true }}>
            <Lights />
            <Model modelPath={modelPath} rotation={rotation} />
            {!noControls && <OrbitControls enableDamping />}
            <CameraAnimation triggerAnimation={triggerAnimation} />
        </Canvas>
    );
};

export default GLTF;
