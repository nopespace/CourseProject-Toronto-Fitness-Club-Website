import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import '../index.css'
import StudioImageGallery from "./StudioImageGallery";
import { Routes, Route, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const StudioDisplay = (props) => {
    let { studio_id } = useParams();
    let pos = JSON.parse(localStorage.getItem('pos'))
    // const {
    //     // studioID,
    //     pos
    // } = props
    const [studio, setStudio] = useState(undefined);
    const navigate = useNavigate();

    const retrieveStudio = async () => {
        let url = `http://127.0.0.1:8000/studios/${studio_id}/`
        const { data } = await axios.get(url, { params: { lat: pos.lat, lon: pos.lon } })
        setStudio(data);
    }

    const handleClickBack = () => {
        navigate('/studios/')
    }

    useEffect(() => {
        retrieveStudio()
    })

    

    return (
        <Box sx={{ m: 3 }}>
            {/* <Navi /> */}
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={handleClickBack}
            >
                <ArrowBackIcon />
                Back
            </button>
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
            {studio && <Box className='studio-center-container-box' style={{ flexDirection: 'column' }}>
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
            }
        </Box>
    )
}

export default StudioDisplay;