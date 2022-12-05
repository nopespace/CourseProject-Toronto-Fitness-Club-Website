import * as React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Box, Stack, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";

const ClassEnroll = (props) => {
    const class_ = props.class;
    const msgLink = props.msgLink;
    const setMsgLink = props.setMsgLink;
    const singleClass = `Single Class: Enroll in ${class_.class_name} only on ${class_.date}?`
    const allClass = `All Classes: Enroll in all ${class_.class_name} classes starting from ${class_.date}?`
    const [enrollChoice, sEnrollChoice] = useState('single-class')

    const handleChooseEnroll = (e) => {
        sEnrollChoice(e.target.value)
    }

    const enroll = async () => {
        setMsgLink({
            msg: undefined,
            link: undefined,

        })
        let url = `http://127.0.0.1:8000/classes/enroll/`
        const token = JSON.parse(localStorage.getItem("userToken"))
        if (token === null) {
            setMsgLink({ msg: `Please login first.`, link: '/login/' })
        }
        else {
            const all = enrollChoice === 'all-class' ? true : false
            axios({
                method: 'post',
                url: url,
                data: {
                    class_id: class_.base_klass,
                    date: class_.date,
                    all: all
                },
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    // TODO: link placeholder
                    console.log(res)
                    setMsgLink({ msg: res.data.msg, link: '/' })
                })
                .catch(err => {
                    console.log(err)
                    setMsgLink({ msg: err.response.data.msg, link: '/subscriptions/' })
                })
        }
        // const { data } = await axios.get(url, { params: { page: query.page } });
    }



    return (
        <Box mt={3}>
            <Typography variant='h5' color='green'>Enroll</Typography>
            <Typography><b>Current number of students</b>: {class_.num_students}/{class_.capacity}</Typography>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={enrollChoice}
                    onChange={handleChooseEnroll}
                >
                    <FormControlLabel value="single-class" control={<Radio />} label={singleClass} />
                    <FormControlLabel value="all-class" control={<Radio />} label={allClass} />
                </RadioGroup>
            </FormControl>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={enroll}
            >
                Enroll
            </button>

            {msgLink.msg && !msgLink.link && <Typography>{msgLink.msg}</Typography>}

            {/* error, show link */}
            {msgLink.link && 
            <Typography style={{color: 'red'}}>
                {msgLink.msg }
                <Link to={msgLink.link} style={{textDecoration: 'underline'}}>[Link]</Link>
                </Typography>
                
            }
            {/* {msgLink.msg && <Typography varint='h6' color='red'>
                {msgLink.msg}
                {msgLink.link && <Link to={msgLink.link} >  {msgLink.linkLabel}</Link>}
            </Typography>} */}


        </Box>
    )
}

export default ClassEnroll;