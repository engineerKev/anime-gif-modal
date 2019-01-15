import * as actionTypes from './actionsTypes';
import { animeAxios } from '../axios-giphy';

export const setModalData = (payload) => {
    return {
       type: actionTypes.SET_MODAL_DATA,
       data: payload.data
    }
}

export const modalReady = () => {
    return {
        type: actionTypes.SHOW_MODAL
    }
}
export const initModal =  () => {
    return dispatch => {
        animeAxios.get('/gifs/random?', {
            params: {
                api_key: '',
                tag: 'anime',
                rating: 'R'
            }
        })
        .then( response => {
            dispatch(setModalData(response.data));
            dispatch(modalReady());
        })
        .catch(error => {
            console.error(error.data.message)
        })
    }
}