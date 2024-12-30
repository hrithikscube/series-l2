import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { MeshStandardMaterial, PlaneGeometry } from "three";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const WaterPlane = () => {
    const waterRef = useRef();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useFrame(({ clock }) => {
        if (waterRef.current) {
            const time = clock.getElapsedTime();
            waterRef.current.material.uniforms.uTime.value = time;
            waterRef.current.material.uniforms.uMouse.value = new THREE.Vector2(
                mouse.x,
                mouse.y
            );
        }
    });

    const handlePointerMove = (event) => {
        const { x, y } = event.pointer;
        setMouse({ x: x / window.innerWidth, y: y / window.innerHeight });
    };

    return (
        <mesh
            ref={waterRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.5, 0]}
            onPointerMove={handlePointerMove}
        >
            <planeGeometry args={[2, 2, 64, 64]} />
            <shaderMaterial
                uniforms={{
                    uTime: { value: 0 },
                    uMouse: { value: new THREE.Vector2(0, 0) },
                }}
                vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(uv.x * 10.0 + uTime) * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
                fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          void main() {
            vec3 color = vec3(0.0, 0.5 + sin(uTime) * 0.5, 1.0);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
            />
        </mesh>
    );
};

const PhysicsTest = () => {
    return (
        <div className="flex flex-col w-full h-screen">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial
                        color="blue"
                        transparent
                        opacity={0.4}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <WaterPlane />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default PhysicsTest;
