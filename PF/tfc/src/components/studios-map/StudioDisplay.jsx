import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../index.css'

const StudioDisplay = (props) => {
    const {
        studioID,
        pos
    } = props
    const [studio, setStudio] = useState(undefined);

    const retrieveStudio = async () => {
        let url = `http://127.0.0.1:8000/studios/${studioID}/`
        const { data } = await axios.get(url, { params: { lat: pos.lat, lon: pos.lon } })
        setStudio(data);
    }

    useEffect(() => {
        retrieveStudio()
    })

    return (
        <Box style={{ height: '70vh', width: '90%', margin: 30, justifyContent: 'center' }}>
            {studio && <Box>
                <Typography variant='h4'>{studio.name}</Typography>
                <Typography >
                    <b>📍Address: </b>
                    {studio.address}
                    <a href={studio.link} target="_blank">  [Get Direction]</a>
                </Typography>

                <Typography ><b>📞Phone Number: </b>{studio.phone_number}</Typography>
                {studio.images.map((image, index) => (
                    <img src={image.image} key={index} />
                ))}
                {studio.amenities}
            </Box>
            }
        </Box>
    )
}

export default StudioDisplay;