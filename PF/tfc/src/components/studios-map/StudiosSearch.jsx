import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";
// import SearchDropDownMenu from '../SearchDropDownMenu';

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
            {/* <SearchDropDownMenu></SearchDropDownMenu> */}
            <SearchBar
                options={options}
                placeholder='Choose filter criterion, then enter keyword'
                handleSearch={handleSearch}
            />
        </Box>
    )
}

export default StudiosSearch;