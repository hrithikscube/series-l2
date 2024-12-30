import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RippleSheet = () => {
    const meshRef = useRef()
    const mouse = useRef(new THREE.Vector2(0, 0));

    // Plane generation and wave logic
    const Plane = () => {
        const gridSize = 10;
        const resolution = 20; // Subdivisions

        // Create a buffer geometry plane
        const geometry = new THREE.PlaneGeometry(gridSize, gridSize, resolution, resolution);
        const vertices = geometry.attributes.position.array;

        useFrame(({ mouse: { x, y } }) => {
            mouse.current.set(x * gridSize, y * gridSize);

            for (let i = 0; i < vertices.length; i += 3) {
                const distance = Math.hypot(
                    mouse.current.x - vertices[i],
                    mouse.current.y - vertices[i + 1]
                );
                const wave = Math.sin(distance - performance.now() * 0.005) * 0.2;
                vertices[i + 2] = wave;
            }

            geometry.attributes.position.needsUpdate = true;
        });

        return (
            <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="lightblue" wireframe />
            </mesh>
        );
    };

    return <Plane />;
};

const Ripple = () => {
    return (
        <div className="w-full h-screen">
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Physics>
                    <RippleSheet />
                </Physics>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Ripple;
