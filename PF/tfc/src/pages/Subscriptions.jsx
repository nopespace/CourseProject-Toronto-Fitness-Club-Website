// import * as React from "react";
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import PaginatedItems from "../components/Pagenation";
import SubscriptionBox from "../components/SubscriptionBox";
import axios from "axios";
import { queryAllByAttribute } from "@testing-library/react";

const LOCAL_STORAGE_KEY = "user";

const Subscriptions = () => {
  const [details, setDetials] = useState([]);
  const [userdata, setUserdata] = useState([]);
  
  useEffect(() => {
    // this use effect is for setting the subscription details
    let data;
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/subscriptions/list/",
    })
      .then((res) => {
        data = res.data;
        setDetials(data);
      })
      .catch((err) => {});
  }, []);

  // useEffect(() => {
  //   // this useeffect is used to set user data
  //   let userdata;
  //   axios({
  //     method: "get",
  //     url: "http://127.0.0.1:8000/subscriptions/update/",
  //   }).then((res) => {
  //     userdata = res.data;
  //     setUserdata(userdata);
  //   });
  //   localStorage.setItem("user", JSON.stringify(userdata.token));
  // },[]);


  // pagenation version
  // return (
  //   <>
  //     <Navigation />
  //     <PaginatedItems type = "subscription" items={details} itemsPerPage={2} />
  //   </>
  // );
  return (
    <>
      <Navigation />
      <div className="flex justify-center">
        {details.map((item) => (
          <SubscriptionBox
            key={item.id}
            billingCycle={item.billing_cycle}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
};

export default Subscriptions;
