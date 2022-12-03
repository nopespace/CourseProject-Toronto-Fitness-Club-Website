import {StudioPinPointStyle} from './StudioPinPointStyle.js'
import { useEffect, useState } from 'react';

const StudioPinPoint = (props) => {
    const studio = props.studio;
    const [style, setStyle] = useState(StudioPinPointStyle);

    let toggleHover = (on) => {
        if (on === 1) {
            setStyle(style => ({
                ...style,
                backgroundColor: 'blue'
            }))
        } else {
            setStyle(style => ({
                ...style,
                backgroundColor: 'white'
            }))

        }
    }

    return (
        <div 
            key={studio.id} 
            style={style}
            // onMouseEnter={setStyle(style => ({
            //     ...style,
            //     backgroundColor: 'blue'
            // }))}
            // onMouseLeave={toggleHover(0)}
            >
            {studio.name}
        </div>
     );
}

export default StudioPinPoint;