import * as React from 'react';
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';
import SubscriptionBox from '../components/SubscriptionBox';

const Subscriptions = () => {
return (
  <>
    <Navigation />
    <div className="flex ">
      <SubscriptionBox 
        planName="Standard Plan"
        price="49"
      />
      <SubscriptionBox 
        planName="Premium Plan"
        price="99"
      />
    </div>
  </>
);
}

export default Subscriptions;