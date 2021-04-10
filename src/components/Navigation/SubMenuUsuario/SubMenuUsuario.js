import React from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import styles from './SubMenuUsuario.module.css'

export const SubMenuUsuario = (props) => {

    return (
        <nav className={props.exibirSubMenu ? [styles.SubMenuUsuario, styles.Active].join(' ') : [styles.SubMenuUsuario, styles.Hidden].join(' ')}>
        <ul>
            <NavigationItem link="/">
                <SettingsIcon /> Configurações
            </NavigationItem>
            <NavigationItem link="/">
                <ExitToAppIcon /> Sair
            </NavigationItem>
        </ul>
        </nav>
    )
}

export default SubMenuUsuario;

