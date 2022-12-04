import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useRef } from "react";

const RegisterBox = (props) => {
  const { login } = props;

  // datas for user login/register
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const phone_numberRef = useRef();
  const avatarRef = useRef();

  const login_function = () => {
    const name = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (name === "" || password === "") {
      alert("Please enter username and password");
      return;
    }
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/accounts/login/",
      data: {
        username: name,
        password: password,
      },
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
  };

  const register_function = () => {
    const name = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (name === "" || password === "") {
      alert("Please enter username and password");
      return;
    }
    // need to figure out the mandatory fields
    // TODO
    // reason for todo: the backend is not working properly
    // CSRF
    // axios({
    //   method: "post",
    //   url: "http://127.0.0.1:8000/accounts/register/",
    //   data: {
    //     username: name,
    //     email: email,
    //     first_name: first_name,
    //     last_name: last_name,
    //     password: password,
    //     phone_number: phone_number,
    //     avatar: avatar,
    //   },
    // })
    //   .then((res) => {
    //     localStorage.setItem("userToken", JSON.stringify(res.data.token));
    //     console.log(res.data);
    //     const token = JSON.parse(localStorage.getItem("userToken"));
    //     // console.log(token);
    //     alert("Login success");
    //   })
    //   .catch((err) => {
    //     alert("Register Failed, Please try again later.");
    //   });
  };

  return (
    <>
      <div className="grid place-items-center my-20">
        <div className="my-20 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <form class="space-y-6" action="#">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                ref={usernameRef}
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
                    ref={emailRef}
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
                    for="firstname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    ref={first_nameRef}
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="First Name"
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
                    ref={last_nameRef}
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label
                    for="phonenumber"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    ref={phone_numberRef}
                    type="text"
                    name="phonenumber"
                    id="phonenumber"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-456-7890"
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
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              onClick={login ? login_function : register_function}
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
