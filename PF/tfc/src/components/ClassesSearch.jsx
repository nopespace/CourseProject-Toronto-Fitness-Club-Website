import { Box, Stack, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import SearchDropDownMenu from './SearchDropDownMenu';
import axios from "axios";

const ClassesSearch = (props) => {
    const {
        studio_id,
        setClasses,
        setRowCount,
        page,
        pageSize,
        setPage,
        setQuery,
        optionChose,
        setOptionChose
    } = props
    const options = [
        'class name',
        'coach name',
        'date',
        'time range'
    ]

    // if user decides to search
    const [searchRequired, setSearchRequired] = useState(false);
    // which option user chose to filter by
    // const [optionChose, setOptionChose] = useState(undefined);
    // const [query, setQuery] = useState({keyword: '', page: page})
    // const [keyword, setKeyword] = useState('')

    // const searchClasses = async () => {
    //     let url = `http://127.0.0.1:8000/classes/search/`
    //     const { data } = await axios.get(url, { params: { studio_id: studio_id, keyword: query.keyword, criterion: optionChose, page: query.page }})
    //     setClasses(data.results);
    //     console.log(data.results)
    //     setRowCount(data.count);
    //   }
    // const searchClasses = async (keyword) => {
    //     let url = `http://127.0.0.1:8000/classes/search/`
    //     const { data } = await axios.get(url, { params: { studio_id: studio_id, keyword: keyword, criterion: optionChose, page: page }})
    //     setClasses(data.results);
    //     console.log(data.results)
    //     setRowCount(data.count);
    //   }

    const handleSearch = async (e) => {
        e.preventDefault()
        var keyword = e.target.keyword.value
        setQuery({page: 1, keyword: keyword})

        // searchClasses(keyword)
        // setKeyword(keyword)
        
    }

    const handleSearchFieldChange = async(e) => {
        var keyword = e.target.value;
        // setKeyword(keyword)
        // setPage(1)
        if (keyword === '') {
            setQuery({page: 1, keyword: keyword})

        }
        else if (optionChose !== 'date' && optionChose !== 'time range') {

            setQuery({page: 1, keyword: keyword})
        }
        // searchClasses(keyword)
    }
    // useEffect(() => {
    //     if (optionChose) {

    //         searchClasses()
    //     }

    // }, [query])

    return (
        <Box width='90%' m={2}>
            <SearchDropDownMenu
                options={options}
                setSearchRequired={setSearchRequired}
                optionChose={optionChose}
                setOptionChose={setOptionChose}
            />
            {optionChose === 'date' && <Typography color='green'>yyyy-mm-dd</Typography>}
            {optionChose === 'time range' && <Typography color='green'>Enter start time - end time in such format: hh:mm - hh:mm</Typography>}
            {searchRequired && <SearchBar
                placeholder='Enter your keyword:'
                handleSearch={handleSearch}
                handleSearchFieldChange={handleSearchFieldChange}
            />}
        </Box>
    )
}

export default ClassesSearch;