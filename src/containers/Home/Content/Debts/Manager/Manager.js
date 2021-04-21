import React from 'react'
import axios from 'axios'

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
    {name: 'Dívidas', align: 'left', key: 'divida'},
    {name: 'Valor', align: 'center', key: 'valor'},
    {name: 'Data de Vencimento', align: 'center', key: 'dtVencimento'},
    {name: 'Tipo de Dívida', align: 'center', key: 'tipoDivida'},
    {name: 'Possui Juros ou Multa?', align: 'center', key: 'jurosOuMulta'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center', key: 'impactoAtraso'},
    {name: 'Ações', align: 'center', key: 'acoes'}
]

const actionButtons = (
    <React.Fragment>
        <EditIcon color="primary"/>
        <DeleteIcon color="error"/>
    </React.Fragment>
)
  
const handleChangePage = (event, newPage) => {

};

const handleChangeRowsPerPage = (event) => {

};

const appendActions = (debtObject) => {
    for (let x in debtObject) {
        debtObject[x]['acoes'] = actionButtons
    }

    return debtObject
}

const Manager = () => {
    const [debts, setDebts] = React.useState({})

    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    React.useEffect(() => {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts.json";
        axios.get(url)
        .then(response => {
            let debtObjects = appendActions(response.data)
            setDebts(debtObjects)
        })
    }, [debts])

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
            <CustomTable title="Dívidas Cadastradas" header={tableHeader} rows={debts} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </div>    
        </React.Fragment>          
    )
}

export default Manager;