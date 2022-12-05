import * as React from 'react';
import RegisterBox from '../components/RegisterBox';
import Navigation from '../components/Navigation';
import CardBox from '../components/CardBox';

const Edit = () => {
  return (
    <>
      <Navigation />
      <div className="flex justify-center font-bold my-10 text-2xl">
        Change account information
      </div>
      <div className="grid grid-cols-2">
        <RegisterBox type="Edit" />
        <CardBox />
      </div>
    </>
  );
}

export default Edit;