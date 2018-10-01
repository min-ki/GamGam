import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from 'redux-i18n';
import user from 'redux/modules/user';
import travels from 'redux/modules/travel';

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];


if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

// combineReducer를 통해서 여러 리듀서들을 하나로 합친다.
const reducer = combineReducers({
    user,
    travels,
    routing: routerReducer,
    i18nState
});

let store;

if(env === "development") {
    store = initalState => createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
    store = initalState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };

export default store();
