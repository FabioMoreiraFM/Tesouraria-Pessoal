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
    const [income, setIncome] = React.useState(null)        
    const [operation, setOperation] = React.useState({currentKey: null, type: null})

    React.useEffect(() => {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/income.json";
        axios.get(url)
        .then(response => {
            let incomeObjects = response.data
            Object.keys(incomeObjects).map((key) => incomeObjects[key]['acoes'] = key)
            setIncome(incomeObjects)
        })
    }, [])

    const tableHeader = [
        {name: 'Receitas', align: 'left', key: 'receita'},
        {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
        {name: 'Data de Recebimento', align: 'center', key: 'dtRecebimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
        {name: 'Evento', align: 'center', key: 'evento'},
        {name: 'Tipo de Receita', align: 'center', key: 'tipoReceita'},
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
            <Form income={income} setIncome={setIncome} operation={operation} setOperation={setOperation}/>            
        </div>     
        <div className={styles.Table}>
            {income != null ?
                <CustomTable title="Receitas Cadastradas" header={tableHeader} rows={income} />
            : <Spinner />}
        </div>    
        </React.Fragment>          
    )
}

export default Manager;