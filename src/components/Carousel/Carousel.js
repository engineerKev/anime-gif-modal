import React, { Component } from 'react';
import { connect } from 'react-redux';

import CarouselItem from './CarouselItem/CarouselItem';
import classes from './Carousel.module.css'

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentActiveIndex: 0
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
    
    render() {
        const itemStyle = (elemIndex) => elemIndex === this.state.currentActiveIndex ? { display: "block" } : { display: "none" };
        const { userLikes } = this.props; 
        return (
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
            </React.Fragment>
        );

    }
}
const mapStateToProps = state => {
    return {
        userLikes: state.likedGiphs.likedGiphs
    }
}
export default connect(mapStateToProps)(Carousel);