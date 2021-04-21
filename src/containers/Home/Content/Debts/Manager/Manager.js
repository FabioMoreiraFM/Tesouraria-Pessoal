import React from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import CustomTable from 'components/UI/Table/Table';
import DateInput from 'components/UI/DateInput/DateInput'

import styles from './Manager.module.css'
import * as materialStyles from './MaterialUIStyles'

const tableHeader = [
    {name: 'Dívidas', align: 'left'},
    {name: 'Valor', align: 'center'},
    {name: 'Data de Vencimento', align: 'center'},
    {name: 'Tipo de Dívida', align: 'center'},
    {name: 'Possui Juros ou Multa?', align: 'center'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center'},
    {name: 'Ações', align: 'center'}
]

function createData(divida, valor, dtVencimento, tipoDivida, jurosOuMulta, impactoFinanceiro, acoes) {
    return {'receita': {valor: divida, position: 'left'}, 
            'valor': {valor: valor, position: 'center'}, 
            'dtVencimento': {valor: dtVencimento, position: 'center'}, 
            'tipoDivida': {valor: tipoDivida, position: 'center'}, 
            'jurosOuMulta': {valor: jurosOuMulta, position: 'center'},
            'impactoFinanceiro': {valor: impactoFinanceiro, position: 'center'},
            'acoes': {valor: actionButtons, position: 'center'},
        };
}

const actionButtons = (
    <React.Fragment>
        <EditIcon color="primary"/>
        <DeleteIcon color="error"/>
    </React.Fragment>
)
  
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

const Manager = () => {
    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    return (
        <React.Fragment>
        <div className={styles.Manager}>
            <Grid container spacing={4} >
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={4}>
                        <TextField id="standard-size" label="Dívida" classes={{root: input.root}} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Valor" classes={{root: input.root}}/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Impacto Financeiro em Caso de Atraso</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value={30}>Catastrófico</MenuItem>
                                <MenuItem value={20}>Médio</MenuItem>
                                <MenuItem value={10}>Baixo</MenuItem>
                            </Select>   
                        </FormControl>                 
                    </Grid>                    
                </Grid>
                <Grid container item xd ={12} spacing={3}>
                    <Grid item xs={4}>
                        <DateInput classes={{root: input.root}} label="Data de Vencimento"/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Tipo de Dívida</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value={40}>Imposto</MenuItem>
                                <MenuItem value={30}>Pessoal</MenuItem>
                                <MenuItem value={20}>Seguro</MenuItem>
                                <MenuItem value={10}>Educação</MenuItem>
                            </Select>   
                        </FormControl>
                    </Grid>                   
                </Grid>                
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={4}>
                        <Button variant="contained" classes={{root: classesButton.root}}>
                            Salvar
                        </Button>
                    </Grid>
                </Grid>                
            </Grid>            
        </div>     
        <div className={styles.Table}>
            <CustomTable title="Dívidas Cadastradas" header={tableHeader} rows={rows} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </div>    
        </React.Fragment>          
    )
}

export default Manager;