import React, { Component } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    showModal: false
  }
  showModal = () => {
    this.setState({showModal: true});
  }
  hideModal = () => {
    this.setState({showModal: false});
  } 
  render() {
    return (
      <div className="App">
        <Modal isVisible={this.state.showModal}/>
        <button onClick={this.showModal}>GIMME DA GIFS</button>
        <button 
          style={{
            display: this.state.showModal ? 'block' : 'none',
            margin: this.state.showModal ? '0 auto' : '0'
          }}
          onClick={this.hideModal}
        >PLZ NO MORE GIFS</button>
      </div>
    );
  }
}

export default App;
