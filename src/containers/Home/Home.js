import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Content from './Content/Content';

import styles from './Home.module.css'

export class Home extends Component {    
    render() {
        let routes = (
            <Switch>
                <Route path="/home/painelControle" component={Content} />
            </Switch>
        )
        
        return (
            <div className={styles.Home}>
                <SideDrawer />
                {routes}
            </div>
        );
    }
}

export default Home;