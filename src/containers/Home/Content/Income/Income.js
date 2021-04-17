import React, { Component } from 'react'
import Routecard from 'components/Cards/Routecard/Routecard';
import CustomTable from 'components/UI/Table/Table';

import styles from './Income.module.css'

const tableHeader = [
    {name: 'Receita', align: 'left'},
    {name: 'Valor', align: 'center'},
    {name: 'Data de Recebimento', align: 'center'},
    {name: 'Evento', align: 'center'},
    {name: 'Tipo de Receita', align: 'center'}
]

function createData(divida, valor, dtRecebimento, evento, tipoReceita) {
    return {'receita': {valor: divida, position: 'left'}, 
            'valor': {valor: valor, position: 'center'}, 
            'dtRecebimento': {valor: dtRecebimento, position: 'center'}, 
            'evento': {valor: evento, position: 'center'}, 
            'tipoReceita': {valor: tipoReceita, position: 'center'} 
        };
}
  
const rows = [
    createData('Salário', 'R$ 5.000,00', '28/02/2021', 'Mensal', 'CLT'),
    createData('Dividendos', 'R$ 300,00', '15/02/2021', 'Anual', 'Investimentos'),
    createData('Aluguel', 'R$ 800,00', '10/02/2021', 'Mensal', 'Investimentos'),
    createData('Freelancer', 'R$ 4.000,00', '01/03/2021', 'Único', 'PJ')
];

const handleChangePage = (event, newPage) => {

};

const handleChangeRowsPerPage = (event) => {

};

class Income extends Component {
    render() {
        return (
            <div className={styles.Income}>
                <div className={styles.Cards}>
                    <Routecard title="Gerenciar Receitas" subtitle="Adicione ou edite receitas." />
                    <Routecard title="Histórico" subtitle="Analise ou encontre receitas."/>
                </div>
                <div className={styles.Table}>
                    <CustomTable title="Receitas do Mês" header={tableHeader} rows={rows} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </div>
            </div>
        )
    }
}

export default Income;