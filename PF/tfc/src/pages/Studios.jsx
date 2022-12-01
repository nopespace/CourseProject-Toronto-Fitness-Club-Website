import * as React from "react";
import StudiosComp from "../components/StudiosComp";
import axios from "axios";

class Studios extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/studios/list/?lat=1&lon=11"
      // TODO: Add the lat and lon here
    })
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <>
        <StudiosComp />
        <div>
          {this.state.details}
          {/* {this.state.details.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.address}</p>
            </div>
          ))} */}
        </div>
      </>
    );
  }
}
// TODO: Not sure why details empty
export default Studios;
