import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CollidingSpheres = ({ modelPath }) => {
    const containerRef = useRef(null);
    const [spheres, setSpheres] = useState([]);
    const [velocities, setVelocities] = useState([]);
    const [model, setModel] = useState(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Load the model
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            const loadedModel = gltf.scene;
            scene.add(loadedModel);

            // Find all meshes named 'Icosphere'
            const icospheres = [];
            loadedModel.traverse((child) => {
                if (child.isMesh && child.name === 'Icosphere') {
                    icospheres.push(child);
                }
            });

            if (icospheres.length > 0) {
                const newVelocities = icospheres.map(() => new THREE.Vector3(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05));
                setSpheres(icospheres);
                setVelocities(newVelocities);
            }
            setModel(loadedModel);
        });

        camera.position.z = 15;

        // Function to detect and handle collisions
        const checkCollisions = () => {
            const newVelocities = [...velocities];

            for (let i = 0; i < spheres.length; i++) {
                for (let j = i + 1; j < spheres.length; j++) {
                    const sphereA = spheres[i];
                    const sphereB = spheres[j];

                    const distance = sphereA.position.distanceTo(sphereB.position);
                    const collisionDistance = 2; // Sum of both radii (1 + 1)

                    if (distance < collisionDistance) {
                        // Basic collision response: swap velocities (simplistic elastic collision)
                        const temp = newVelocities[i];
                        newVelocities[i] = newVelocities[j];
                        newVelocities[j] = temp;
                    }
                }
            }

            setVelocities(newVelocities);
        };

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update the positions of the spheres based on velocity
            for (let i = 0; i < spheres.length; i++) {
                spheres[i].position.add(velocities[i]);
            }

            // Check for collisions
            checkCollisions();

            // Render the scene
            renderer.render(scene, camera);
        };

        animate();

        // Resize renderer on window resize
        const onResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }, [modelPath, spheres, velocities]); // Re-run effect when modelPath, spheres, or velocities change

    return <div ref={containerRef} />;
};

export default CollidingSpheres;
