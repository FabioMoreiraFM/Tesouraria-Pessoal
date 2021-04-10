import React from 'react'

import {ReactComponent as PainelControle} from '../../../assets/painelControle.svg'
import {ReactComponent as Dividas} from '../../../assets/dividas.svg'
import {ReactComponent as Patrimonio} from '../../../assets/patrimonio.svg'
import {ReactComponent as Receitas} from '../../../assets/receitas.svg'

import styles from './NavigationItems.module.css'

export const NavigationItems = () => {
    return (
        <ul className={styles.NavigationItems}>
            <li>
                <PainelControle />
                <span>Painel de Controle</span>
            </li>
            <li>
                <Dividas />
                <span>Dívidas</span>
            </li>            
            <li>
                <Receitas />
                <span>Receitas</span>
            </li>
            <li>
                <Patrimonio />
                <span>Patrimônio</span>
            </li>                        
        </ul>
    )
}