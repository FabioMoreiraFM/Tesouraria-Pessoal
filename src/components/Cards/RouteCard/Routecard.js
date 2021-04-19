import React from 'react'
import Button from '@material-ui/core/Button';

import styles from './Routecard.module.css'
import * as materialStyles from './MaterialUIStyles'

const Routecard = (props) => {
    const classesButton = materialStyles.useStylesButton();
    
    return (
        <div className={styles.Routecard}>
            <span>{props.title}</span>
            <span>{props.subtitle}</span>
            <Button variant="contained" classes={{root: classesButton.root}} onClick={props.goTo}>
                Continuar
            </Button>
        </div>
    )
}

export default Routecard;