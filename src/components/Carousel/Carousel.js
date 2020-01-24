import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CarouselItem from './CarouselItem/CarouselItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Carousel.module.css'
import * as actions from '../../store/actions/index';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentActiveIndex: 0
        }
    }
    componentDidMount() {
        const { token, userId, fetchedSavedLikes } = this.props
        if(!fetchedSavedLikes) {
            this.props.getUserLikes(token, userId);
        }
    }

    leftArrowClick = () => {
        const { userLikes } = this.props;

        let newActiveIndex = this.state.currentActiveIndex - 1;
        newActiveIndex = newActiveIndex < 0 ? userLikes.length - 1 : newActiveIndex;
        this.setState({
            currentActiveIndex: newActiveIndex
        });
    };

    rightArrowClick = () => {
        const { userLikes } = this.props;
        let newActiveIndex = this.state.currentActiveIndex + 1;
        newActiveIndex = newActiveIndex >= userLikes.length ? 0 : newActiveIndex;
        this.setState({
            currentActiveIndex: newActiveIndex
        });
    };

    componentContent = () => {
        const { hasLikes, fetchedSavedLikes, userId, userLikes, isLoading } = this.props;
        const itemStyle = (elemIndex) => elemIndex === this.state.currentActiveIndex ? { display: "block" } : { display: "none" };
        if (hasLikes || fetchedSavedLikes || userId) {
            return (isLoading ? <Spinner />
                :
                <React.Fragment>
                    <div className={classes.Container}>
                        {userLikes.map((testObj, i) => {
                            return (
                                <CarouselItem
                                    title={testObj.title}
                                    src={testObj.url}
                                    key={`${testObj.id}_${i}`}
                                    itemStyle={itemStyle(i)}
                                />
                            )
                        })}
                        <button type="button" className={classes.Left} onClick={this.leftArrowClick}>&#10094;</button>
                        <button type="button" className={classes.Right} onClick={this.rightArrowClick}>&#10095;</button>
                    </div>
                </React.Fragment>);
        } else {
            return <Redirect to="/" />
        }
    }
    
    render() {
        return this.componentContent();

    }
}
const mapStateToProps = state => {
    return {
        userLikes: state.likedGiphs.likedGiphs,
        token: state.auth.token,
        userId: state.auth.userId,
        isLoading: state.likedGiphs.isLoading,
        fetchedSavedLikes: state.likedGiphs.fetchedSavedLikes,
        hasLikes: state.likedGiphs.hasLikes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserLikes: (token, userId) => dispatch(actions.getUserLikes(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);