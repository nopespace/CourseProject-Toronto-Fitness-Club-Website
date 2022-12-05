import * as React from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const Root = () => {
  return (
    <div>
      <Navigation />
      <div className="flex justify-center font-bold my-10 text-2xl">
        Welcome to TFC!
      </div>
    </div>
  );
}

export default Root;
