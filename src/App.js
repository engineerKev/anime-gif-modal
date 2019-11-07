import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import GiphModal from './containers/GiphModal/GiphModal';
import LikedGiphs from './containers/LikedGiphs/LikedGiphs';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './components/Layout/Layout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
        <Layout>
          <div className="App">
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/likes" component={LikedGiphs} />
              <Route path="/auth" component={Auth} />
              <Route path="/" component={GiphModal} />
            </Switch>
          </div>
        </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()  => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
