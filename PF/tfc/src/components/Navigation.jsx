import * as React from 'react';
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
                >Studios</Link>
              </li>
              <li>
                <Link
                  to="/classes/"
                  className="block text-gray-700 hover:text-blue-600 p-0"
                >Classes</Link>
              </li>
              <li>
                <Link
                  to="/subscriptions/"
                  className="block text-gray-700 hover:text-blue-600 p-0"
                >Subscriptions</Link>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex p-4 flex-row space-x-8 mt-0 text-sm font-medium border-0">
              <li>
                <Link
                  to="/register/"
                  className="block text-gray-700 hover:text-blue-600 p-0 text-sm"
                >Register</Link>
              </li>
              <li>
                <Link
                  to="/login/"
                  className="block text-gray-700 hover:text-blue-600 p-0 text-sm"
                >Login</Link>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;