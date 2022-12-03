// import {StudioPinStyle} from './StudioPinStyle.js'
import { useEffect, useState } from 'react';
import './StudioPin.css'
import Box from '@mui/material/Box';

const StudioPin = (props) => {
    const studio = props.studio;
    const [mouseOn, sMouseOn] = useState(false);
    // const [style, setStyle] = useState(StudioPinStyle);

    // let toggleHover = (on) => {
    //     if (on === 1) {
    //         setStyle(style => ({
    //             ...style,
    //             backgroundColor: 'blue'
    //         }))
    //     } else {
    //         setStyle(style => ({
    //             ...style,
    //             backgroundColor: 'white'
    //         }))

    //     }
    // }

    const showInfo = () => {
        // TODO:
        console.log(studio)
    }

    return (
        <div className='studio-pin'
            key={studio.id}
            onClick={showInfo}
            // onMouseEnter={() => sMouseOn(true)}
            // onMouseLeave={() => sMouseOn(false)} 
        >
            {props.order}
        </div>
    );
}

export default StudioPin;