import * as React from "react";
import StudioPinPoint from "../components/StudioPinPoint";
import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';


const StudiosMap = (props) => {
    const studios = props.studios;

    return (
        <Box style={{ height: '80vh', width: '50%', margin: 30 }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDqCaJKiXq4ejDBTZOhV0Dbv-FCZiuKpLM' }}
                defaultCenter={props.mapDefaultProps.center}
                defaultZoom={props.mapDefaultProps.zoom}
            >
                {studios && studios.map(studio => {
                    return (
                        <StudioPinPoint
                            key={studio.id}
                            lat={studio.latitude}
                            lng={studio.longitude}
                            studio={studio}
                        />
                    )
                })}

            </GoogleMapReact>
        </Box>
    )
}

export default StudiosMap;