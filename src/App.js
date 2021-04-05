import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Auth from './containers/Auth/Auth'

import styles from './App.module.css'

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/" component={Auth} />
        <Redirect to="/" />
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
