import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Auth from './containers/Auth/Auth'
import Home from './containers/Home/Home'

import styles from './App.module.css'

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/" exact component={Auth} />
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
