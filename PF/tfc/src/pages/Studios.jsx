import * as React from "react";
import Navigation from "../components/Navigation";
// import StudioDisplay from "../components/StudioDisplay";
import StudiosMap from "../components/StudiosMap";
import axios from "axios";
import Box from '@mui/material/Box';
// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

const Studios = (props) => {
  const [lat, setLat] = useState(43.66);
  const [lon, setLon] = useState(-79.38);
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          listStudios(position.coords.latitude, position.coords.longitude)
        }
      )
    } else {
      listStudios(lat, lon);
    }
  }, [])

  const listStudios = async (lat, lon) => {
    let url = `http://127.0.0.1:8000/studios/list/`
    const {data} = await axios.get(url, { params: { lat: lat, lon: lon } });
    setStudios(data);
  }

  const mapDefaultProps = {
    center: {
      lat: lat,
      lng: lon
    },
    zoom: 11
  };
  
  if (studios.length === 0) {
    listStudios(lat, lon)
  }
    
  return (
    <Box>
      {studios.length !== 0 && <StudiosMap
        mapDefaultProps={mapDefaultProps}
        studios={studios}
        />
      }
    </Box>
  )


}

export default Studios;