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
    const [incomeLabel, setIncomeLabel] = React.useState("")
    const [valor, setValor] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [evento, setEvento] = React.useState("")    
    const [incomeType, setIncomeType] = React.useState("")    
    const [snackbar, setSnackbar] = React.useState(initialSnackBarState)
    const {operation, income, setIncome, setOperation} = props

    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    const configurarExibicaoSnackbar = React.useCallback((object) => {
        setSnackbar({...snackbar, message: object.message, severity: object.severity})
    }, [snackbar])

    const onCloseSnackbar = () => {
        setSnackbar(initialSnackBarState)
    }

    React.useEffect( () => {
        const editIncome = (key) => {
            const inc = income[key];
    
            setIncomeLabel(inc.receita)
            setValor(inc.valor)
            setEvento(inc.evento)
            setIncomeType(inc.tipoReceita)
            setSelectedDate(new Date(new Date(inc.dtRecebimento).toLocaleString('sv-SE', { timeZone: 'UTC' })))
        }
        
        const deleteIncome = (key) => {
            let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/receitas/"+key+".json";        
            
            axios.delete(url)
            .then(() => {
                let incomeCopy = {...income}
                delete incomeCopy[key]            
                
                setIncome(incomeCopy)
                configurarExibicaoSnackbar({message: 'Receita apagada com sucesso!', severity: 'success'})
            })
        }
        
        if (operation.type === 'edit') {
            editIncome(operation.currentKey)
        }

        if (operation.type === 'delete') {
            deleteIncome(operation.currentKey)
        }
    }, [operation, income, configurarExibicaoSnackbar, setIncome, setOperation])

    const clean = () => {
        setIncomeLabel('')
        setValor('')
        setSelectedDate(new Date())
        setEvento('')
        setIncomeType('')
        setOperation('')
    }

    const save = () => {
        let newKey = operation.currentKey || Math.random().toString(36).substring(7)
        
        let newIncome = {
            receita: incomeLabel,
            id: Math.random() * (1000 - 1) + 1,
            valor: parseFloat(valor),
            dtRecebimento: new Date(selectedDate).toLocaleDateString('sv-SE', { timeZone: 'UTC' }),
            evento,
            tipoReceita: incomeType
        }
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/income/" + newKey + ".json";

        axios.put(url, newIncome)
        .then(() => {
            newIncome['acoes'] = newKey            
            
            let newIncomes = {...income}
            newIncomes[newKey] = newIncome
    
            setIncome(newIncomes)
            configurarExibicaoSnackbar({message: 'Receita '+ (operation.currentKey ? 'editada' : 'cadastrada') +' com sucesso!', severity: 'success'})
            clean()
        })
    }

    return (
        <React.Fragment>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} {...snackbar} onClose={onCloseSnackbar}/>        
            <Grid container spacing={4} >
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={4}>
                        <TextField id="standard-size" label="Receita" classes={{root: input.root}} value={incomeLabel} onChange={(event) => setIncomeLabel(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Valor" classes={{root: input.root}} value={valor} onChange={(event) => setValor(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Evento</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={evento} onChange={(event) => setEvento(event.target.value)}>
                                <MenuItem value={"Mensal"}>Mensal</MenuItem>
                                <MenuItem value={"Anual"}>Anual</MenuItem>
                                <MenuItem value={"Único"}>Único</MenuItem>
                            </Select>   
                        </FormControl>                 
                    </Grid>                    
                </Grid>
                <Grid container item xd ={12} spacing={3}>
                    <Grid item xs={4}>
                        <DateInput classes={{root: input.root}} label="Data de Recebimento" onChange={(date) => setSelectedDate(date)} value={selectedDate}/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Tipo de Receita</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={incomeType} onChange={(event) => setIncomeType(event.target.value)}>
                                <MenuItem value={"CLT"}>CLT</MenuItem>
                                <MenuItem value={"Investimentos"}>Investimentos</MenuItem>
                                <MenuItem value={"PJ"}>PJ</MenuItem>
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