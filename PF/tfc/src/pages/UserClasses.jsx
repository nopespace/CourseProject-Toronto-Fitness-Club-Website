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
import ClassTable from "../components/ClassTable";
import ClassDrop from "../components/ClassDrop";

const UserClasses = (props) => {
    const [future, setFuture] = useState({
        classes: [],
        page: 1,
        rowCount: 0,
        pageSize: 30,
        dropped: 0
    })
    const [past, setPast] = useState({
        classes: [],
        page: 1,
        rowCount: 0,
        pageSize: 30
    })

    const [droppedClass, sDroppedClass] = useState(undefined)

    const listFutureClass = async () => {
        let url = `http://127.0.0.1:8000/classes/user/future/schedule/`
        let config = {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
            params: {
                page: future.page
            },
        }
        const { data } = await axios.get(
            url,
            config
        )
        data.results.map((class_, index) => class_.id = index)
        setFuture({ ...future, classes: data.results, rowCount: data.count });
    }

    const listPastClass = async () => {
        let url = `http://127.0.0.1:8000/classes/user/past/schedule/`
        let config = {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
            params: {
                page: past.page
            },
        }
        const { data } = await axios.get(
            url,
            config,
        )
        setPast({ ...past, classes: data.results, rowCount: data.count });
    }

    useEffect(() => {
        listFutureClass()
    }, [future.page, future.dropped])

    useEffect(() => {
        listPastClass()
    }, [past.page])

    return (
        <Box>
            <Navigation />
            <Grid className='myClass-grid' sx={{ mt: 2, m: 5 }}>
                <Box className='class-schedule-center-container-box' >
                    <Typography variant='h5'>My Future Classes</Typography>
                    <Typography color='green'>*Click on a class if you want to drop it.</Typography>
                    <ClassTable id='my-future-schedule'
                        info={future}
                        setter={setFuture}
                        sDroppedClass={sDroppedClass}
                    />
                </Box>

                <Box className='class-schedule-center-container-box' >
                    <Typography variant='h5'>My Past Classes</Typography>
                    <ClassTable
                        info={past}
                        setter={setPast}
                        sDroppedClass={() => { }}
                    />
                </Box>
            </Grid>
            {droppedClass && <ClassDrop
                class={droppedClass}
                future={future}
                setFuture={setFuture}
                sDroppedClass={sDroppedClass}
            />}
        </Box>
    )
}

export default UserClasses;