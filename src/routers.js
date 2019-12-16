import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login" />
          <Scene key="register" component={Register} title="Register" />
          <Scene key="home" component={Home} />
        </Stack>
      </Router>
    );
  }
}
