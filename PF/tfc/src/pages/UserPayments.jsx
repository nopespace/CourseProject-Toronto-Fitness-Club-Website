import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import '../index.css'
import Navigation from "../components/Navigation";
import UserPaymentsHistoryTable from "../components/UserPaymentHistoryTable";
import UserPaymentFuture from "../components/UserPaymentFuture";

const UserPayments = (props) => {

    return (
        <Box width='100%'>
            <Navigation />
            <Box className='payment-history-center-box'>
                <Typography variant='h5' fontWeight='bold'>1. My Payment History</Typography>
                <UserPaymentsHistoryTable></UserPaymentsHistoryTable>
                <UserPaymentFuture></UserPaymentFuture>
            </Box>
        </Box>
    )
}

export default UserPayments;