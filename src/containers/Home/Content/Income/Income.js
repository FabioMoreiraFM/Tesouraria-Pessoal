import React, { Component } from 'react'
import axios from 'axios'

import Routecard from 'components/Cards/RouteCard/RouteCard';
import CustomTable from 'components/UI/Table/Table';

import {withRouter} from 'react-router-dom'

import styles from './Income.module.css'
import Spinner from 'components/UI/Spinner/Spinner';

const tableHeader = [
    {name: 'Receita', align: 'left', key: 'receita'},
    {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
    {name: 'Data de Recebimento', align: 'center', key: 'dtRecebimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
    {name: 'Evento', align: 'center', key: 'evento'},
    {name: 'Tipo de Receita', align: 'center', key: 'tipoReceita'}
]

class Income extends Component {
    state = {
        income: null
    }

    goTo = (link) => {
        this.props.history.push(link);
    }

    componentDidMount() {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/income.json";
        axios.get(url)
        .then(response => {
            this.setState({income: response.data})
        })
    }

    render() {
        return (
            <div className={styles.Income}>
                <div className={styles.Cards}>
                    <Routecard title="Gerenciar Receitas" subtitle="Adicione ou edite receitas." goTo={() => this.goTo('/home/incomeManager')}  />
                    <Routecard title="Histórico" subtitle="Analise ou encontre receitas." goTo={() => this.goTo('/home/historicalIncome')} />
                </div>
                <div className={styles.Table}>
                    {this.state.income != null ?
                        <CustomTable title="Receitas do Mês" header={tableHeader} rows={this.state.income} />
                        : <Spinner />
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Income);