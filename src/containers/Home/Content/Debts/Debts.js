import React, { Component } from 'react'
import Routecard from '../../../../components/Cards/Routecard/Routecard';

import styles from './Debts.module.css'

class Debts extends Component {
    render() {
        return (
            <div className={styles.Debts}>
                <Routecard title="Gerenciar Dívidas" subtitle="Adicione ou edite dívidas." />
                <Routecard title="Histórico" subtitle="Analise ou encontre dívidas."/>
            </div>
        )
    }
}

export default Debts;