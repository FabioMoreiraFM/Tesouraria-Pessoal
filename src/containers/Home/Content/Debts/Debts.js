import React, { Component } from 'react'
import axios from 'axios'

import Routecard from 'components/Cards/Routecard/Routecard';
import CustomTable from 'components/UI/Table/Table';

import {withRouter} from 'react-router-dom'

import styles from './Debts.module.css'
import Spinner from 'components/UI/Spinner/Spinner';

const tableHeader = [
    {name: 'Dívidas', align: 'left', key: 'divida'},
    {name: 'Valor', align: 'center', key: 'valor'},
    {name: 'Data de Vencimento', align: 'center', key: 'dtVencimento'},
    {name: 'Tipo de Dívida', align: 'center', key: 'tipoDivida'},
    {name: 'Possui Juros ou Multa?', align: 'center', key: 'jurosOuMulta'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center', key: 'impactoAtraso'}
]

const handleChangePage = (event, newPage) => {

};

const handleChangeRowsPerPage = (event) => {

};

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
                    <Routecard title="Histórico" subtitle="Analise ou encontre dívidas." goTo={() => this.goTo('/home/debtHistory')} />
                </div>
                <div className={styles.Table}>
                    {this.state.debts != null ?
                    <CustomTable title="Dívidas a vencer (Próximos 30 dias)" header={tableHeader} rows={this.state.debts} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                    : <Spinner />}
                </div>
            </div>
        )
    }
}

export default withRouter(Debts);