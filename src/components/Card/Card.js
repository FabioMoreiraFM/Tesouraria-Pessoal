import React from 'react'

import styles from './Card.module.css'

const Card = (props) => {
    return (
        <div className={styles.Card}>       
            {props.icon}
            <span>{props.value}</span>
            <span>{props.title}</span>
        </div>
    )
}

export default Card;