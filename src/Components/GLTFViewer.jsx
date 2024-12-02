/* eslint-disable */

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';


const GLTFViewer = ({ modelPath, noControls, parallax, triggerAnimation }) => {
    const mountRef = useRef(null);
    const cameraRef = useRef(null);

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            32,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.5, 3);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Ambient Light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Hemisphere Light for soft natural lighting
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemisphereLight.position.set(0, 20, 0);
        scene.add(hemisphereLight);

        // Directional Light to create shadows and depth
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;
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
                camera.position.copy(center).add(new THREE.Vector3(0, size / 2, size * 1.5));
                camera.lookAt(center);

                if (noControls) {
                    controls.enableZoom = false;
                    controls.enableRotate = false;
                    controls.enablePan = false;
                }

                controls.update();

                const onMouseMove = (event) => {
                    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

                    scene.rotation.y = mouseX * 0.5;
                    scene.rotation.x = mouseY * 0.5;
                };

                if (parallax) {
                    window.addEventListener('mousemove', onMouseMove);

                    return () => {
                        window.removeEventListener('mousemove', onMouseMove);
                    };
                }

            },
            undefined,
            (error) => {
                console.error('Error loading GLTF:', error);
            }
        );



        const animate = () => {
            requestAnimationFrame(animate);


            controls.update();
            renderer.render(scene, camera);
        };

        animate();


        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [modelPath, noControls, parallax]);


    useEffect(() => {
        if (!triggerAnimation || !cameraRef.current) return;

        const camera = cameraRef.current;
        const startZoom = 7; // Start zoom level
        const endZoom = 0.6; // End zoom level
        const duration = 2500; // 2 seconds
        let startTime = null;

        const zoomAnimation = (time) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            let t = Math.min(elapsed / duration, 1); // Normalize time to [0, 1]

            t = t * t; // Apply ease-in effect (quadratic easing)

            camera.zoom = THREE.MathUtils.lerp(startZoom, endZoom, t);
            camera.updateProjectionMatrix();

            if (t < 1) {
                requestAnimationFrame(zoomAnimation);
            }
        };

        requestAnimationFrame(zoomAnimation);
        // eslint-disable-next-line
    }, [triggerAnimation]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} className='w-full h-full flex-shrink-0' />;
};

export default GLTFViewer;
