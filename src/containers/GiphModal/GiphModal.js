import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux'
import Modal from '../../components/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import GiphItem from './GiphItem/GiphItem';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

class GiphModal extends Component {
  handleLikeInModal = () => {
    if(!this.giphAlreadyExistsInLikes()) {
      this.props.saveLikeOnClick(
        { 
          'url': this.props.giphyData.image_url, 
          'id': this.props.giphyData.id,
          'title': this.props.giphyData.title 
        }
      );
    }
    this.props.hideModalOnClick();

  }
  giphAlreadyExistsInLikes = () => {
    const filterResults = this.props.likedGiphs ? this.props.likedGiphs.filter(e => e.id === this.props.giphyData.id) : [];
    return filterResults.length !== 0;
  }
  render() {
      return (
          <Aux>
            <Modal 
              isVisible={this.props.showModal}
              closeModal={this.props.hideModalOnClick}
              >
              <GiphItem 
                giphTitle={this.props.giphyData.title}
                srcUrl={this.props.giphyData.image_url}
              />
              <hr />
              <Button 
                btnType={"Success"} 
                clicked={this.handleLikeInModal}
                >LIKE</Button>
            </Modal>
            <Button btnType={"Success"} clicked={this.props.showModalOnClick}>GIMME DA GIFS</Button>
          </Aux>
      )
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.modal.showModal,
    giphyData: state.modal.giphyData,
    likedGiphs: state.likedGiphs.likedGiphs
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showModalOnClick: () => dispatch(actions.initModal()),
    hideModalOnClick: () => dispatch( {type: actionTypes.HIDE_MODAL} ),
    saveLikeOnClick: (payload) => dispatch(actions.saveLikedGiph(payload))
  };
}
//create a dispatch that will change the class to LIKED and also that will "log" the user's like
export default connect(mapStateToProps, mapDispatchToProps)(GiphModal);