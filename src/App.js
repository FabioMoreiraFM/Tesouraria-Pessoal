import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Auth from './containers/Auth/Auth'
import Home from './containers/Home/Home'
import Logout from './containers/Auth/Logout/Logout'

import styles from './App.module.css'

import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/auth" />
      </Switch>        
    )

    return (
      <div className={styles.App}>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
