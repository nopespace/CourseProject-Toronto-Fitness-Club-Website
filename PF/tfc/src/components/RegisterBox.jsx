import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterBox = (props) => {
  const { type } = props;
  const navigate = useNavigate();

  const login = async (form) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/accounts/login/",
        data: form,
      });
      localStorage.setItem("userToken", JSON.stringify(res.data.token));
      alert("Login success");
      navigate('/');
    } catch (e) {
      alert("Login Failed, Please try again later.");
    }

    // save card
    let cardinfo;

    console.log("logged in");
    // save user card info
    const token = JSON.parse(localStorage.getItem("userToken"));
    axios({
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
      })
  };

  const register = async (form) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/accounts/register/",
        data: form,
      });
      alert("Registration success");
      navigate('/login/');
    } catch (e) {
      alert("Registration Failed, Please try again later.");
    }
  };

  const edit = async (form) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios({
        method: "post",
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
      <div className="grid place-items-center my-5">
        <div className="my-20 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <div className="font-bold mb-2">{type}</div>
          <form className="space-y-6" onSubmit={event => {
              ({
                "Login": login,
                "Register": register,
                "Edit": edit
              })[type](new FormData(event.target));
              event.preventDefault();
            }}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
                required
              />
            </div>
            {type !== "Login" && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="avatar"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Avatar (Optional)
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {type}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterBox;
