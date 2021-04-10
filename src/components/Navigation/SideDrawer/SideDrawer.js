import React from 'react'
import Logo from '../../Logo/Logo';
import Usuario from '../../Usuario/Usuario';
import { NavigationItems } from '../NavigationItems/NavigationItems';

import styles from './SideDrawer.module.css'

export const SideDrawer = (props) => {
    return (
        <aside className={styles.SideDrawer}>
            <header>
                <Logo />
                <hr />
                <Usuario />
                <hr />
            </header>
            <nav>
                <NavigationItems />
            </nav>
        </aside>
    )
}

export default SideDrawer;