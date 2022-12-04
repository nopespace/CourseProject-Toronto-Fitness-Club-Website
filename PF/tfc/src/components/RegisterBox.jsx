import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useRef } from "react";

const RegisterBox = (props) => {
  const { login } = props;

  const formRef = useRef();

  const login_function = () => {

    axios({
      method: "post",
      url: "https://127.0.0.1:8000/accounts/login/",
      data: formRef.data,
    })
      .then((res) => {
        localStorage.setItem("userToken", JSON.stringify(res.data.token));
        console.log(res.data);
        const token = JSON.parse(localStorage.getItem("userToken"));
        // console.log(token);
        alert("Login success");
      })
      .catch((err) => {
        alert("Login Failed, Please try again later.");
      });

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
        });
  };

  const register_function = () => {
    console.log(formRef.data)
    axios.post({
      method: "post",
      url: "http://127.0.0.1:8000/accounts/register/",
      body: formRef.data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        localStorage.setItem("userToken", JSON.stringify(res.data.token));
        console.log(res.data);
        const token = JSON.parse(localStorage.getItem("userToken"));
        // console.log(token);
        alert("Login success");
      })
      .catch((err) => {
        alert("Register Failed, Please try again later.");
      });
    return false;
  };

  return (
    <>
      <div className="grid place-items-center my-20">
        <div className="my-20 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <form ref={formRef} class="space-y-6" onSubmit={e => {
              (login ? login_function : register_function)();
              e.preventDefault();
            }}>
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
                required
              />
            </div>
            {!login && (
              <>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label
                    for="lastname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div>
                  <label
                    for="phone_number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {login ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterBox;
