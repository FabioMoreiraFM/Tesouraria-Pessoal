import React from 'react'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './Usuario.module.css'

import avatar from '../../assets/avatar.png'
import SubMenuUsuario from '../Navigation/SubMenuUsuario/SubMenuUsuario';

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
            <SubMenuUsuario exibirSubMenu={exibirSubMenu} />
        </React.Fragment>
    )
}

export default Usuario;