import * as React from 'react';
import RegisterBox from '../components/RegisterBox';
import Navigation from '../components/Navigation';
import CardBox from '../components/CardBox';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingCircle from '../components/LoadingCircle';

const Edit = () => {
  const [user, setUser] = useState(null);
  const [updateCard, setUpdateCard] = useState(false);
  const [updateAccount, setUpdateAccount] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const { data } = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/accounts/get/",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (e) {
      setUser(null);
    }
  }
  
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex justify-center font-bold my-10 text-2xl">
        Change account information
      </div>
      {user ?
      <div className="grid grid-cols-2">
        <RegisterBox type="Edit" />
        <CardBox />
      </div>
      :
      <div className="flex justify-center">
        <LoadingCircle />
      </div>
      }
    </>
  );
}

export default Edit;