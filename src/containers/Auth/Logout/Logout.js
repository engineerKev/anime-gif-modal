import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';


class Logout extends Component  {
    componentDidMount () {
        this.props.logout();
        this.props.clearLikes();
    }
    

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {dispatch(actions.logout())},
        clearLikes: () => {dispatch(actions.clearLikes())}
    }
};


export default connect(null, mapDispatchToProps)(Logout);