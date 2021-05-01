import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Routecard from 'components/Cards/RouteCard/RouteCard';
import CustomResponsiveLine from 'components/UI/Charts/ResponsiveLine/ResponsiveLine'

import styles from './Assets.module.css'

class Assets extends Component {    
    goTo = (link) => {
        this.props.history.push(link);
    }

    render() {
        return (
            <div className={styles.Assets}>
                <div className={styles.Cards}>
                    <Routecard title="Gerenciar Patrimônio" subtitle="Adicione ou edite seu investimentos." goTo={() => this.goTo('/home/assetsManager')}/>
                    <Routecard title="Histórico" subtitle="Analise ou encontre investimentos." goTo={() => this.goTo('/home/historicalAssets')}/>
                </div>
                <div className={styles.Chart}>
                  <CustomResponsiveLine data={data}/>
                </div>
            </div>
        )
    }
}

const data = [
    {
      "id": "Patrimônio",
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
    }
  ]

export default withRouter(Assets);