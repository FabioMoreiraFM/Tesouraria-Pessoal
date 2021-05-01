import React, {Component} from 'react'
import axios from 'axios'

import styles from './Historical.module.css'

import CustomResponsiveLine from 'components/UI/Charts/ResponsiveLine/ResponsiveLine'
import CustomTable from 'components/UI/Table/Table';
import Spinner from 'components/UI/Spinner/Spinner';

const tableHeader = [
  {name: 'Receita', align: 'left', key: 'receita'},
  {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
  {name: 'Data de Recebimento', align: 'center', key: 'dtRecebimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
  {name: 'Evento', align: 'center', key: 'evento'},
  {name: 'Tipo de Receita', align: 'center', key: 'tipoReceita'}
]

class Historical extends Component {
    state = {
        debts: null
    }

    componentDidMount() {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/income.json";
        axios.get(url)
        .then(response => {
            this.setState({debts: response.data})
        })
    }

    render() {
        
        return (
            <div className={styles.Historical}>
                <div className={styles.Chart}>
                    <CustomResponsiveLine data={data}/>
                </div>
                <div className={styles.Table}>
                        {this.state.debts != null ?
                        <CustomTable title="Receitas Cadastradas" header={tableHeader} rows={this.state.debts} />
                        : <Spinner />}
                </div>
            </div>
        )
    }
}

const data = [
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

export default Historical;