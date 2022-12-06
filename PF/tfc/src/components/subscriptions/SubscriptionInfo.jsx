import * as React from "react";
import axios from "axios";

const SubscriptionInfo = ({ plan }) => {
  const cancelPlan = async (plan) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      await axios({
        method: "put",
        url: "http://127.0.0.1:8000/subscriptions/update/",
        data: { plan_id: plan.plan_id, cancelled: true },
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Plan has been cancelled");
      // window.location.replace("/subscriptions/");
    } catch (e) { }
  }

  return (
    <div className="grid place-items-center mx-2 self-start">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
        <div className="flex justify-center mb-5">
          {plan?.plan_id ? `Current Subscription: ${plan.billing_cycle}` : "You currently have no subscription"}
        </div>
        {plan?.plan_id &&
          <button
            onClick={() => {cancelPlan(plan)}}
            className="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Cancel Plan
          </button>
        }
      </div>
    </div>
  );
};

export default SubscriptionInfo;
