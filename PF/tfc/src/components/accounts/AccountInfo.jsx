import { alpha } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const AccountInfo = (props) => {
  
  return (
    <>
      <div className="grid place-items-center mx-2">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
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
                Username {type === "Edit" && " (Optional)"}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
              />
            </div>
            {type !== "Login" && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email {type === "Edit" && " (Optional)"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name {type === "Edit" && " (Optional)"}
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name {type === "Edit" && " (Optional)"}
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number {type === "Edit" && " (Optional)"}
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-456-7890"
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
                    ref={avatarRef}
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-456-7890"
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password {type === "Edit" && " (Optional)"}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
