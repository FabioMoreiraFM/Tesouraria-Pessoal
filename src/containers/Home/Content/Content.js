import React, { Component } from 'react'

import styles from './Content.module.css'
import ContentHeader from './ContentHeader/ContentHeader';


class Content extends Component {
    render() {
        return (
            <section className={styles.Content}>
                <ContentHeader {...this.props} />
                <article className={styles.ContentBody}>
                    {this.props.children}
                </article>
            </section>
        )
    }
}

export default Content;