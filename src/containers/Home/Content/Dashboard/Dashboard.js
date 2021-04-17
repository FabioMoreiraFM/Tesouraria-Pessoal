import React, { Component } from 'react'

import styles from './Dashboard.module.css'

import Card from '../../../../components/Cards/Dashboardcard/Dashboardcard'

import {ReactComponent as AssetsIcon} from '../../../../assets/assetsCard.svg'
import {ReactComponent as DebtIcon} from '../../../../assets/debtCard.svg'
import {ReactComponent as Income} from '../../../../assets/incomeCard.svg'

import CustomResponsiveLine from '../../../../components/UI/Charts/ResponsiveLine/ResponsiveLine'

class Dashboard extends Component {
    render() {
        return (
            <article className={styles.Dashboard}>
                <div className={styles.CardsLine}>
                    <Card value="R$ 10.000,00" title="Dívidas a Vencer" icon={<DebtIcon />} background="red"/>
                    <Card value="R$ 5.000,00" title="Receitas Mensais" icon={<Income />} background="green" />
                    <Card value="R$ 50.000,00" title="Patrimônio Atual" icon={<AssetsIcon />} background="blue"/>
                </div>
                <div className={styles.Chart}>
                  <CustomResponsiveLine data={data}/>
                </div>
            </article>
        )
    }
}

const data = [
    {
      "id": "Despesas",
      "color": "hsl(196, 70%, 50%)",
      "data": [
        {
          "x": "05/2020",
          "y": 121
        },
        {
          "x": "06/2020",
          "y": 288
        },
        {
          "x": "07/2020",
          "y": 104
        },
        {
          "x": "08/2020",
          "y": 19
        },
        {
          "x": "09/2020",
          "y": 182
        },
        {
          "x": "10/2020",
          "y": 134
        },
        {
          "x": "11/2020",
          "y": 257
        },
        {
          "x": "12/2020",
          "y": 163
        },
        {
          "x": "01/2021",
          "y": 169
        },
        {
          "x": "02/2021",
          "y": 37
        },
        {
          "x": "03/2021",
          "y": 195
        },
        {
          "x": "04/2021",
          "y": 29
        }
      ]
    },
    {
      "id": "Receitas",
      "color": "hsl(196, 70%, 50%)",
      "data": [
        {
          "x": "05/2020",
          "y": 213
        },
        {
          "x": "06/2020",
          "y": 108
        },
        {
          "x": "07/2020",
          "y": 230
        },
        {
          "x": "08/2020",
          "y": 42
        },
        {
          "x": "09/2020",
          "y": 167
        },
        {
          "x": "10/2020",
          "y": 29
        },
        {
          "x": "11/2020",
          "y": 234
        },
        {
          "x": "12/2020",
          "y": 292
        },
        {
          "x": "01/2021",
          "y": 2
        },
        {
          "x": "02/2021",
          "y": 33
        },
        {
          "x": "03/2021",
          "y": 196
        },
        {
          "x": "04/2021",
          "y": 118
        }
      ]
    }
  ]

export default Dashboard;