import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';


const LocSort = (props) => {
    // var NodeGeocoder = require('node-geocoder');
    const handleSearch = async (e) => {
        e.preventDefault()
        var postal = e.target.keyword.value;
        // // https://www.npmjs.com/package/node-geocoder
        // const options = {
        //     provider: 'google',

        //     // Optional depending on the providers
        //     fetch: 'customFetchImplementation',
        //     apiKey: 'AIzaSyDqCaJKiXq4ejDBTZOhV0Dbv-FCZiuKpLM', // for Mapquest, OpenCage, Google Premier
        //     formatter: null // 'gpx', 'string', ...
        // };

        // const geocoder = NodeGeocoder(options);

        // // Using callback
        // const res = await geocoder.geocode(postal);

        // console.log(res)
    }
    return (
        <Box width='80%'>
            <SearchBar
                placeholder='Wanna check out studios near another place? Click on map OR enter a postal code (e.g. M5S 0C5) '
                handleSearch={handleSearch}
            />
        </Box>
    )
}

export default LocSort;