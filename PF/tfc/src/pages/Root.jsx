import * as React from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

class Root extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;
    axios
      .get("http://localhost:8000/")
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
      <div>
        <Navigation />
        <p>Hello Welcome To The Main Page</p>
      </div>
    );
  }
}

export default Root;
