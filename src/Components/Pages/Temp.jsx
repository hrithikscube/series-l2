import React from 'react';
import GLTF from '../GLTF';
import SecondBottle from '../../Assets/series-l2.glb';


const Temp = () => {
    return (
        <div>
            <div className='w-full h-screen'>
                <GLTF id="hero" noControls modelPath={SecondBottle} />
            </div>

            <div className='w-full h-screen'>
                <GLTF id="remaining" noControls modelPath={SecondBottle} />
            </div>
        </div>
    )
}

export default Temp