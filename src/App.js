import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Auth from './containers/Auth/Auth'
import Home from './containers/Home/Home'
import Logout from './containers/Auth/Logout/Logout'

import styles from './App.module.css'

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/home" />
      </Switch>        
    )

    return (
      <div className={styles.App}>
        {routes}
      </div>
    );
  }
}

export default App;
