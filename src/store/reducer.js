import * as actionTypes from './actions';

const initialState = {
    showModal: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case actionTypes.HIDE_MODAL:
            return {
                ...state,
                showModal: false
            }

        default:
            return state;
    }
}

export default reducer;