import React, { Component } from 'react'
import Routecard from '../../../../components/Cards/Routecard/Routecard';

import styles from './Income.module.css'

class Income extends Component {
    render() {
        return (
            <div className={styles.Income}>
                <Routecard title="Gerenciar Receitas" subtitle="Adicione ou edite receitas." />
                <Routecard title="Histórico" subtitle="Analise ou encontre receitas."/>
            </div>
        )
    }
}

export default Income;