// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Canvas } from '@react-three/fiber';
// import React, { useEffect, useRef, useState } from 'react';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import WaterBottleFlask from '../../Assets/water_bottleflask.glb';

// gsap.registerPlugin(ScrollTrigger);

// const GLTFViewer = ({ modelPath, rotation }) => {
//     const modelRef = useRef();

//     useEffect(() => {
//         if (modelRef.current) {
//             gsap.to(modelRef.current.rotation, {
//                 x: rotation.x,
//                 y: rotation.y,
//                 z: rotation.z,
//                 duration: 0.5,
//                 ease: 'power2.out',
//             });
//         }
//     }, [rotation]);

//     const Model = () => {
//         const { scene } = useGLTF(modelPath);
//         return <primitive ref={modelRef} object={scene} />;
//     };

//     return (
//         <Canvas>
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[5, 5, 5]} />
//             <OrbitControls enableZoom={false} />
//             <Model />
//         </Canvas>
//     );
// };

// const Test = () => {
//     const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
//     const modelContainerRef = useRef();

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollY = window.scrollY || window.pageYOffset;
//             const mappedRotationY = scrollY * 0.005; // Adjust multiplier for intensity
//             setRotation({ x: 0, y: mappedRotationY, z: 0 });
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         let ctx = gsap.context(() => {
//             if (modelContainerRef.current) {
//                 gsap.fromTo(
//                     modelContainerRef.current,
//                     { position: 'absolute', top: '0' },
//                     {
//                         scrollTrigger: {
//                             trigger: modelContainerRef.current,
//                             start: 'top top',
//                             end: '200%',
//                             pin: true, // Pin the model during scrolling
//                             scrub: true,
//                             markers: true, // Remove markers for better visual experience
//                         },
//                     }
//                 );
//             }
//         })

//         return () => ctx.revert()
//     }, []);

//     return (
//         <div className='w-full'>
//             <div ref={modelContainerRef} style={{ height: '100vh', width: '100%' }} className='flex flex-col items-center justify-center w-full h-screen'>
//                 <GLTFViewer modelPath={WaterBottleFlask} rotation={rotation} />
//             </div>

//             {/* Additional sections */}
//             <section style={{ height: '100vh', width: '100%', backgroundColor: '#f0f0f0' }}>
//                 <h2>Section 1</h2>
//                 <p>Content for the first section underneath the model.</p>
//             </section>
//             <section style={{ height: '100vh', width: '100%', backgroundColor: '#e0e0e0' }}>
//                 <h2>Section 2</h2>
//                 <p>Content for the second section underneath the model.</p>
//             </section>
//         </div>
//     );
// };

// export default Test;



import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import WaterBottleFlask from '../../Assets/water_bottleflask.glb';

gsap.registerPlugin(ScrollTrigger);

const GLTFViewer = ({ modelPath, rotation }) => {
    const modelRef = useRef();

    useEffect(() => {
        if (modelRef.current) {
            gsap.to(modelRef.current.rotation, {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    }, [rotation]);

    const Model = () => {
        const { scene } = useGLTF(modelPath);

        // Scale the model to fit inside the screen (adjust scale factor as needed)
        scene.scale.set(0.5, 0.5, 0.5); // Adjust scale based on your model's size

        return <primitive ref={modelRef} object={scene} />;
    };

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls enableZoom={false} />
            <Model />
        </Canvas>
    );
};

const Test = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const modelContainerRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const mappedRotationY = scrollY * 0.005; // Adjust multiplier for intensity
            setRotation({ x: 0, y: mappedRotationY, z: 0 });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            if (modelContainerRef.current) {
                gsap.fromTo(
                    modelContainerRef.current,
                    { position: 'absolute', top: '0' },
                    {
                        scrollTrigger: {
                            trigger: modelContainerRef.current,
                            start: 'top top',
                            end: '200%',
                            pin: true, // Pin the model during scrolling
                            scrub: true,
                            markers: false, // Remove markers for better visual experience
                        },
                    }
                );
            }
        })

        return () => ctx.revert()
    }, []);

    return (
        <div className='w-full'>
            {/* Pinning and centering the model */}
            <div ref={modelContainerRef} className="flex items-center justify-center w-full h-screen">
                <GLTFViewer modelPath={WaterBottleFlask} rotation={rotation} />
            </div>

            {/* Additional sections */}
            <section className="h-screen w-full bg-gray-200">
                <h2>Section 1</h2>
                <p>Content for the first section underneath the model.</p>
            </section>
            <section className="h-screen w-full bg-gray-300">
                <h2>Section 2</h2>
                <p>Content for the second section underneath the model.</p>
            </section>
        </div>
    );
};

export default Test;
