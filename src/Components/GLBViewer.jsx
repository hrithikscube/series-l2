// // src/components/GLBViewer.js
// import './GLBViewer.css';
// import * as THREE from 'three';
// import React, { useEffect, useRef, useState } from 'react';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const GLBViewer = ({ modelPath, modelColor, noControls, x, y, z }) => {
//     const mountRef = useRef(null);

//     useEffect(() => {
//         const scene = new THREE.Scene();
//         // scene.background = new THREE.Color(); // Set background color
//         scene.background = null

//         const camera = new THREE.PerspectiveCamera(
//             60,
//             mountRef.current.clientWidth / mountRef.current.clientHeight,
//             0.1,
//             1000
//         );
//         camera.position.z = 5;

//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//         mountRef.current.appendChild(renderer.domElement);

//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.target.set(x, y, z);
//         if (noControls) {
//             controls.enableZoom = false; // Disable zoom
//             controls.enableRotate = false; // Disable rotation
//             controls.enablePan = false;
//         }
//         controls.update();

//         // Add lighting
//         const ambientLight = new THREE.AmbientLight(0xffffff, 5); // Add ambient light
//         scene.add(ambientLight);

//         const light = new THREE.HemisphereLight(0xffffff, 0x444444);
//         light.position.set(0, 20, 0);
//         scene.add(light);

//         let model;
//         const loader = new GLTFLoader();
//         loader.load(
//             modelPath,
//             (gltf) => {
//                 model = gltf.scene;
//                 model.scale.set(1, 1, 1); // Adjust the scale if needed
//                 scene.add(model);

//                 // Center and scale the model
//                 const box = new THREE.Box3().setFromObject(model);
//                 const size = box.getSize(new THREE.Vector3()).length();
//                 const center = box.getCenter(new THREE.Vector3());

//                 model.position.x += (model.position.x - center.x);
//                 model.position.y += (model.position.y - center.y);
//                 model.position.z += (model.position.z - center.z);

//                 camera.near = size / 100;
//                 camera.far = size * 100;
//                 camera.updateProjectionMatrix();

//                 camera.position.copy(center);
//                 camera.position.x += size / 10.0;
//                 camera.position.y += size / -1.0;
//                 camera.position.z += size / 10.0;
//                 camera.lookAt(center);

//                 controls.maxDistance = size * 10;
//                 controls.update();

//                 // Change the model color
//                 model.traverse((child) => {
//                     if (child.isMesh) {
//                         // Create a new material with the desired color
//                         const newMaterial = new THREE.MeshStandardMaterial({
//                             color: new THREE.Color(modelColor),
//                             roughness: 0.5,
//                             metalness: 0.5,
//                         });
//                         child.material = newMaterial;
//                     }
//                 });
//             },
//             undefined,
//             (error) => {
//                 console.error('An error happened', error);
//             }
//         );

//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         animate();

//         return () => {
//             mountRef.current.removeChild(renderer.domElement);
//         };
//     }, [modelPath, modelColor]);

//     return <div ref={mountRef} className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center"></div>;
// };

// export default GLBViewer;

// src/components/GLBViewer.js
import './GLBViewer.css';
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GLBViewer = ({ modelPath, modelColor, noControls, x, y, z }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(
            60,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(x, y, z);
        if (noControls) {
            controls.enableZoom = false;
            controls.enableRotate = false;
            controls.enablePan = false;
        }
        controls.update();

        const ambientLight = new THREE.AmbientLight(0xffffff, 5);
        scene.add(ambientLight);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);

        let model;
        const loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                model = gltf.scene;
                model.scale.set(1, 1, 1);
                scene.add(model);

                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3()).length();
                const center = box.getCenter(new THREE.Vector3());

                model.position.x += (model.position.x - center.x);
                model.position.y += (model.position.y - center.y);
                model.position.z += (model.position.z - center.z);

                camera.near = size / 100;
                camera.far = size * 100;
                camera.updateProjectionMatrix();

                camera.position.copy(center);
                camera.position.x += size / 10.0;
                camera.position.y += size / -1.0;
                camera.position.z += size / 10.0;
                camera.lookAt(center);

                controls.maxDistance = size * 10;
                controls.update();

                model.traverse((child) => {
                    if (child.isMesh) {
                        const newMaterial = new THREE.MeshStandardMaterial({
                            color: new THREE.Color(modelColor),
                            roughness: 0.5,
                            metalness: 0.5,
                        });
                        child.material = newMaterial;
                    }
                });

                // Parallax effect
                const onMouseMove = (event) => {
                    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

                    model.rotation.y = mouseX * 0.5; // Adjust rotation sensitivity
                    model.rotation.x = mouseY * 0.5;
                };

                window.addEventListener('mousemove', onMouseMove);

                // Cleanup on component unmount
                return () => {
                    window.removeEventListener('mousemove', onMouseMove);
                };
            },
            undefined,
            (error) => {
                console.error('An error happened', error);
            }
        );

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [modelPath, modelColor]);

    return <div ref={mountRef} className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center"></div>;
};

export default GLBViewer;
