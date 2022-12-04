import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import SearchDropDownMenu from '../SearchDropDownMenu';
import axios from "axios";

const StudiosSearch = (props) => {
    const {
        pos,
        setStudios,
    } = props
    const options = [
        'studio name',
        'amenity',
        'class name',
        'coach name'
    ]

    // if user decides to search
    const [searchRequired, setSearchRequired] = useState(false);
    // which option user chose to filter by
    const [optionChose, setOptionChose] = useState(undefined);

    const searchStudios = async (keyword) => {
        let url = `http://127.0.0.1:8000/studios/list/`
        const { data } = keyword !== '' ? await axios.get(url, { params: { lat: pos.lat, lon: pos.lon, keyword: keyword, criterion: optionChose }}) : await axios.get(url, { params: { lat: pos.lat, lon: pos.lon}})
        data.map((studio, index) => {
          studio['order'] = index + 1;
        })
        setStudios(data);
      }

    const handleSearch = async (e) => {
        e.preventDefault()
        var keyword = e.target.keyword.value
        searchStudios(keyword)
        
    }

    const handleSearchFieldChange = async(e) => {
        var keyword = e.target.value;
        searchStudios(keyword)
    }

    return (
        <Box width='90%'>
            <SearchDropDownMenu
                options={options}
                setSearchRequired={setSearchRequired}
                optionChose={optionChose}
                setOptionChose={setOptionChose}
            />
            {searchRequired && <SearchBar
                placeholder='Enter your keyword:'
                handleSearch={handleSearch}
                handleSearchFieldChange={handleSearchFieldChange}
            />}
        </Box>
    )
}

export default StudiosSearch;