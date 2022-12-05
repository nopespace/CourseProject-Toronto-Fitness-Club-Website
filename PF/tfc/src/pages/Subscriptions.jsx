// import * as React from "react";
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import PaginatedItems from "../components/Pagenation";
import SubscriptionBox from "../components/SubscriptionBox";
import axios from "axios";
import { queryAllByAttribute } from "@testing-library/react";

const Subscriptions = () => {
  const [details, setDetials] = useState([]); // this data is for plan
  const [userdata, setUserdata] = useState([]); // this data is for user plan if exists

  const changeUserData = (newUserData) => {
    console.log(newUserData);
    setUserdata(newUserData);
  }

  useEffect(() => {
    // this useeffect is used to set user data
    let tmp_userdata;
    if (localStorage.getItem("userToken") === null) {
      tmp_userdata = [];
      setUserdata(tmp_userdata);
    } else {
      const token = JSON.parse(localStorage.getItem("userToken"));
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          tmp_userdata = res.data;
          setUserdata(tmp_userdata);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (userdata.length !== 0) {
      console.log("userdata is not empty");
      console.log(userdata);
    }

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
      <div className="flex justify-center">
        {details &&
          details.map((item) => {
              return <SubscriptionBox
                key={item.id}
                id={item.id}
                billingCycle={item.billing_cycle}
                price={item.price}
                disabled={!(userdata === [] || (userdata.billing_cycle !== item.billing_cycle))}
                userdata={userdata}
                changeUserData={changeUserData} 
              />
            }
          )
        }
      </div>
    </>
  );
};

export default Subscriptions;
