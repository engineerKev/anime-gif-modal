import * as actionTypes from './actionsTypes';

const initialState = {
    showModal: false,
    giphyData: {},
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_MODAL:
            return {
                ...state,
                showModal: true,
            };
        case actionTypes.HIDE_MODAL:
            return {
                ...state,
                showModal: false
            }
        case actionTypes.SET_MODAL_DATA:
            return {
                ...state,
                giphyData: { ...action.data },
            }
        default:
            return state;
    }
}

export default reducer;