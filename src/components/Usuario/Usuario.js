import React from 'react'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import avatar from '../../assets/avatar.png'

import styles from './Usuario.module.css'

export const Usuario = () => {
    const [exibirSubMenu, setExibirSubMenu] = React.useState(false);

    return (
        <React.Fragment>
            <div className={styles.Usuario}>
                <img src={avatar} alt="Avatar"/>
                <span>Fabio Moreira</span>
                <button onClick={() => setExibirSubMenu(!exibirSubMenu)}>
                    <ArrowDropDownIcon />
                </button>
            </div>
            <nav className={exibirSubMenu ? [styles.SubMenuUsuario, styles.Active].join(' ') : [styles.SubMenuUsuario, styles.Hidden].join(' ')}>
                <ul>
                    <li><SettingsIcon /> Configurações</li>
                    <li><ExitToAppIcon /> Logout</li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default Usuario;