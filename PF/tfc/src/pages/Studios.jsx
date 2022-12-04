import * as React from "react";
import Navigation from "../components/Navigation";
import StudiosTable from "../components/studios-map/StudiosTable";
import StudiosMap from "../components/studios-map/StudiosMap";
import axios from "axios";
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';

// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import StudiosSortByLoc from "../components/studios-map/StudiosSortByLoc";
import StudiosSearch from "../components/studios-map/StudiosSearch";

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




  return (
    <Box >
      <Navigation />

      <Stack style={{ display: 'flex', justifyContent: 'center', alignItems: "center", padding: 20 }} spacing={2}>
        <Typography variant='h4'>🥳Check Out Our Studios🥳</Typography>
        <StudiosSortByLoc setPos={setPos} />

      </Stack>

      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
        <Stack
          style={{ height: '60%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: "center", margin: 15 }}
          sx={{
            // https://mui.com/x/react-data-grid/style/#styling-rows
            boxShadow: 2,
            border: 2,
            borderColor: 'rgba(247, 251, 244, 0.064)'
          }}
        >
          <StudiosSearch
            pos={pos}
            setStudios={setStudios}
          />
          <StudiosTable
            studios={studios}
          />
        </Stack>

        <StudiosMap
          studios={studios}
          pos={pos}
          setPos={setPos}
        />
      </Box>
    </Box>
  )


}

export default Studios;