import React from 'react'

import {ReactComponent as PainelControle} from '../../../assets/painelControle.svg'
import {ReactComponent as Dividas} from '../../../assets/dividas.svg'
import {ReactComponent as Patrimonio} from '../../../assets/patrimonio.svg'
import {ReactComponent as Receitas} from '../../../assets/receitas.svg'

import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

export const NavigationItems = () => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/">
                <PainelControle />
                <span>Painel de Controle</span>
            </NavigationItem>
            <NavigationItem link="/">
                <Dividas />
                <span>Dívidas</span>
            </NavigationItem>
            <NavigationItem link="/">
                <Receitas />
                <span>Receitas</span>
            </NavigationItem>
            <NavigationItem link="/">
                <Patrimonio />
                <span>Patrimônio</span>
            </NavigationItem>    
        </ul>
    )
}