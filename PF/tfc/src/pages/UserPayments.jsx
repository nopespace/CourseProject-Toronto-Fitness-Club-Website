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

const UserPayments = (props) => {

    return (
        <Box>
            <Navigation />
        
        </Box>
    )
}

export default UserPayments;