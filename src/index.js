/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
// import { getProfiles } from './actions/profileActions';
// import { getUser, User } from './actions/userActions';
import { syncHistoryWithStore } from 'react-router-redux';
// import { createStore, compose } from 'redux';
import { createStore, compose, applyMiddleware } from 'redux'; // Include compose for redux dev tool (see @todo)
import thunkMiddleware from 'redux-thunk';
import api from './middleware/api';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./favicon.ico'); // Tell webpack to load favicon.ico

// let enhancers = compose(
//     window.devToolsExtension ? window.devToolsExtension : f => f
// );

// Inspiration from Auth0 library
// let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
// let store = createStoreWithMiddleware(reducers);
const middlewares = [thunkMiddleware, api];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middlewares) // add support for Redux dev tools
    )
  );

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
