import React, { Component } from 'react'
import Routecard from 'components/Cards/Routecard/Routecard';

import styles from './Assets.module.css'

class Assets extends Component {
    render() {
        return (
            <div className={styles.Assets}>
                <Routecard title="Gerenciar Patrimônio" subtitle="Adicione ou edite seu investimentos." />
                <Routecard title="Histórico" subtitle="Analise ou encontre investimentos."/>
            </div>
        )
    }
}

export default Assets;