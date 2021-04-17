import React from 'react'

import styles from './Dashboardcard.module.css'

const availableColors = {
    red: styles.Red,
    green: styles.Green,
    blue: styles.Blue
}

const Card = (props) => {
    return (
        <div className={[styles.Card, availableColors[props.background]].join(' ')}>       
            {props.icon}
            <span>{props.value}</span>
            <span>{props.title}</span>
        </div>
    )
}

export default Card;