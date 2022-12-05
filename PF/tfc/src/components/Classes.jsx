import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

const Classes = (props) => {
    const studio = props.studio
    const [page, setPage] = useState(1);
    const [classes, setClasses] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const pageSize = 30;
    const columns = [
        { field: 'class_name', headerName: 'Class', sortable: true, flex: 1 },
        { field: 'coach_name', headerName: 'Coach', sortable: true, flex: 1 },
        { field: 'description', headerName: 'Description', sortable: true, flex: 1.5 },
        { field: 'keywords', headerName: 'Keywords', sortable: true, flex: 1.5 },
        { field: 'date', headerName: 'date', sortable: true, flex: 1 },
        { field: 'start_time', headerName: 'Start Time', sortable: true, flex: 1 },
        { field: 'end_time', headerName: 'End Time', sortable: true, flex: 1 },
    ];

    const listClasses = async () => {
        let url = `http://127.0.0.1:8000/classes/schedule/${studio.id}/`
        const { data } = await axios.get(url, { params: { page: page } });
        setClasses(data.results);
        setRowCount(data.count)

        // const handleRowClick = (e) => {
        //     navigate(`/studio/${e.id}/`)
        // }
    }

    React.useEffect(() => {
        listClasses();
    }, [])

    return (
        <Box style={{ height: '100vh', width: '90%' }}>
            <DataGrid
                rows={classes}
                columns={columns}
                pageSize={pageSize}
                paginationMode='server'
                rowCount={rowCount}
                onPageChange={(page) => setPage(page + 1)}
                disableExtendRowFullWidth={false}
                sx={{
                    // https://mui.com/x/react-data-grid/style/#styling-rows
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'lightGray',
                    '& .MuiDataGrid-row:hover': {
                        color: 'primary.main',
                        cursor: 'pointer'
                    },
                }}
            // checkboxSelection
            />
        </Box>
    )
}

export default Classes;