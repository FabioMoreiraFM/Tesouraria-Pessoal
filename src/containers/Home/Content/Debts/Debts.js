import React, { Component } from 'react'
import axios from 'axios'

import Routecard from 'components/Cards/RouteCard/RouteCard';
import CustomTable from 'components/UI/Table/Table';
import Spinner from 'components/UI/Spinner/Spinner';

import {withRouter} from 'react-router-dom'

import styles from './Debts.module.css'

const tableHeader = [
    {name: 'Dívidas', align: 'left', key: 'divida'},
    {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
    {name: 'Data de Vencimento', align: 'center', key: 'dtVencimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
    {name: 'Tipo de Dívida', align: 'center', key: 'tipoDivida'},
    {name: 'Possui Juros ou Multa?', align: 'center', key: 'jurosOuMulta'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center', key: 'impactoAtraso'}
]

class Debts extends Component {
    state = {
        debts: null
    }

    goTo = (link) => {
        this.props.history.push(link);
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
            <div className={styles.Debts}>
                <div className={styles.Cards}>
                    <Routecard title="Gerenciar Dívidas" subtitle="Adicione ou edite dívidas." goTo={() => this.goTo('/home/debtManager')} />
                    <Routecard title="Histórico" subtitle="Analise ou encontre dívidas." goTo={() => this.goTo('/home/historicalDebts')} />
                </div>
                <div className={styles.Table}>
                    {this.state.debts != null ?
                    <CustomTable title="Dívidas a vencer (Próximos 30 dias)" header={tableHeader} rows={this.state.debts} />
                    : <Spinner />}
                </div>
            </div>
        )
    }
}

export default withRouter(Debts);