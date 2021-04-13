import React, {Component} from 'react'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

export class Home extends Component {    
    render() {       
        return (
            <React.Fragment>
                <SideDrawer />                
            </React.Fragment>
        );
    }
}

export default Home;