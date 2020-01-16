import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import GiphModal from './containers/GiphModal/GiphModal';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './components/Layout/Layout';
import Carousel from './components/Carousel/Carousel';
import asyncComponent from './hoc/asyncComponent';
import * as actions from './store/actions/index';

const AsyncLikedGiphs = asyncComponent(() => { 
  return import('./containers/LikedGiphs/LikedGiphs') 
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/carousel" component={Carousel} />
        <Route path="/auth" component={Auth} />
        <Route path="/likes" component={AsyncLikedGiphs} />
        <Route path="/" exact component={GiphModal} />
        <Redirect to="/" />
      </Switch>

    );
    if(this.props.isAuthenticated) {
      routes =(
        <Switch>
          <Route path="/carousel" component={Carousel} />
          <Route path="/logout" component={Logout} />
          <Route path="/likes" component={AsyncLikedGiphs} />
          <Route path="/" exact component={GiphModal} />
          <Redirect to="/" />
        </Switch>

      );
    }
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
              {routes}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()  => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
