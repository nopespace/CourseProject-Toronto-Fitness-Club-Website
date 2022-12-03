import * as React from "react";
import Navigation from "../components/Navigation";
import StudiosList from "../components/studios-map/StudiosList";
import StudiosMap from "../components/studios-map/StudiosMap";
import axios from "axios";
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';

// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LocSort from "../components/studios-map/LocSort";

const Studios = (props) => {
  const [pos, setPos] = useState({ lat: 43.653225, lon: -79.383186 })
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPos({ lat: position.coords.latitude, lon: position.coords.longitude })
        }
      )
    }
  }, [])

  useEffect(() => {
    listStudios(pos.lat, pos.lon);
  }, [pos])

  const listStudios = async (lat, lon) => {
    let url = `http://127.0.0.1:8000/studios/list/`
    const { data } = await axios.get(url, { params: { lat: lat, lon: lon } });
    data.map((studio, index) => {
      studio['order'] = index + 1;
    })
    setStudios(data);
  }



  if (studios.length === 0) {
    listStudios(pos.lat, pos.lon)
  }

  return (
    <Box >
      <Navigation />
      
      <Stack style={{ display: 'flex', justifyContent: 'center', alignItems: "center", padding: 20}} spacing={2}>
        <Typography variant='h4'>Check our studios</Typography>
        <LocSort></LocSort>
      </Stack>

      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
        {studios.length !== 0 && <StudiosList
          studios={studios}
        />
        }

        {studios.length !== 0 && <StudiosMap
          studios={studios}
          pos={pos}
          setPos={setPos}
        />
        }
      </Box>
    </Box>
  )


}

export default Studios;