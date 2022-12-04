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
        {details &&
          details.map((item) => {
            if (userdata.billing_cycle === item.billing_cycle) {
              return (
                <SubscriptionBox
                  key={item.id}
                  billingCycle={item.billing_cycle}
                  price={item.price}
                  disabled={true}
                />
              );
            } else {
              return (
                <SubscriptionBox
                  key={item.id}
                  billingCycle={item.billing_cycle}
                  price={item.price}
                  disabled={false}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default Subscriptions;
