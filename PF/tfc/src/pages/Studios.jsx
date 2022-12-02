import * as React from "react";
import Navigation from "../components/Navigation";
import StudioDisplay from "../components/StudioDisplay";
// import PaginatedItems from "../components/Pagixnation";
import axios from "axios";

// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


class Studios extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/studios/list/?lat=1&lon=11",
      // TODO: Add the lat and lon here
    })
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
        console.log(data);
      })
      .catch((err) => {});
  }

  render() {
    return (
      <>
      hello
      </>
    );
    // return (
    //   <>
    //     <Navigation />
    //     <PaginatedItems
    //      items= {this.details}
    //      itemsPerPage={4} />
    //   </>
    // );
  }

}
export default Studios;
