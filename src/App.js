import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Modal from './components/Modal/Modal';
import * as actionTypes from './store/actionTypes';
import * as actions from './store/actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Modal isVisible={this.props.showModal} data={this.props.giphyData} closeModal={this.props.hideModalOnClick}/>
        <button onClick={this.props.showModalOnClick}>GIMME DA GIFS</button>
        <button 
          style={{
            display: this.props.showModal ? 'block' : 'none',
            margin: this.props.showModal ? '0 auto' : '0'
          }}
          onClick={this.props.hideModalOnClick}
        >PLZ NO MORE GIFS</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal,
    giphyData: state.giphyData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showModalOnClick: () => dispatch(actions.initModal()),
    hideModalOnClick: () => dispatch( {type: actionTypes.HIDE_MODAL} )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
