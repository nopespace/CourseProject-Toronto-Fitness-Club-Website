import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";

const StudiosSearch = (props) => {
    const options = [
        'studio name', 
        'amenity', 
        'class name', 
        'coach name'
    ]

    const handleSearch = async (e) => {
        e.preventDefault()
        

    }
    return (
        <Box width='90%'>
            <SearchBar
                options={options}
                placeholder='Search Studios! Enter your keyword:'
                handleSearch={handleSearch}
            />
        </Box>
    )
}

export default StudiosSearch;