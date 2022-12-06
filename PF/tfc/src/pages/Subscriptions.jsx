// import * as React from "react";
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import PaginatedItems from "../components/Pagenation";
import SubscriptionBox from "../components/subscriptions/SubscriptionBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();


  // const subscriptionshandler = async (plan_id, cancelled) => {
  //   // check auth
  //   // localStorage.clear();
  //   const token = JSON.parse(localStorage.getItem("userToken"));
  //   if (token === null) {
  //     console.log("not logged in");
  //     navigate("/login");
  //   } else {
  //     let cardinfo;
  //     // save user card info
  //     await axios({
  //       method: "get",
  //       url: "http://127.0.0.1:8000/subscriptions/update/",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((res) => {
  //         cardinfo = res.data;
  //         localStorage.setItem("cardInfo", JSON.stringify(res.data));
  //         if (cardinfo != null) {
  //           console.log("cardinfo is not empty");
  //         }
  //         console.log(cardinfo);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // check card
  //     cardinfo = JSON.parse(localStorage.getItem("cardInfo"));
  //     console.log("debug msg");
  //     console.log(JSON.parse(localStorage.getItem("cardInfo"))); // this is null
  //     console.log(cancelled);
  //     if (cardinfo === null && cancelled === "false") {
  //       alert("Please add card info");
  //       navigate("/edit/");
  //     } else if (cardinfo !== null && cancelled === "false") {
  //       // case1: no plan rn
  //       console.log("has card info");
  //       console.log("case1: no plan rn");
  //       if (userdata === null) {
  //         try{
  //           const res = await axios.post(
  //             "http://127.0.0.1:8000/subscriptions/add/",
  //             { plan_id: plan_id },
  //             { headers: { Authorization: "Bearer " + token } }
  //           );
  //           changeUserData(res.data);
  //           alert("Subscription Success");
  //         }
  //         catch (e) {
  //           alert("Subscription Failed, Please try again later. Branch 1");
  //         }
  //       }
  //       // case2: has plan rn
  //       else {
  //         try{
  //           const res = await axios.put(
  //             "http://127.0.0.1:8000/subscriptions/update/",
  //             { plan_id: plan_id, cancelled: cancelled },
  //             { headers: { Authorization: "Bearer " + token } }
  //           );
  //           changeUserData(res.data);
  //           alert("Change Subscription Success");
  //         }
  //         catch (e) {
  //           alert("Subscription Failed, Please try again later. Branch 2");
  //         }
          
  //       }
  //     } else {
  //       // here is the code for cancelling the subscription
  //       if (userdata !== null) {
  //         const res = await axios.put(
  //           "hhttp://127.0.0.1:8000/subscriptions/card/update/",
  //           { plan_id: plan_id, cancelled: cancelled },
  //           { headers: { Authorization: "Bearer " + token } }
  //         );
  //       }

        // change the plan
        // const token = JSON.parse(localStorage.getItem("userToken"));
        // axios({
        //   method: "put",
        //   url: "http://127.0.0.1:8000/subscriptions/update/",
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        //   data: {
        //     // plan_id: plan_id,
        //     // cancelled: cancelled,
        //     plan_id: plan_id,
        //     cancelled: cancelled,
        //   },
        // })
        //   .then((res) => {
        //     console.log(res.data);
        //     alert("Subscription updated");
        //   })
        //   .catch((err) => {
        //     alert("Subscription update failed, please try again later.");
        //     console.log(err);
        //   });
  //     }
  //   }
  // };

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
                plan={item}
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
