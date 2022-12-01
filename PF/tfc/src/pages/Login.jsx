import * as React from "react";
import Navigation from "../components/Navigation";
import RegisterBox from "../components/RegisterBox";

const Login = () => {
  return (
    <>
      <Navigation />
      <RegisterBox login={true} />
    </>
  );
};

export default Login;
