import * as React from "react";

const CardInfo = ({ user, setUpdateCard }) => {
  return (
    <>
      <div className="grid place-items-center mx-2 self-start">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
          <div className="flex justify-center">
            <img 
              className="h-40 rounded-full"
              src={user.avatar ? `http://127.0.0.1:8000/${user.avatar}` : '/user.svg'}
            />
          </div>
          <div className="font-bold mb-2 text-xl">{`${user.first_name} ${user.last_name}`}</div>
          <span className="block text-sm mt-2">{user.username}</span>
          <span className="block text-sm font-medium text-gray-900 truncate mt-2">{user.email}</span>
          <span className="block text-sm mt-2">{user.phone_number}</span>
          <button
              onClick={()=>{setUpdateCard(true)}}
              className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Edit Account</button>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
