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
import IconButton from '@material-ui/core/IconButton';

import CustomTable from 'components/UI/Table/Table';
import DateInput from 'components/UI/DateInput/DateInput'
import Spinner from 'components/UI/Spinner/Spinner';
import Snackbar from 'components/UI/SnackBar/CustomSnackBar'

import styles from './Manager.module.css'
import * as materialStyles from './MaterialUIStyles'

const handleChangePage = (event, newPage) => {

};

const handleChangeRowsPerPage = (event) => {

};

const initialSnackBarState = {message: null, severity: '', autoHideDuration: 4000}

const Manager = () => {
    const [debts, setDebts] = React.useState(null)
    const [impacto, setImpacto] = React.useState("")
    const [tipoDivida, setTipoDivida] = React.useState("")
    const [divida, setDivida] = React.useState("")
    const [valor, setValor] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [jurosOuMulta, setJurosOuMulta] = React.useState("")
    const [currentKey, setCurrentKey] = React.useState(null)
    const [snackbar, setSnackbar] = React.useState(initialSnackBarState)

    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

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

    const editDebt = (key) => {
        const debt = debts[key];

        setDivida(debt.divida)
        setValor(debt.valor)
        setImpacto(debt.impactoAtraso)
        setTipoDivida(debt.tipoDivida)
        setSelectedDate(new Date(new Date(debt.dtVencimento).toLocaleString('sv-SE', { timeZone: 'UTC' })))
        setJurosOuMulta(debt.jurosOuMulta)
        setCurrentKey(key)
    }

    const limpar = () => {
        setDivida('')
        setValor('')
        setImpacto('')
        setTipoDivida('')
        setSelectedDate(new Date())
        setJurosOuMulta('')
        setCurrentKey(null)        
    }

    const deleteDebt = (key) => {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts/"+key+".json";        
        
        axios.delete(url)
        .then(() => {
            let debtsCopy = {...debts}
            delete debtsCopy[key]            
            
            setDebts(debtsCopy)
            configurarExibicaoSnackbar({message: 'Dívida apagada com sucesso!', severity: 'success'})
        })
    }

    const actionButtons = (key) => (
        <React.Fragment>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => editDebt(key)}>
                <EditIcon color="primary" />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => deleteDebt(key)}>
                <DeleteIcon color="error"/>
            </IconButton>
        </React.Fragment>
    )
      
    const salvar = () => {
        let newKey = currentKey || Math.random().toString(36).substring(7)
        let newDebt = {
            divida,
            id: Math.random() * (1000 - 1) + 1,
            impactoAtraso: impacto,
            tipoDivida,
            valor: parseFloat(valor),
            dtVencimento: new Date(selectedDate).toLocaleDateString('sv-SE', { timeZone: 'UTC' }),
            jurosOuMulta: jurosOuMulta
        }
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts/" + newKey + ".json";

        axios.put(url, newDebt)
        .then(() => {
            newDebt['acoes'] = newKey            
            
            let newDebts = {...debts}
            newDebts[newKey] = newDebt
    
            setDebts(newDebts)
            configurarExibicaoSnackbar({message: 'Dívida '+ (currentKey ? 'editada' : 'cadastrada') +' com sucesso!', severity: 'success'})
            limpar()
        })
    }

    const configurarExibicaoSnackbar = (object) => {
        setSnackbar({...snackbar, message: object.message, severity: object.severity})
    }

    const onCloseSnackbar = () => {
        setSnackbar(initialSnackBarState)
    }

    return (
        <React.Fragment>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} {...snackbar} onClose={onCloseSnackbar}/>
        <div className={styles.Manager}>
            <Grid container spacing={4} >
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={4}>
                        <TextField id="standard-size" label="Dívida" classes={{root: input.root}} value={divida} onChange={(event) => setDivida(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Valor" classes={{root: input.root}} value={valor} onChange={(event) => setValor(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Impacto Financeiro em Caso de Atraso</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={impacto} onChange={(event) => setImpacto(event.target.value)}>
                                <MenuItem value={"Catastrófico"}>Catastrófico</MenuItem>
                                <MenuItem value={"Médio"}>Médio</MenuItem>
                                <MenuItem value={"Baixo"}>Baixo</MenuItem>
                            </Select>   
                        </FormControl>                 
                    </Grid>                    
                </Grid>
                <Grid container item xd ={12} spacing={3}>
                    <Grid item xs={4}>
                        <DateInput classes={{root: input.root}} label="Data de Vencimento" onChange={(date) => setSelectedDate(date)} value={selectedDate}/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Tipo de Dívida</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={tipoDivida} onChange={(event) => setTipoDivida(event.target.value)}>
                                <MenuItem value={"Imposto"}>Imposto</MenuItem>
                                <MenuItem value={"Pessoal"}>Pessoal</MenuItem>
                                <MenuItem value={"Seguro"}>Seguro</MenuItem>
                                <MenuItem value={"Educação"}>Educação</MenuItem>
                            </Select>   
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Possui Juros e/ou Multa?</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={jurosOuMulta} onChange={(event) => setJurosOuMulta(event.target.value)}>
                                <MenuItem value={"Sim"}>Sim</MenuItem>
                                <MenuItem value={"Não"}>Não</MenuItem>
                            </Select>   
                        </FormControl>
                    </Grid>                                       
                </Grid>                
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={1}>
                        <Button variant="contained" classes={{root: classesButton.root}} onClick={() => salvar()}>
                            Salvar
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" color="secondary" onClick={() => limpar()}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>                
            </Grid>            
        </div>     
        <div className={styles.Table}>
            {debts != null ?
                <CustomTable title="Dívidas Cadastradas" header={tableHeader} rows={debts} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            : <Spinner />}
        </div>    
        </React.Fragment>          
    )
}

export default Manager;