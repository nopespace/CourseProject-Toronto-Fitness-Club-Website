import * as React from 'react';
import RegisterBox from '../components/accounts/RegisterBox';
import Navigation from '../components/Navigation';
import CardBox from '../components/accounts/CardBox';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingCircle from '../components/LoadingCircle';
import AccountInfo from '../components/accounts/AccountInfo';
import CardInfo from '../components/accounts/CardInfo';
import EditBox from '../components/accounts/EditBox';

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
        My account
      </div>
      {user ?
      <div className="grid grid-cols-2">
        {updateAccount ? <EditBox /> : <AccountInfo user={user} setUpdateAccount={setUpdateAccount} />}
        {/* <CardBox update={updateCard}/> */}
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