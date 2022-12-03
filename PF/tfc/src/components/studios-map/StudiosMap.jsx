import * as React from "react";
import StudioPin from "./StudioPin";
import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';
import UserPin from './UserPin'


const StudiosMap = (props) => {
    const studios = props.studios;
    const pos = props.pos;  //{lat:xxx, lon:xxx}
    const mapDefaultProps = {
        center: {
          lat: props.pos.lat,
          lng: props.pos.lon
        },
        zoom: 13
      };

    return (
        <Box style={{ height: '60vh', width: '80%', margin: 20,  }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDqCaJKiXq4ejDBTZOhV0Dbv-FCZiuKpLM' }}
                defaultCenter={mapDefaultProps.center}
                defaultZoom={mapDefaultProps.zoom}
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