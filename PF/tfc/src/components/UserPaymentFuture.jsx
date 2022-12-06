import * as React from "react";
import { Box, Stack, Typography, Grid } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';

const UserPaymentFuture = (props) => {
    const [payment, setPayment] = useState([])

    const getFuturePayment = async () => {
        let url = `http://127.0.0.1:8000/subscriptions/paymentFuture/`
        let config = {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
        }

        const { data } = await axios.get(
            url,
            config
        )
        setPayment(data)

    }

    React.useEffect(() => {
        getFuturePayment()
    }, [])


    return (
        <Box sx={{ m: 2 }}>
            <Typography variant='h5' fontWeight='bold'>2. My Next Payment</Typography>
            <Typography><b>Next Billing Date</b>: {payment.next_billing_date}</Typography>
            <Typography><b>Next Billing Amount</b>: ${payment.next_billing_amount}</Typography>
        </Box>
    )
}

export default UserPaymentFuture;