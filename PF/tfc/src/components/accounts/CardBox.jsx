import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const CardBox = (props) => {
  const { isAdd } = props;
  const navigate = useNavigate();

  const getErrorMessage = (e) => {
    console.log(Object.values(e))
    let fullMessage = "Please fix the following errors: ";
    e.values().forEach(message => {
      fullMessage += `- ${message}\n`;
    })
    return fullMessage;
  };

  const login = async (form) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/accounts/login/",
        data: form,
      });
      localStorage.setItem("userToken", JSON.stringify(res.data.token));
      navigate('/');
    } catch (e) {
      alert(getErrorMessage(e));
    }
  };

  const add = () => {

  }

  const update = async (form) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/accounts/register/",
        data: form,
      });
      alert("Registration success");
      navigate('/login/');
    } catch (e) {
      alert(getErrorMessage(e));
    }
  };

  const edit = async (form) => {  

    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios({
        method: "patch",
        url: "http://127.0.0.1:8000/accounts/edit/",
        data: form,
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Edit success");
    } catch (e) {
      alert("Edit Failed, Please try again later.");
    }
  };

  return (
    <>
      <div className="grid place-items-center mx-2 self-start border-l">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <div className="font-bold mb-2">Card Information</div>
          <form className="space-y-6" onSubmit={event => {
              (isAdd ? add : update)(new FormData(event.target));
              event.preventDefault();
            }}>
            <div>
              <label
                htmlFor="card_num"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Card Number
              </label>
              <input
                type="text"
                name="card_num"
                id="card_num"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Card Number"
              />
            </div>
            <div>
              <label
                htmlFor="cardholder"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Card Holder
              </label>
              <input
                type="text"
                name="cardholder"
                id="cardholder"
                placeholder="Card Holder"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="expiry_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Expiry Date
              </label>
              <input
                type="text"
                name="exipry_date"
                id="expiry_date"
                placeholder="Card Holder"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="123"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update Card
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardBox;
