import React, {Component} from 'react'
import axios from 'axios'

import styles from './Historical.module.css'

import CustomResponsiveLine from 'components/UI/Charts/ResponsiveLine/ResponsiveLine'
import CustomTable from 'components/UI/Table/Table';
import Spinner from 'components/UI/Spinner/Spinner';

const tableHeader = [
  {name: 'Investimento', align: 'left', key: 'investimento'},
  {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
  {name: 'Data do Investimento', align: 'center', key: 'dtInvestimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
  {name: 'Tipo de Investimento', align: 'center', key: 'tipoInvestimento'}
]

class Historical extends Component {
    state = {
        assets: null
    }

    componentDidMount() {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/assets.json";
        axios.get(url)
        .then(response => {
            this.setState({assets: response.data})
        })
    }

    render() {
        
        return (
            <div className={styles.Historical}>
                <div className={styles.Chart}>
                    <CustomResponsiveLine data={data}/>
                </div>
                <div className={styles.Table}>
                        {this.state.assets != null ?
                        <CustomTable title="Patrimônio Cadastrado" header={tableHeader} rows={this.state.assets} />
                        : <Spinner />}
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

export default Historical;