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
    const [asset, setAsset] = React.useState("")
    const [value, setValue] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [assetType, setAssetType] = React.useState("")
    
    const [snackbar, setSnackbar] = React.useState(initialSnackBarState)
    const {operation, assets, setAssets, setOperation} = props

    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    const configurarExibicaoSnackbar = React.useCallback((object) => {
        setSnackbar({...snackbar, message: object.message, severity: object.severity})
    }, [snackbar])

    const onCloseSnackbar = () => {
        setSnackbar(initialSnackBarState)
    }

    React.useEffect( () => {
        const editAsset = (key) => {
            const asset = assets[key];
    
            setAsset(asset.investimento)
            setValue(asset.valor)
            setSelectedDate(new Date(new Date(asset.dtInvestimento).toLocaleString('sv-SE', { timeZone: 'UTC' })))
            setAssetType(asset.tipoInvestimento)
        }
        
        const deleteAsset = (key) => {
            let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/assets/"+key+".json";        
            
            axios.delete(url)
            .then(() => {
                let assetsCopy = {...assets}
                delete assetsCopy[key]            
                
                setAssets(assetsCopy)
                configurarExibicaoSnackbar({message: 'Dívida apagada com sucesso!', severity: 'success'})
            })
        }
        
        if (operation.type === 'edit') {
            editAsset(operation.currentKey)
        }

        if (operation.type === 'delete') {
            deleteAsset(operation.currentKey)            
        }
    }, [operation, assets, configurarExibicaoSnackbar, setAssets, setOperation])

    const clean = () => {
        setAsset('')
        setValue('')
        setSelectedDate(new Date())
        setAssetType('')
    }

    const save = () => {
        let newKey = operation.currentKey || Math.random().toString(36).substring(7)
        let newAsset = {
            investimento: asset,
            id: Math.random() * (1000 - 1) + 1,
            tipoInvestimento: assetType,
            valor: parseFloat(value),
            dtInvestimento: new Date(selectedDate).toLocaleDateString('sv-SE', { timeZone: 'UTC' })
        }
        let url = "https://tesouraria-pessoal-default-rtdb.firebaseio.com/assets/" + newKey + ".json";

        axios.put(url, newAsset)
        .then(() => {
            newAsset['acoes'] = newKey            
            
            let newAssets = {...assets}
            newAssets[newKey] = newAsset
    
            setAssets(newAssets)
            configurarExibicaoSnackbar({message: 'Investimento '+ (operation.currentKey ? 'editado' : 'cadastrado') +' com sucesso!', severity: 'success'})
            clean()
        })
    }

    return (
        <React.Fragment>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} {...snackbar} onClose={onCloseSnackbar}/>        
            <Grid container spacing={4} >
                <Grid container item xd={12} spacing={3}>
                    <Grid item xs={4}>
                        <TextField id="standard-size" label="Investimento" classes={{root: input.root}} value={asset} onChange={(event) => setAsset(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Valor" classes={{root: input.root}} value={value} onChange={(event) => setValue(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl classes={{root: input.root}}>
                            <InputLabel id="demo-simple-select-label">Tipo de Investimento</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={assetType} onChange={(event) => setAssetType(event.target.value)}>
                                <MenuItem value={"Renda Fixa"}>Renda Fixa</MenuItem>
                                <MenuItem value={"Ações"}>Ações</MenuItem>
                                <MenuItem value={"FII"}>FII</MenuItem>
                                <MenuItem value={"Criptomoeda"}>Criptomoeda</MenuItem>
                                <MenuItem value={"Moeda Fiduciária"}>Moeda Fiduciária</MenuItem>
                            </Select>   
                        </FormControl>                 
                    </Grid>                    
                </Grid>
                <Grid container item xd ={12} spacing={3}>
                    <Grid item xs={4}>
                        <DateInput classes={{root: input.root}} label="Data de Vencimento" onChange={(date) => setSelectedDate(date)} value={selectedDate}/>
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