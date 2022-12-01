import * as React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-100 px-2 py-2.5">
      <div className="container flex flex-wrap items-center justify-between w-full">
        <div className="flex ml-8">
          <Link to="/" className="flex items-center mr-10">
            <img src="/logo.png" className="h-10" alt="TFC Logo" />
          </Link>
          <div className="md:block md:w-auto" id="navbar-default">
            <ul className="flex p-4 flex-row space-x-8 mt-0 text-sm font-medium border-0">
              <li>
                <Link
                  to="/studios/"
                  className="block text-gray-700 hover:text-blue-600 p-0"
                  aria-current="page"
                >
                  Studios
                </Link>
              </li>
              <li>
                <Link
                  to="/classes/"
                  className="block text-gray-700 hover:text-blue-600 p-0"
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/subscriptions/"
                  className="block text-gray-700 hover:text-blue-600 p-0"
                >
                  Subscriptions
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex p-4 flex-row space-x-8 mt-0 text-sm font-medium border-0">
            <li>
              <form>
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Criteria"
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </li>
            <li>
              <Link
                to="/register/"
                className="block text-gray-700 hover:text-blue-600 p-0 text-sm"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login/"
                className="block text-gray-700 hover:text-blue-600 p-0 text-sm"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
