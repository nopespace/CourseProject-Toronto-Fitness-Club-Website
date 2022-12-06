import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import SubscriptionBox from "../components/subscriptions/SubscriptionBox";
import axios from "axios";
import LoadingCircle from "../components/LoadingCircle";

const Subscriptions = () => {
  const [details, setDetails] = useState(null); // this data is for plan
  const [userData, setUserData] = useState(null); // this data is for user plan if exists
  let navigate = useNavigate();

  const getUserData = async () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        headers: { Authorization: "Bearer " + token }
      })
      setUserData(res.data);
    } catch (e) { 
      setUserData(null)
    }
  }

  const getPlanData = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/list/",
      })
      setDetails(res.data.results);
    } catch (e) { }
  }

  useEffect(() => {
    getUserData();
    getPlanData();
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex justify-center font-bold my-10 text-2xl">
        Current Plan
      </div>
      <div className="flex justify-center my-10">

      </div>
      <div className="flex justify-center font-bold my-10 text-2xl">
        Please choose a subscription plan
      </div>
      <div className="flex justify-center my-10">
      {
        details ?
        details.map((item) =>
          <SubscriptionBox
            plan={item}
            disabled={userData?.billing_cycle === item.billing_cycle}
            userData={userData}
          />)
        : <LoadingCircle />
      }
      </div>
    </>
  );
};

export default Subscriptions;
