import * as React from 'react';
import Navigation from '../components/Navigation';

const Root = () => {
  return (
    <>
      <Navigation />
      <div className="grid place-items-center my-20">
        Welcome to the main page!
      </div>
    </>
  );
}

export default Root;