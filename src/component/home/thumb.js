import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Row, Col } from "antd";

class Thumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.first_img
    };
  }
  render() {
    return (
      <div
        onMouseEnter={() => {
          this.setState({ url: this.props.second_img });
        }}
        onMouseLeave={() => {
          this.setState({ url: this.props.first_img });
        }}
      >
        <Link to={this.props.link}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
            src={this.state.url}
            alt=""
          />
        </Link>
      </div>
    );
  }
}

export default Thumb;
