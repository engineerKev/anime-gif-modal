import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

class Toolbar extends Component {
    generateNavItems = () => {
        const { hasLikes, userId } = this.props;
        let navElements = [
            {
                active: false,
                path: "/",
                text: "Random",
                show: true
            },
            {
                active: false,
                path: "/likes",
                text: "My Likes",
                show: hasLikes || userId
            },
            {
                active: false,
                path: "/auth",
                text: "User Login",
                show: !userId
            },
            {
                active: false,
                path: "/logout",
                text: "Logout",
                show: userId !== null
            }
        ];
        const indexOfRoute = this.getIndexOfCurrentRoute(navElements);
        const indexOfActive = this.getIndexOfCurrentActive(navElements);
        if (indexOfActive > -1) {
            navElements[indexOfActive].active = !navElements[indexOfActive].active;
        }
        navElements[indexOfRoute].active = !navElements[indexOfRoute].active;
        return navElements;
    }

    getIndexOfCurrentRoute = (navItems) => {
        return navItems.map(e => e.path).indexOf(this.props.history.location.pathname);
    }

    getIndexOfCurrentActive = (navItems) => {
        return navItems.map(e => e.active).indexOf(true);
    }
    
    render() {
        return (
            <header className={classes.ToolbarContainer}>
                <div className={classes.Toolbar}>
                    <NavigationItems navItems={this.generateNavItems()} />
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasLikes: state.likedGiphs.hasLikes,
        userId: state.auth.userId
    }
}

export default withRouter(connect(mapStateToProps)(Toolbar));