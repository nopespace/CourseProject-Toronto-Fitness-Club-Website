// import * as React from "react";
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import PaginatedItems from "../components/Pagenation";
import SubscriptionBox from "../components/SubscriptionBox";
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
