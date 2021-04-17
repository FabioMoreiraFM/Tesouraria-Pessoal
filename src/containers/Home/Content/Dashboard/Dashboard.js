import React, { Component } from 'react'

import styles from './Dashboard.module.css'

import Card from '../../../../components/Cards/Dashboardcard/Dashboardcard'

import {ReactComponent as AssetsIcon} from '../../../../assets/assetsCard.svg'
import {ReactComponent as DebtIcon} from '../../../../assets/debtCard.svg'
import {ReactComponent as Income} from '../../../../assets/incomeCard.svg'

class Dashboard extends Component {
    render() {
        return (
            <article className={styles.Dashboard}>
                <Card value="R$ 10.000,00" title="Dívidas a Vencer" icon={<DebtIcon />} background="red"/>
                <Card value="R$ 5.000,00" title="Receitas Mensais" icon={<Income />} background="green" />
                <Card value="R$ 50.000,00" title="Patrimônio Atual" icon={<AssetsIcon />} background="blue"/>
            </article>
        )
    }
}

export default Dashboard;