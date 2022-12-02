import * as React from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import SubscriptionBox from "../components/SubscriptionBox";
import PaginatedItems from "../components/Pagenation";
import axios from "axios";

const Subscriptions = ({state, useEffect}) =>  {
  const [details, setDetials] = React.useState([]);

  useEffect(() => {
    let data;
    axios({
      method: "get",
      url: "http://example.com",
      // TODO: Change
    })
      .then((res) => {
        data = res.data;
        this.setDetials({
          details: data,
        });
        console.log(data);
      })
      .catch((err) => {});
  }, [details]);
  // todo: change, not a function here
  return (
      <>
        <Navigation />
        {/* details.map(item => {
            return <SubscriptionBox
            planName="Standard Plan"
            price="49"
            studioName={item.name}
            studioAddress={item.address}
            />
        }) */}
        {/* <PaginatedItems items={this.details} itemsPerPage={4} />
        <div className="flex ">
          <SubscriptionBox planName="Premium Plan" price="99" />
        </div> */}
      </>
    );

}

export default Subscriptions;
