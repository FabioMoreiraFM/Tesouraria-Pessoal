import React from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Snackbar from 'components/UI/SnackBar/CustomSnackBar'
import DateInput from 'components/UI/DateInput/DateInput'

import * as materialStyles from './MaterialUIStyles'

const initialSnackBarState = {message: null, severity: '', autoHideDuration: 4000}

const Form = (props) => {
    const [impacto, setImpacto] = React.useState("")
    const [tipoDivida, setTipoDivida] = React.useState("")
    const [divida, setDivida] = React.useState("")
    const [valor, setValor] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [jurosOuMulta, setJurosOuMulta] = React.useState("")    
    const [snackbar, setSnackbar] = React.useState(initialSnackBarState)
    const {operation, debts, setDebts, setOperation} = props

    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    const configurarExibicaoSnackbar = React.useCallback((object) => {
        setSnackbar({...snackbar, message: object.message, severity: object.severity})
    }, [snackbar])

    const onCloseSnackbar = () => {
        setSnackbar(initialSnackBarState)
    }

    const clean = React.useCallback(() => {
        setDivida('')
        setValor('')
        setImpacto('')
        setTipoDivida('')
        setSelectedDate(new Date())
        setJurosOuMulta('')
        setOperation('')
    }, [setOperation])

    React.useEffect( () => {
        const editDebt = (key) => {
            const debt = debts[key];
    
            setDivida(debt.divida)
            setValor(debt.valor)
            setImpacto(debt.impactoAtraso)
            setTipoDivida(debt.tipoDivida)
            setSelectedDate(new Date(new Date(debt.dtVencimento).toLocaleString('sv-SE', { timeZone: 'UTC' })))
            setJurosOuMulta(debt.jurosOuMulta)
        }
        
        const deleteDebt = (key) => {
            let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts/"+key+".json";        
            
            axios.delete(url)
            .then(() => {
                let debtsCopy = {...debts}
                delete debtsCopy[key]            
                
                setDebts(debtsCopy)
                configurarExibicaoSnackbar({message: 'Dívida apagada com sucesso!', severity: 'success'})
                clean()
            })
        }
        
        if (operation.type === 'edit') {
            editDebt(operation.currentKey)
        }

        if (operation.type === 'delete') {
            deleteDebt(operation.currentKey)            
        }
    }, [operation, debts, configurarExibicaoSnackbar, clean, setDebts, setOperation])

    const save = () => {
        let newKey = operation.currentKey || Math.random().toString(36).substring(7)
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
            configurarExibicaoSnackbar({message: 'Dívida '+ (operation.currentKey ? 'editada' : 'cadastrada') +' com sucesso!', severity: 'success'})
            clean()
        })
    }

    return (
        <React.Fragment>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} {...snackbar} onClose={onCloseSnackbar}/>        
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
                        <Button variant="contained" classes={{root: classesButton.root}} onClick={() => save()}>
                            Salvar
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" color="secondary" onClick={() => clean()}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>                
            </Grid>   
        </React.Fragment> 
    )
}

export default Form;