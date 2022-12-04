import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import SearchDropDownMenu from '../SearchDropDownMenu';

const StudiosSearch = (props) => {
    const options = [
        'studio name',
        'amenity',
        'class name',
        'coach name'
    ]

    const [searchRequired, setSearchRequired] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault()
        // TODO:

    }

    return (
        <Box width='90%'>
            <SearchDropDownMenu
                options={options}
                setSearchRequired={setSearchRequired}
            />
            {searchRequired && <SearchBar
                placeholder='Enter your keyword:'
                handleSearch={handleSearch}
            />}
        </Box>
    )
}

export default StudiosSearch;