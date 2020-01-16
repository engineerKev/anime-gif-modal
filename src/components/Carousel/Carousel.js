import React, { Component } from 'react';

import CarouselItem from './CarouselItem/CarouselItem';
import classes from './Carousel.module.css'

const testData = [
    {
        "id": "Xh2NX0GGpSDWU",
        "title": "japanese dinner GIF",
        "url": "https://media0.giphy.com/media/Xh2NX0GGpSDWU/giphy.gif"
    },
    {
        "id": "55JcfWFM5u8y4",
        "title": "studio ghibli GIF",
        "url": "https://media2.giphy.com/media/55JcfWFM5u8y4/giphy.gif"
    },
    {
        "id": "oktW1eBGpHOoM",
        "title": "studio ghibli spirit GIF",
        "url": "https://media0.giphy.com/media/oktW1eBGpHOoM/giphy.gif"
    },
    {
        "id": "X5HzwMAgjBLWM",
        "title": "bleach GIF",
        "url": "https://media0.giphy.com/media/X5HzwMAgjBLWM/giphy.gif"
    },
    {
        "id": "10ZuedtImbopos",
        "title": "cowboy bebop gun GIF",
        "url": "https://media0.giphy.com/media/10ZuedtImbopos/giphy.gif"
    },
    {
        "id": "CsYky4zTeSrew",
        "title": "fullmetal alchemist GIF",
        "url": "https://media3.giphy.com/media/CsYky4zTeSrew/giphy.gif"
    },
    {
        "id": "jsOU42Wmd7Vfy",
        "title": "hayao miyazaki GIF",
        "url": "https://media0.giphy.com/media/jsOU42Wmd7Vfy/giphy.gif"
    },
    {
        "id": "TTedQxhzd5T4A",
        "title": "studio ghibli flowers GIF",
        "url": "https://media1.giphy.com/media/TTedQxhzd5T4A/giphy.gif"
    },
    {
        "id": "4QTRR1Dhxp3zi",
        "title": "studio ghibli GIF",
        "url": "https://media3.giphy.com/media/4QTRR1Dhxp3zi/giphy.gif"
    },
    {
        "id": "La9mIgaoqh6q4",
        "title": "mecha GIF",
        "url": "https://media2.giphy.com/media/La9mIgaoqh6q4/giphy.gif"
    }
]
//NEED TO HOOK UP REDUX TO GET THE USER LIKES WHEN AVAILABLE
class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentActiveIndex: 0
        }
    }
    leftArrowClick = () => {
        let newActiveIndex = this.state.currentActiveIndex - 1;
        newActiveIndex = newActiveIndex < 0 ? testData.length - 1 : newActiveIndex;
        this.setState({
            currentActiveIndex: newActiveIndex
        });
    };

    rightArrowClick = () => {
        let newActiveIndex = this.state.currentActiveIndex + 1;
        newActiveIndex = newActiveIndex >= testData.length ? 0 : newActiveIndex;
        this.setState({
            currentActiveIndex: newActiveIndex
        });
    };
    
    render() {
        const itemStyle = (elemIndex) => elemIndex === this.state.currentActiveIndex ? { display: "block" } : { display: "none" };

        return (
            <React.Fragment>
                <div className={classes.Container}>
                    {testData.map((testObj, i) => {
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
export default Carousel