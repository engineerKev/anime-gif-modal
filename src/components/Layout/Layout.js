import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navElements: [
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
                    show: false
                },
                {
                    active: false,
                    path: "/auth",
                    text: "User Login",
                    show: true
                }
            ],
            currentActiveIndex: -1,
            currentAuthenticationPath: "/auth" 
        }
    }

    componentDidMount() {
        this.updateNav();
    }

    componentDidUpdate(prevProps) {
        const { userId, hasLikes } = this.props;
        if(userId && (userId !== prevProps.userId)) {
            const navElementsWithLikesUpdated = this.updateNavItem("/likes")[0];
            const [finalNavElements, authPath] = this.updateNavItem(this.state.currentAuthenticationPath, navElementsWithLikesUpdated);
            finalNavElements[this.state.currentActiveIndex].active = false;
            this.updateNav({
                navElements: finalNavElements,
                currentAuthenticationPath: authPath,
                currentActiveIndex: -1
            })
        }
        if(userId === null && prevProps.userId !== null) {
            const navElementsWithLikesUpdated = this.updateNavItem("/likes")[0];
            const [finalNavElements, authPath] = this.updateNavItem(this.state.currentAuthenticationPath, navElementsWithLikesUpdated);
            this.updateNav({
                navElements: finalNavElements,
                currentAuthenticationPath: authPath
            })
        }
        if(userId && this.state.currentActiveIndex === -1) {
            this.updateNav();
        }
        if(!prevProps.hasLikes && hasLikes) {
            const navItems = this.updateNavItem("/likes")[0];
            console.log(navItems);
            this.updateNav({
                navElements: navItems
            });
        }
    }

    updateNavItem = (path, navElements = this.state.navElements) => {
        const indexOf = navElements.map(e => e.path).indexOf(path);
        const {hasLikes, userId } = this.props;
        let newAuthPath = "";
        let navElement = navElements[indexOf];
        if(path === "/likes" && (hasLikes || userId)) {
            navElement.show = !navElement.show;
        }
        if(path === "/likes" && !hasLikes && !userId) {
            navElement.show = !navElement.show;
        }
        if(path === "/auth" || path === "/logout") {
            navElement.path = this.authOrLogout("Path");
            navElement.text = this.authOrLogout("Text");
            newAuthPath = navElement.path;
        }
        navElements[indexOf] = navElement;
        return [navElements, newAuthPath];
    }

    updateNav = (newStateObj = {}) => {
        const currentRoute = this.props.location.pathname;
        const indexOfRoute = this.state.navElements.map(e => e.path).indexOf(currentRoute);
        const currentNavElements = newStateObj.navElements && newStateObj.navElements.length ? newStateObj.navElements : this.state.navElements;
        if(this.state.currentActiveIndex > -1 ) currentNavElements[this.state.currentActiveIndex].active = false;
        if(indexOfRoute > -1) {
            currentNavElements[indexOfRoute].active = true;
            newStateObj.currentActiveIndex = indexOfRoute;
        }
        newStateObj.navElements = currentNavElements;
        this.setState(newStateObj);
    }

    toggleActiveLink = (index) => {
        const indexOfActive = this.state.currentActiveIndex;
        let updatedNavElements = this.state.navElements;
        updatedNavElements[index].active = !updatedNavElements[index].active;
        updatedNavElements[indexOfActive].active = !updatedNavElements[indexOfActive].active;
        this.setState({
            navElements: updatedNavElements,
            currentActiveIndex: index
        });
    }

    authOrLogout = (type) => {
        const { userId } = this.props;
        switch(type) {
            case "Path":
                if(userId) {
                    return "/logout";
                } else {
                    return "/auth";
                }
            case "Text":
                if(userId) {
                    return "Logout";
                } else {
                    return "User Login";
                }
            default:
                return "";
        }
    }
    render() {
        return (
            <Aux>
                <Toolbar navElements={this.state.navElements} itemClicked={this.toggleActiveLink}/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}
const mapStateToProps = state => {
    return {
        hasLikes: state.likedGiphs.hasLikes,
        userId: state.auth.userId
    }
}

export default withRouter(connect(mapStateToProps)(Layout));