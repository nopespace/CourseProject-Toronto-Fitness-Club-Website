// import * as React from "react";
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import PaginatedItems from "../components/Pagenation";
import SubscriptionBox from "../components/SubscriptionBox";
import axios from "axios";
import { queryAllByAttribute } from "@testing-library/react";
import LoadingCircle from "../components/LoadingCircle";

const Subscriptions = () => {
  const [details, setDetials] = useState(null); // this data is for plan
  const [userdata, setUserdata] = useState([]); // this data is for user plan if exists

  const changeUserData = (newUserData) => {
    console.log(newUserData);
    setUserdata(newUserData);
  }

  const getUserData = async () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      setUserdata(res.data);
    } catch (e) {
      
    }
  }

  useEffect(() => {
    getUserData();

    // this use effect is for setting the subscription details
    let data;
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/subscriptions/list/",
    })
      .then((res) => {
        data = res.data.results;
        setDetials(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex justify-center font-bold my-10 text-2xl">
        Please choose a subscription plan
      </div>
      <div className="flex justify-center my-10">
        {details ?
          (details.map((item) => {
              return <SubscriptionBox
                key={item.id}
                id={item.id}
                billingCycle={item.billing_cycle}
                price={item.price}
                disabled={!(userdata === [] || (userdata.billing_cycle !== item.billing_cycle))}
                userdata={userdata}
                changeUserData={changeUserData} 
              />
            }))
            : <LoadingCircle />
        }
      </div>
    </>
  );
};

export default Subscriptions;
