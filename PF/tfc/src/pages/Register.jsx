import * as React from 'react';
import RegisterBox from '../components/RegisterBox';
import Navigation from '../components/Navigation';

const Register = () => {
  return (
    <>
      <Navigation />
      <RegisterBox type="Register" />
    </>
  );
}

export default Register;