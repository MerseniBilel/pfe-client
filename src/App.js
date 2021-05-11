import React, { lazy,useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//redux stuff
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

if(localStorage.token){
  setAuthToken(localStorage.token);
}


function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  },[]);


  return (
    <Provider store={store} >
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/app" component={Layout} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
