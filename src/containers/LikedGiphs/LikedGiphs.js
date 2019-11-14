import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

import LikedGiphItems from '../LikedGiphItems/LikedGiphItems';
import Aux from '../../hoc/Aux';
import AdjacentButtons from '../../components/UI/AdjacentButtons/AdjacentButtons';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './LikedGiphs.module.css';
import * as actions from '../../store/actions/index';

class LikedGiphs extends Component {
    constructor(props) {
        super(props);
        const {likedGiphs, token, userId} = this.props
        this.state = { adjacentButtonsControls: [
            {
                type: "Success",
                extraClasses: this.saveLikesBtnClasses,
                text: 'Save Likes',
                clickHandler: () => {this.props.saveLikes(likedGiphs, token, userId)}
            },
            {
                type: "Success",
                extraClasses: this.saveLikesBtnClasses,
                clickHandler: this.getGiphs,
                text: 'Get MOAR Giphs',
            }
        ]}
    }
    
    componentDidMount() {
        const { token, userId, fetchedSavedLikes } = this.props
        if(!fetchedSavedLikes) {
            this.props.getUserLikes(token, userId);
        }
    }
    
    getListOfGiphs = () => {
        if(this.props.likedGiphs) {
            return this.props.likedGiphs.map(giphyObj => <img className={classes.Img} key={giphyObj.id} src={giphyObj.url} alt="favorite giphy gif" />)
        }
        return null;
    };

    unlikeGiph = (giphUrl) => {
        const updatedLikedGiphs = this.props.likedGiphs.filter(giphObj => giphObj.url !== giphUrl)
        this.props.updateLikedGiphs(updatedLikedGiphs);
    }

    saveLikesBtnClasses = () => {
        const auxilaryClasses = this.props.showLoggedInButtons ? '' : 'Hide';
        return `${auxilaryClasses}`;
    }

    getGiphs = () => {
        const { history } = this.props;
        history.push("/");
    }

    ifUserSaveLikes = () => {
        const { token } = this.props;
        if(!token) {
            return (
            <span 
                className={classes.Announcement}
            >Please <Link className={classes.Link} to="/auth"> sign-in / sign-up </Link> to save likes
            </span>);
        } else {
            return (
                <AdjacentButtons numOfButtons={2} buttons={this.state.adjacentButtonsControls} />
            )
        }
    }

    renderOrRedirect = () => {
        const { token, userId, likedGiphs } = this.props;

        if((token && userId) || likedGiphs.length) {
            return (
                <Aux>
                    <div>
                        {this.ifUserSaveLikes()}
                    </div>
                    <div className={classes.LikesContainer}>
                        <LikedGiphItems likedGiphs={this.props.likedGiphs} unlike={this.unlikeGiph}/>
                    </div>
                </Aux> 
            )
        } else {
            return <Redirect to="/" />
        }
    }

    render() {
        const { isLoading } = this.props;
        return isLoading ? <Spinner /> : this.renderOrRedirect();
    }
}

const mapStateToProps = state => {
    return {
        likedGiphs: state.likedGiphs.likedGiphs,
        showLoggedInButtons: state.likedGiphs.hasLikes,
        token: state.auth.token,
        userId: state.auth.userId,
        isLoading: state.likedGiphs.isLoading,
        fetchedSavedLikes: state.likedGiphs.fetchedSavedLikes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLikedGiphs: (updatedLikedGiphs) => dispatch(actions.updateLikedGiphs(updatedLikedGiphs)),
        saveLikes: (likes, token, userId) => dispatch(actions.saveLikes(likes, token, userId)),
        getUserLikes: (token, userId) => dispatch(actions.getUserLikes(token, userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikedGiphs));