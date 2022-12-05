import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import '../index.css'
import StudioImageGallery from "./studios-map/StudioImageGallery";
import { Routes, Route, useParams } from 'react-router-dom';

const StudioDisplay = (props) => {
    let { studio_id } = useParams();
    let pos = JSON.parse(localStorage.getItem('pos'))
    // const {
    //     // studioID,
    //     pos
    // } = props
    const [studio, setStudio] = useState(undefined);

    const retrieveStudio = async () => {
        let url = `http://127.0.0.1:8000/studios/${studio_id}/`
        const { data } = await axios.get(url, { params: { lat: pos.lat, lon: pos.lon } })
        setStudio(data);
    }

    useEffect(() => {
        retrieveStudio()
    })

    return (
        <Box >
            {/* TODO: use grid layout */}
            {/* TODO: 2. jump to here when click studio */}
            {/* style={{ height: '70vh', width: '90%', margin: 30, alignItems: 'center', justifyContent: 'center' }} */}
            {/* {studio && <Box className='studio-center-container-box' style={{ flexDirection: 'column' }}>
                <Typography variant='h4'>{studio.name}</Typography>
                <Typography >
                    <b>📍Address: </b>
                    {studio.address}
                    <a href={studio.link} target="_blank">  [Get Direction]</a>
                </Typography>

                <Typography ><b>📞Phone Number: </b>{studio.phone_number}</Typography>
                
                <StudioImageGallery
                    imgs={studio.images}
                />
                {studio.amenities}
            </Box>
            } */}
            {studio && <Grid className='studio-center-container-box' style={{ flexDirection: 'column' }}>
                <Typography variant='h4'>{studio.name}</Typography>
                <Typography >
                    <b>📍Address: </b>
                    {studio.address}
                    <a href={studio.link} target="_blank">  [Get Direction]</a>
                </Typography>

                <Typography ><b>📞Phone Number: </b>{studio.phone_number}</Typography>
                
                <StudioImageGallery
                    imgs={studio.images}
                />
                {studio.amenities}
            </Grid>
            }
        </Box>
    )
}

export default StudioDisplay;