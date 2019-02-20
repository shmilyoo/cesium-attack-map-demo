import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { style } from './optionConfig/option';
import World from './component/world';
import Home from './component/home';

class App extends React.Component {
  render() {
    return (
      <div id="App" style={{ backgroundColor: style.bgColor }}>
        <Switch>
          {/* <Route exact path="/world" component={World} /> */}
          {/* <Route path="/" component={Home} /> */}
          <Route exact path="/world" component={World} />
          <Route path="/" render={() => <Redirect to="/world" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
