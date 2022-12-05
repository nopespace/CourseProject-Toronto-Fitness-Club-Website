import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { ContentCutOutlined } from "@mui/icons-material";

const SubscriptionBox = (props) => {
  const { id, price, billingCycle, disabled } = props;
  let navigate = useNavigate();

  const [userdata, setUserdata] = useState([]); // this data is for user plan if exists

  const getUserInfo = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const { data } = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserdata(data);
    } catch (e) {
      console.log(e);
      setUserdata([]);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);


  const subscriptionshandler = async (plan_id, cancelled) => {
    // check auth
    // localStorage.clear();
    const token = JSON.parse(localStorage.getItem("userToken"));
    if (token === null) {
      console.log("not logged in");
      navigate("/login");
    } else {
      let cardinfo;
      // save user card info
      await axios({
        method: "get",
        url: "http://127.0.0.1:8000/subscriptions/card/update/",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          cardinfo = res.data;
          localStorage.setItem("cardInfo", JSON.stringify(res.data));
          if (cardinfo != null) {
            console.log("cardinfo is not empty");
          }
          console.log(cardinfo);
        })
        .catch((err) => {
          console.log(err);
        });
      // check card
      cardinfo = JSON.parse(localStorage.getItem("cardInfo"));
      console.log("debug msg");
      console.log(JSON.parse(localStorage.getItem("cardInfo"))); // this is null
      console.log(cancelled);
      if (cardinfo === null && cancelled === "false") {
        console.log("no card info");
        navigate("/edit");
      } else if (cardinfo !== null && cancelled === "false") {
        // case1: no plan rn
        console.log("has card info");
        console.log("case1: no plan rn");
        if (userdata === null) {
          try{
            const res = await axios.post(
              "http://127.0.0.1:8000/subscriptions/add/",
              { plan_id: plan_id },
              { headers: { Authorization: "Bearer " + token } }
            );
            localStorage.setItem("userdata", JSON.stringify(res.data));
            alert("Subscription Success");
          }
          catch (e) {
            alert("Subscription Failed, Please try again later. Branch 1");
          }
        }
        // case2: has plan rn
        else {
          try{
            const res = await axios.put(
              "http://127.0.0.1:8000/subscriptions/card/update/",
              { plan_id: plan_id, cancelled: cancelled },
              { headers: { Authorization: "Bearer " + token } }
            );
            alert("Change Subscription Success");
          }
          catch (e) {
            alert("Subscription Failed, Please try again later. Branch 2");
          }
          
        }
      } else {
        // here is the code for cancelling the subscription
        if (userdata !== null) {
          const res = await axios.put(
            "hhttp://127.0.0.1:8000/subscriptions/card/update/",
            { plan_id: plan_id, cancelled: cancelled },
            { headers: { Authorization: "Bearer " + token } }
          );
        }

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
      }
    }
  };
  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {billingCycle}
      </h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500"></span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex space-x-3">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 ">
            A lot of classes
          </span>
        </li>
        <li className="flex space-x-3">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">
            So many classes
          </span>
        </li>
        <li className="flex space-x-3">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">
            Infinite number of class
          </span>
        </li>
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">
            Create a class
          </span>
        </li>
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">
            Define a class
          </span>
        </li>
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">
            Go to the Mars
          </span>
        </li>
        <li className="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500">
            Satellite telephone helping
          </span>
        </li>
      </ul>
      {!disabled ? (
        <button
          onClick={(e) => subscriptionshandler(id, "false")}
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          {" "}
          Choose plan
        </button>
      ) : (
        <button
          disabled
          type="button"
          className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Current Plan
        </button>
      )}
    </div>
  );
};

export default SubscriptionBox;
