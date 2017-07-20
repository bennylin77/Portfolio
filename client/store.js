import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index.js';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const routerHistoryMiddleware = routerMiddleware(history)

// create an object for the default data
const defaultState = {
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunkMiddleware, routerHistoryMiddleware));

export {history};
export default store;
