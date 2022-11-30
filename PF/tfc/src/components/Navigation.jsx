import * as React from 'react';
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav class="bg-orange-400 border-gray-200 px-2 py-2.5 rounded">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" class="flex items-center">
          <img src="/logo.png" class="h-14 mr-2" alt="TFC Logo" />
        </Link>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <Link
                to="/" 
                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 md:p-0"
                aria-current="page"
              >Home</Link>
            </li>
            <li>
              <Link
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 md:p-0"
              >Home</Link>
            </li>
            <li>
              <Link
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 md:p-0"
              >Home</Link>
            </li>
            <li>
              <Link
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 md:p-0"
              >Home</Link>
            </li>
            <li>
              <Link
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 md:p-0"
              >Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;