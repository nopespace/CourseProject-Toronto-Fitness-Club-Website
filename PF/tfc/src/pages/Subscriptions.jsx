// import * as React from "react";
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import SubscriptionBox from "../components/SubscriptionBox";
import PaginatedItems from "../components/Pagenation";
import axios from "axios";

const Subscriptions = () => {
  const [details, setDetials] = React.useState([]);

  useEffect(() => {
    let data;
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/subscriptions/list/",
    })
      .then((res) => {
        data = res.data;
        setDetials(data);
        console.log(data);
      })
      .catch((err) => {});
  }, []);
  // todo: change, not a function here
  return (
    <>
      <Navigation />
      <PaginatedItems type = "subscription" items={details} itemsPerPage={2} />
    </>
  );
};

export default Subscriptions;
