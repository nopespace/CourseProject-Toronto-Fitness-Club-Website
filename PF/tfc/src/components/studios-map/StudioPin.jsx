import { useEffect, useState } from 'react';
import './Pin.css'
import Typography from '@mui/material/Typography';

const StudioPin = (props) => {
    const studio = props.studio;
    // const [mouseOn, sMouseOn] = useState(false);

    const showInfo = () => {
        // TODO:
        console.log(studio)
    }

    return (
        <>
            {/* {mouseOn && <Typography>{studio.name}</Typography>}
            {mouseOn && <Typography>{studio.address}</Typography>} */}
            <div className='studio-pin'
                key={studio.id}
                onClick={showInfo}
                // onMouseEnter={()=>sMouseOn(true)}
                // onMouseLeave={()=>sMouseOn(false)}
            >
                {studio.order}
            </div>
        </>
    );
}

export default StudioPin;