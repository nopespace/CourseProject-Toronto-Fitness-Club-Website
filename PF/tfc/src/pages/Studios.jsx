import * as React from "react";
import Navigation from "../components/Navigation";
// import StudioDisplay from "../components/StudioDisplay";
import StudiosMap from "../components/studios-map/StudiosMap";
import axios from "axios";
import Box from '@mui/material/Box';
// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const Studios = (props) => {
  const [pos, setPos] = useState({lat: 43.66, lon: -79.38})
  // const [lat, setLat] = useState(43.66);
  // const [lon, setLon] = useState(-79.38);
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPos({lat: position.coords.latitude, lon: position.coords.longitude})
          // setLat(position.coords.latitude);
          // setLon(position.coords.longitude);
          listStudios(position.coords.latitude, position.coords.longitude)
        }
      )
    } else {
      listStudios(pos.lat, pos.lon);
    }
  }, [])

  const listStudios = async (lat, lon) => {
    let url = `http://127.0.0.1:8000/studios/list/`
    const {data} = await axios.get(url, { params: { lat: pos.lat, lon: pos.lon } });
    setStudios(data);
  }

  const mapDefaultProps = {
    center: {
      lat: pos.lat,
      lng: pos.lon
    },
    zoom: 11
  };
  
  if (studios.length === 0) {
    listStudios(pos.lat, pos.lon)
  }
    
  return (
    <Box>
      <Navigation />
      {studios.length !== 0 && <StudiosMap
        mapDefaultProps={mapDefaultProps}
        studios={studios}
        pos={pos}
        />
      }
    </Box>
  )


}

export default Studios;