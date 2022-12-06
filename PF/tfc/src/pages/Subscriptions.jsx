import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import SubscriptionBox from "../components/subscriptions/SubscriptionBox";
import axios from "axios";
import LoadingCircle from "../components/LoadingCircle";
import SubscriptionInfo from "../components/subscriptions/SubscriptionInfo";

const Subscriptions = () => {
  const [details, setDetails] = useState(null); // this data is for plan
  const [userData, setUserData] = useState(null); // this data is for user plan if exists

  const getUserData = async () => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    // No user is logged in
    if (!token) {
      setUserData(null);
      return;
    }

    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        headers: { Authorization: "Bearer " + token }
      })
      setUserData(res.data);
    } catch (e) { 
      // User is logged in, but has no plans
      setUserData({});
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

  const changePlan = async (plan) => {
    if (!userData?.plan_id) {
      await addPlan(plan);
      return;
    }
    
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      console.log(plan)
      await axios({
        method: "put",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        data: { plan_id: plan.id },
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Plan has been updated");
      window.location.replace("/subscriptions/");
    } catch (e) { }
  }

  const addPlan = async (plan) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      console.log(plan)
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/subscriptions/add/",
        data: { plan_id: plan.id },
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Plan has been added");
      window.location.replace("/subscriptions/");
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
        <SubscriptionInfo plan={userData} />
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
            changePlan={changePlan}
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
