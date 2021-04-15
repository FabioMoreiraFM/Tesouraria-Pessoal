import React, { Component } from 'react'

import styles from './Dashboard.module.css'

import Card from '../../../../components/Card/Card'

import {ReactComponent as AssetsIcon} from '../../../../assets/assetsCard.svg'
import {ReactComponent as DebtIcon} from '../../../../assets/debtCard.svg'
import {ReactComponent as Income} from '../../../../assets/incomeCard.svg'

class Dashboard extends Component {
    render() {
        return (
            <article className={styles.Dashboard}>
                <Card value="R$ 10.000,00" title="Dívidas a Vencer" icon={<DebtIcon />} />
                <Card value="R$ 5.000,00" title="Receitas Mensais" icon={<Income />} />
                <Card value="R$ 50.000,00" title="Patrimônio Atual" icon={<AssetsIcon />} />
            </article>
        )
    }
}

export default Dashboard;