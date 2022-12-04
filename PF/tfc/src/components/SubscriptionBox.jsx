import React from 'react'
import  { useNavigate } from 'react-router-dom'

const SubscriptionBox = (props) => {
  const { id, price, billingCycle, disabled } = props;
  let navigate = useNavigate(); 
  const subscriptionshandler = () => {
    // check auth
    // localStorage.clear();
    if (localStorage.getItem("userToken") === null) {
      console.log("not logged in");
      navigate("/login");
    }
    else {
      console.log("logged in");
      // TODO 12.3rd
    }

  };
  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {billingCycle}
      </h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500"></span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex space-x-3">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500 ">
            A lot of classes
          </span>
        </li>
        <li class="flex space-x-3">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            So many classes
          </span>
        </li>
        <li class="flex space-x-3">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Infinite number of class
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Create a class
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Define a class
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Go to the Mars
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            aria-hidden="true"
            class="flex-shrink-0 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check icon</title>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Satellite telephone helping
          </span>
        </li>
      </ul>
      {!disabled ? (
        <button
          onClick={subscriptionshandler}
          type="button"
          class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          {" "}
          Choose plan
        </button>
      ) : (
        <button
          disabled
          type="button"
          class="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Current Plan
        </button>
      )}
    </div>
  );
};

export default SubscriptionBox;
