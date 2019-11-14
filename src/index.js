import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import authReducer from './store/reducers/auth';
import modalReducer from './store/reducers/giphModal';
import likedGiphsReducer from './store/reducers/likedGiphs';

const rootReducer = combineReducers({
    modal: modalReducer,
    auth: authReducer,
    likedGiphs: likedGiphsReducer
})

const logger = store => {
    return next => {
        return action => {
            console.log('[MIDDLEWARE] Dispatching: ', action);
            console.log('[MIDDLEWARE] next state', store.getState());
            return next(action);
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
