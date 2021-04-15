import React from 'react'

import styles from './ContentHeader.module.css'

const ContentHeader = (props) =>  {
    return (
        <header className={styles.ContentHeader}>
            <div className={styles.IconSquare}>
                {props.icon}
            </div>
            <div className={styles.Title}>
                <span>{props.title}</span>
                <span>{props.subtitle}</span>
            </div>
        </header>
    )
}

export default ContentHeader;