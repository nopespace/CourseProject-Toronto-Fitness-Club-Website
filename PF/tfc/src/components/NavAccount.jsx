import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavAccount = () => {

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
  });

  return (
    <ul className="flex p-4 flex-row space-x-8 mt-0 text-sm font-medium border-0">
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
  );
}

export default NavAccount;