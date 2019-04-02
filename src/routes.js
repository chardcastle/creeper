import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HoldingPage from './containers/HoldingPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProfilePage from './components/ProfilePage';
import UserPage from './components/UserPage';
import NotFoundPage from './components/NotFoundPage';
import Auth from './reducers/auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgotten from './components/auth/Forgotten';
import Reset from './components/auth/Reset';

//Web summit pages
import ApplicationPage from './websummit/components/ApplicationPage';

/**
 * Website is set to the holding page
 * when this is true
 */
const isPublic = true;
const isLive = false;

/**
 * Redirects user if they aren't logged int
 *
 * @todo Check this
 * @param nextState
 * @param replace
 */
function requireAuth(nextState, replace) {

  let auth = Auth(null, {type : 'AUTH_DEFAULT'});

  if (! auth.isAuthenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

/**
 * Remove identity from local store
 */
function clearAuth() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
}

export default (
  <Route path="/" component={(isPublic ) ? App : HoldingPage}>
    <IndexRoute component={ApplicationPage} onEnter={clearAuth} />
    <Route path="login" component={(isPublic) ? Login : HoldingPage} onEnter={clearAuth} />
    <Route path="forgotten" component={Forgotten} />
    <Route path="password/reset/:hash" component={Reset} />
    <Route path="register" component={(isLive) ? Register : HoldingPage} />
    <Route path="about" component={(isLive) ? AboutPage : HoldingPage} onEnter={requireAuth} />
    <Route path="profile" component={(isPublic) ? ProfilePage : HoldingPage} onEnter={requireAuth} />
    <Route path="user/:id" component={(isPublic) ? UserPage : HoldingPage} />
    <Route path="users/:index" component={(isPublic) ? HomePage : HoldingPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
