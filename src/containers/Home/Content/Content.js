import React, { Component } from 'react'

import styles from './Content.module.css'
import ContentHeader from './ContentHeader/ContentHeader';

class Content extends Component {
    render() {
        return (
            <section className={styles.Content}>
                <ContentHeader />
                <article className={styles.ContentBody}>
                    
                </article>
            </section>
        )
    }
}

export default Content;