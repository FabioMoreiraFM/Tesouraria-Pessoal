import React, { Component } from 'react'
import Routecard from 'components/Cards/Routecard/Routecard';
import CustomTable from 'components/UI/Table/Table';

import {withRouter} from 'react-router-dom'

import styles from './Debts.module.css'

const tableHeader = [
    {name: 'Dívidas', align: 'left'},
    {name: 'Valor', align: 'center'},
    {name: 'Data de Vencimento', align: 'center'},
    {name: 'Tipo de Dívida', align: 'center'},
    {name: 'Possui Juros ou Multa?', align: 'center'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center'}
]

function createData(divida, valor, dtVencimento, tipoDivida, jurosOuMulta, impactoFinanceiro) {
    return {'receita': {valor: divida, position: 'left'}, 
            'valor': {valor: valor, position: 'center'}, 
            'dtVencimento': {valor: dtVencimento, position: 'center'}, 
            'tipoDivida': {valor: tipoDivida, position: 'center'}, 
            'jurosOuMulta': {valor: jurosOuMulta, position: 'center'},
            'impactoFinanceiro': {valor: impactoFinanceiro, position: 'center'},
        };
}
  
const rows = [
    createData('IPTU', 'R$ 1.000,00', '28/02/2021', 'Imposto', 'Sim', 'Médio'),
    createData('Cartão de Crédito', 'R$ 200,00', '15/02/2021', 'Pessoal', 'Sim', 'Catastrófico'),
    createData('Empréstimo Familiar', 'R$ 100,00', '10/02/2021', 'Pessoal', 'Não', 'Baixo'),
    createData('Seguro do Carro - Parcela (5/10)', 'R$ 250,00', '01/03/2021', 'Seguro', 'Não', 'Baixo'),
    createData('Faculdade - Parcela (20/400)', 'R$ 200,00', '01/03/2021', 'Educação', 'Sim', 'Médio')
];

const handleChangePage = (event, newPage) => {

};

const handleChangeRowsPerPage = (event) => {

};



class Debts extends Component {
    goTo = (link) => {
        this.props.history.push(link);
    }

    render() {
        return (
            <div className={styles.Debts}>
                <div className={styles.Cards}>
                    <Routecard title="Gerenciar Dívidas" subtitle="Adicione ou edite dívidas." goTo={() => this.goTo('/home/debtManager')} />
                    <Routecard title="Histórico" subtitle="Analise ou encontre dívidas." goTo={() => this.goTo('/home/debtHistory')} />
                </div>
                <div className={styles.Table}>
                    <CustomTable title="Dívidas a vencer (Próximos 30 dias)" header={tableHeader} rows={rows} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </div>
            </div>
        )
    }
}

export default withRouter(Debts);