import React, {Component} from 'react'
import axios from 'axios'

import styles from './Historical.module.css'

import CustomResponsiveLine from 'components/UI/Charts/ResponsiveLine/ResponsiveLine'
import CustomTable from 'components/UI/Table/Table';
import Spinner from 'components/UI/Spinner/Spinner';

const tableHeader = [
    {name: 'Dívidas', align: 'left', key: 'divida'},
    {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
    {name: 'Data de Vencimento', align: 'center', key: 'dtVencimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
    {name: 'Tipo de Dívida', align: 'center', key: 'tipoDivida'},
    {name: 'Possui Juros ou Multa?', align: 'center', key: 'jurosOuMulta'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center', key: 'impactoAtraso'}
]

class Historical extends Component {
    state = {
        debts: null
    }

    componentDidMount() {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts.json";
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
                        <CustomTable title="Dívidas Cadastradas" header={tableHeader} rows={this.state.debts} />
                        : <Spinner />}
                </div>
            </div>
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
    }
  ]

export default Historical;