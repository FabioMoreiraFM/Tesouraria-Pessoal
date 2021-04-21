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

import styles from './Manager.module.css'
import * as materialStyles from './MaterialUIStyles'

const tableHeader = [
    {name: 'Dívidas', align: 'left', key: 'divida'},
    {name: 'Valor', align: 'center', key: 'valor', format: (value) => parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})},
    {name: 'Data de Vencimento', align: 'center', key: 'dtVencimento', format: (value) => new Date(value).toLocaleDateString('pt-BR', {timeZone: "UTC"})},
    {name: 'Tipo de Dívida', align: 'center', key: 'tipoDivida'},
    {name: 'Possui Juros ou Multa?', align: 'center', key: 'jurosOuMulta'},
    {name: 'Impacto Financeiro em Caso de Atraso', align: 'center', key: 'impactoAtraso'},
    {name: 'Ações', align: 'center', key: 'acoes'}
]

const handleChangePage = (event, newPage) => {

};

const handleChangeRowsPerPage = (event) => {

};


const Manager = () => {
    const [debts, setDebts] = React.useState(null)
    const [impacto, setImpacto] = React.useState("")
    const [tipoDivida, setTipoDivida] = React.useState("")
    const [divida, setDivida] = React.useState("")
    const [valor, setValor] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [currentKey, setCurrentKey] = React.useState(null)

    const debtsRef = React.useRef(debts)

    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    const editDebt = React.useCallback((key) => {
        const debt = debtsRef.current[key];

        setDivida(debt.divida)
        setValor(debt.valor)
        setImpacto(debt.impactoAtraso)
        setTipoDivida(debt.tipoDivida)
        setSelectedDate(new Date(new Date(debt.dtVencimento).toLocaleString('sv-SE', { timeZone: 'UTC' })))
        setCurrentKey(key)
    }, [])

    const deleteDebt = React.useCallback((key) => {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts/"+key+".json";
        axios.delete(url)
            .then(() => {
                let newDebtObject = {...debtsRef.current}
                delete newDebtObject[key]
        
                debtsRef.current = newDebtObject
                setDebts(newDebtObject)
            }
            )
    }, [])

    const actionButtons = React.useCallback((key) => (
        <React.Fragment>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => editDebt(key)}>
                <EditIcon color="primary" />
            </IconButton>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => deleteDebt(key)}>
                <DeleteIcon color="error"/>
            </IconButton>
        </React.Fragment>
    ), [editDebt, deleteDebt])
      
    React.useEffect(() => {
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts.json";
        axios.get(url)
        .then(response => {
            let debtObjects = {...response.data}

            for (let key in debtObjects) {
                debtObjects[key]['acoes'] = actionButtons(key)
            }
            
            debtsRef.current = debtObjects
            setDebts(debtObjects)
        })
    }, [actionButtons])

    const salvar = () => {
        let newKey = currentKey != null ? currentKey : "divida7"
        
        console.log(debts)
        console.log(newKey)

        let newDebt = {
            divida,
            id: 9,
            impactoAtraso: impacto,
            tipoDivida,
            valor,
            dtVencimento: new Date(selectedDate).toLocaleDateString('sv-SE', { timeZone: 'UTC' }),
            jurosOuMulta: "Sim"
        }

        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/debts/" + newKey + ".json";
        axios.put(url, newDebt)

        newDebt['acoes'] = actionButtons(newKey)
        
        let xd = {...debts}
        xd[newKey] = newDebt

        setDebts(xd)
    }

    return (
        <React.Fragment>
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
                        <DateInput classes={{root: input.root}} label="Data de Vencimento" onChange={(date) => { console.log(date); setSelectedDate(date) }} value={selectedDate}/>
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
                </Grid>                
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={4}>
                        <Button variant="contained" classes={{root: classesButton.root}} onClick={() => salvar()}>
                            Salvar
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