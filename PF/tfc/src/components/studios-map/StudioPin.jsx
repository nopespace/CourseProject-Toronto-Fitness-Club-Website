import { useEffect, useState } from 'react';
import './Pin.css'
import Box from '@mui/material/Box';

const StudioPin = (props) => {
    const studio = props.studio;

    const showInfo = () => {
        // TODO:
        console.log(studio)
    }

    return (
        <div className='studio-pin'
            key={studio.id}
            onClick={showInfo}
        >
            {props.order}
        </div>
    );
}

export default StudioPin;