import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const NavAccount = () => {
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/accounts/get/",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      console.log(user);
    } catch (e) {
      alert("Edit e, Please try again later.");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
    { user ?
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
      :
      <div>
        user
      </div>
    }
    </>
  );
}

export default NavAccount;