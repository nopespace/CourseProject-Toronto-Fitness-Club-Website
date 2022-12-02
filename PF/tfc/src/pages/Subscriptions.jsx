import * as React from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import SubscriptionBox from "../components/SubscriptionBox";
import PaginatedItems from "../components/Pagenation";
import axios from "axios";

class Subscriptions extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/studios/list/?lat=1&lon=11",
      // TODO: Add the lat and lon here
    })
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
        console.log(data);
      })
      .catch((err) => {});
  }

  render() {
    return (
      <>
        <Navigation />
        details.map(item => {
            return <SubscriptionBox
            planName="Standard Plan"
            price="49"
            studioName={item.name}
            studioAddress={item.address}
            />
        })
        {/* <PaginatedItems items={this.details} itemsPerPage={4} />
        <div className="flex ">
          <SubscriptionBox planName="Premium Plan" price="99" />
        </div> */}
      </>
    );
  }
}

export default Subscriptions;
