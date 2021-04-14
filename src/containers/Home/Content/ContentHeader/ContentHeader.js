import React from 'react'

import {ReactComponent as PainelControle} from '../../../../assets/painelControle.svg'
import styles from './ContentHeader.module.css'

const ContentHeader = (props) =>  {
    return (
        <header className={styles.ContentHeader}>
            <div className={styles.IconSquare}>
                <PainelControle />
            </div>
            <div className={styles.Title}>
                <span>Painel de Controle</span>
                <span>Quadros resumitivos com as principais informações para tomadas de decisão.</span>
            </div>
        </header>
    )
}

export default ContentHeader;