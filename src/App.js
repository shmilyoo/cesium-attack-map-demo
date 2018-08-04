import React from "react";
// import {Route, Link, Switch, Redirect,React} from './vendors'
import { Route, Link, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { Row, Col } from "antd";
// import History from './component/History'
import io from "socket.io-client";
import { config, style } from "./optionConfig/option";
import moment from "moment";
import asyncComponent from "./component/AsyncComponent";
import World from "./component/world";
import Home from "./component/home";

// const AsyncHistory = asyncComponent(() =>
//   import(/* webpackChunkName: "history" */ "./component/History")
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    // [服务器日期 GMT+8,cpu占比 float，内存占比 float，网卡进入流量 Kb/s，网卡出流量 Kb/s， 在线ip列表[('1.1.1.1','安徽'),...]
    // dt对所有子组件起效，localDt只对本组件的foot栏的时钟起作用，当dt后台服务更新间隔较长时，本地更新localDt，可以让时钟正常显示，
    // 同时避免了子组件不必要的重新渲染
    this.state = {
      dt: 0,
      cpu: 0,
      memory: 0,
      flowIn: 0,
      flowOut: 0,
      online: {},
      localDt: 0,
      title: "服务实时状态监视"
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id="App" style={{ backgroundColor: style.bgColor }}>
        <Switch>
          <Route exact path="/world" component={World} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
