import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import '../index.css'
import { Routes, Route, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import StudioAmenity from "../components/StudioAmenity";
import Classes from "../components/Classes";

const UserClasses = (props) => {
    let { studio_id } = useParams();
    // TODO:
    let pos = JSON.parse(localStorage.getItem('pos'))
    const [studio, setStudio] = useState(undefined);
    const [amenityShow, setAmenityShow] = useState(false);
    const [classShow, setClassShow] = useState(false);
    const navigate = useNavigate();

    const retrieveStudio = async () => {
        let url = `http://127.0.0.1:8000/studios/${studio_id}/`
        const { data } = await axios.get(url, { params: { lat: pos.lat, lon: pos.lon } })
        data.amenities.map((amenity, index) => amenity.id = index)
        setStudio(data);
    }

    const handleClickBack = () => {
        navigate('/studios/')
    }

    const handleClickAmenity = () => {
        setAmenityShow(!amenityShow)
    }

    const handleClickClass = () => {
        setClassShow(!classShow)
    }

    useEffect(() => {
        retrieveStudio()
    }, [])



    return (
        <Box>
            <Navigation />
        </Box>
    )
}

export default UserClasses;