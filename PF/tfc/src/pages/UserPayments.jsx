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
import UserPaymentsTable from "../components/UserPaymentsTable";

const UserPayments = (props) => {

    return (
        <Box width='100%'>
            <Navigation />
            <Box className='payment-history-center-box'>
                <Typography variant='h5'>My Payment History</Typography>

                <UserPaymentsTable></UserPaymentsTable>
            </Box>
        </Box>
    )
}

export default UserPayments;