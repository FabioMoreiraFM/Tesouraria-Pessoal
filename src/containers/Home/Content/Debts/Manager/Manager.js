import React from 'react'
import axios from 'axios'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import CustomTable from 'components/UI/Table/Table';
import Spinner from 'components/UI/Spinner/Spinner';

import Form from './Form/Form';

import styles from './Manager.module.css'

const Manager = () => {
    const [debts, setDebts] = React.useState(null)        
    const [operation, setOperation] = React.useState({currentKey: null, type: null})

    React.useEffect(() => {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts.json";
        axios.get(url)
        .then(response => {
            let debtObjects = response.data
            Object.keys(debtObjects).map((key) => debtObjects[key]['acoes'] = key)
            setDebts(debtObjects)
        })
    }, [])

    const tableHeader = [
        {name: 'Dívidas', align: 'left', key: 'divida'},
        {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
        {name: 'Data de Vencimento', align: 'center', key: 'dtVencimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
        {name: 'Tipo de Dívida', align: 'center', key: 'tipoDivida'},
        {name: 'Possui Juros ou Multa?', align: 'center', key: 'jurosOuMulta'},
        {name: 'Impacto Financeiro em Caso de Atraso', align: 'center', key: 'impactoAtraso'},
        {name: 'Ações', align: 'center', key: 'acoes', format: (value) => actionButtons(value)}
    ]

    const actionButtons = (key) => (
        <React.Fragment>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setOperation({currentKey: key, type: 'edit'})}>
                <EditIcon color="primary" />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setOperation({currentKey: key, type: 'delete'})}>
                <DeleteIcon color="error"/>
            </IconButton>
        </React.Fragment>
    )

    return (
        <React.Fragment>        
        <div className={styles.Manager}>
            <Form debts={debts} setDebts={setDebts} operation={operation} setOperation={setOperation}/>            
        </div>     
        <div className={styles.Table}>
            {debts != null ?
                <CustomTable title="Dívidas Cadastradas" header={tableHeader} rows={debts} />
            : <Spinner />}
        </div>    
        </React.Fragment>          
    )
}

export default Manager;