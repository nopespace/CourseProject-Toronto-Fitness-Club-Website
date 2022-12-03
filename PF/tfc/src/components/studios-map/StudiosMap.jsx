import * as React from "react";
import StudioPin from "./StudioPin";
import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';
import UserPin from './UserPin'


const StudiosMap = (props) => {
    const studios = props.studios;
    const pos = props.pos;  //{lat:xxx, lon:xxx}
    console.log(pos)

    return (
        <Box style={{ height: '80vh', width: '80%', margin: 30,  }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDqCaJKiXq4ejDBTZOhV0Dbv-FCZiuKpLM' }}
                defaultCenter={props.mapDefaultProps.center}
                defaultZoom={props.mapDefaultProps.zoom}
            >
                
                <UserPin
                    lat={pos.lat}
                    lng={pos.lon}
                />

                {studios && studios.map((studio, index) => {
                    return (
                        <StudioPin
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