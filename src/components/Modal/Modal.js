import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
//either use hooks or make this a class component

//or do it with class then do an update with hooks

//if you go with the class approach first put the code in componentDidUpdate
// const modal = (props) => {
//     return (
//         <div style={{display: props.isVisible ? 'block' : 'none'}}>
//             <h1>MY MODAL IS ALIVE!!!!!!!!!!!</h1>
//             <video width="580" height="326" autoPlay="autoplay" loop="loop">
//                 <img src={props.embed_url} width="580" height="326" alt="gipy gif"/>
//             </video>
//         </div>
//     )
// };

class Modal extends Component {
    prettifyTitle = (title = "") => {
        const lowercaseTitle = title.toLowerCase();
        return lowercaseTitle.replace("gif", "");
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.isVisible} clicked={this.props.closeModal}/>
                <div className={classes.Modal} style={{
                    transform: this.props.isVisible ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.isVisible ? '1' : '0'
                    // display: this.props.isVisible && this.props.data ? 'block' : 'none'
                    }}>
                    <h1>{this.prettifyTitle(this.props.data.title)}</h1>
                    <img src={this.props.data.image_url} style={{maxWidth: '100%'}}alt="giphy gif"/>
                </div>
            </Aux>
        );
    }
};

// export default modal;
export default Modal;