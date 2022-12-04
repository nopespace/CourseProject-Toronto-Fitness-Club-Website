import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterBox = (props) => {
  const { isLogin } = props;
  const navigate = useNavigate();

  const login = (event) => {
    const data = new FormData(event.target);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/accounts/login/",
      data: data,
    })
    .then((res) => {
      localStorage.setItem("userToken", JSON.stringify(res.data.token));
      console.log(res.data);
      const token = JSON.parse(localStorage.getItem("userToken"));
      console.log(token)
      alert("Login success");
      navigate('/')
    })
    .catch((err) => {
      alert("Login Failed, Please try again later.");
    });
  };

  const register = async (event) => {
    const data = new FormData(event.target);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/accounts/register/",
      data: data,
    })
    .then((res) => {
      alert("Registration success");
      navigate('/login/')
    })
    .catch((err) => {
      alert("Registration Failed, Please try again later.");
    });
   
  };

  return (
    <>
      <div className="grid place-items-center my-20">
        <div className="my-20 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <div className="font-bold mb-2">{isLogin ? "Login": "Register"}</div>
          <form class="space-y-6" onSubmit={event => {
              (isLogin ? login : register)(event);
              event.preventDefault();
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
            {!isLogin && (
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
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterBox;
