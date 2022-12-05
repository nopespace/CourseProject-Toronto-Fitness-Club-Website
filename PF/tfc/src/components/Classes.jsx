import * as React from "react";
import {
    DataGrid,
    GridToolbar,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import SearchDropDownMenu from "./SearchDropDownMenu";
import ClassesSearch from "./ClassesSearch";


const Classes = (props) => {
    const studio = props.studio
    const [query, setQuery] = useState({ keyword: '', page: 1 })
    // const [page, setPage] = useState(1);
    const [classes, setClasses] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const pageSize = 30;
    const [showClassInfo, sShowClassInfo] = useState(false);
    const [class_, setClass] = useState(undefined);
    const [searchRequired, setSearchRequired] = useState(false);
    const [optionChose, setOptionChose] = useState(undefined);
    const options = [
        'class_name',
        'coach_name',
        'date',
        'time_range'
    ]
    const myRef = useRef(null)

    const columns = [
        { field: 'class_name', headerName: 'Class', sortable: true, flex: 1 },
        { field: 'coach_name', headerName: 'Coach', sortable: true, flex: 1 },
        // { field: 'description', headerName: 'Description', sortable: true, flex: 1.5 },
        // { field: 'keywords', headerName: 'Keywords', sortable: true, flex: 1.5 },
        { field: 'date', headerName: 'date', sortable: true, flex: 1 },
        { field: 'start_time', headerName: 'Start Time', sortable: true, flex: 1 },
        { field: 'end_time', headerName: 'End Time', sortable: true, flex: 1 },
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            width: 100,
        },
    ];

    useEffect(() => {
        listClasses()
    }, [query])

    const listClasses = async () => {
        let url1 = `http://127.0.0.1:8000/classes/schedule/${studio.id}/`
        let url2 = `http://127.0.0.1:8000/classes/search/`
        let res;
        if (query.keyword === '') {
            res = await axios.get(url1, { params: { page: query.page } }) 
        }
        else if (optionChose === 'time range') {
            let start_var = query.keyword.split('-')[0].trim()
            let end_var = query.keyword.split('-')[1].trim()
            res = await axios.get(url2, { params: { studio_id: studio.id, start_var: start_var, end_var: end_var, criterion: optionChose, page: query.page } })
        } else {
            res = await axios.get(url2, { params: { studio_id: studio.id, keyword: query.keyword, criterion: optionChose, page: query.page } })
        }
        // const { data } = await axios.get(url, { params: { page: query.page } });
        setClasses(res.data.results);
        setRowCount(res.data.count)
    }

    const handleRowClick = (e) => {
        sShowClassInfo(true);
        setClass(e.row);
        myRef.current.scrollIntoView()
    }


    const showClassInfoFunc = () => {
        return (
            <Box id='class'
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderRadius: '6%',
                    borderColor: 'lightGray',
                    p: 3,
                    m: 2
                }}
                ref={myRef}
            >
                <Typography variant='h5' fontWeight='bold' color='green'>{class_.class_name}</Typography>
                <Typography><b>Description</b>: {class_.description}</Typography>
                <Typography><b>Keywords</b>: {class_.keywords}</Typography>
                <Typography><b>Coach</b>: {class_.coach_name}</Typography>
                <Typography><b>Start Date</b>: {class_.start_date}</Typography>
                <Typography><b>End Date</b>: {class_.end_date}</Typography>
                <Typography><b>Capacity</b>: {class_.capacity} students</Typography>
                <Typography><b>Current number of Students</b>: {class_.num_students} students</Typography>

            </Box>
        )
    }

    return (
        <Box
            style={{ width: '90%' }}
            sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'rgba(247, 251, 244, 0.064)',
                borderRadius: '5%',
                p: 2,
                m: 3,
            }}>
            {/* <SearchDropDownMenu
                options={options}
                setSearchRequired={setSearchRequired}
                optionChose={optionChose}
                setOptionChose={setOptionChose}
            /> */}
            <ClassesSearch
                studio_id={studio.id}
                setClasses={setClasses}
                setRowCount={setRowCount}
                // page={page}
                pageSize={pageSize}
                // setPage={setPage}
                query={query}
                setQuery={setQuery}
                setOptionChose={setOptionChose}
                optionChose={optionChose}
            />
            <DataGrid
                rows={classes}
                columns={columns}
                page={query.page - 1}
                pageSize={pageSize}
                pagination
                paginationMode='server'
                rowCount={rowCount}
                onPageChange={(page) => setQuery({ ...query, page: page + 1 })}
                disableExtendRowFullWidth={false}
                onRowClick={(e) => handleRowClick(e)}
                initialState={{
                    pagination: {
                        page: 1,
                    },
                }}
                sx={{
                    // https://mui.com/x/react-data-grid/style/#styling-rows
                    height: '100vh',
                    boxShadow: 2,
                    border: 2,
                    borderRadius: '5%',
                    borderColor: 'lightGray',
                    '& .MuiDataGrid-row:hover': {
                        color: 'primary.main',
                        cursor: 'pointer',
                        textDecoration: 'underline',

                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold'
                    },
                }}
            />
            {console.log(query.page)}
            {showClassInfo && showClassInfoFunc()}
        </Box>
    )
}

export default Classes;