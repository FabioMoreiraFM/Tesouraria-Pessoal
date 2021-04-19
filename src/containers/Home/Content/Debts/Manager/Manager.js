import React from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import DateInput from 'components/UI/DateInput/DateInput'

import styles from './Manager.module.css'
import * as materialStyles from './MaterialUIStyles'

const Manager = () => {
    const classesButton = materialStyles.useStylesButton();
    const input = materialStyles.useStylesInput();

    return (
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
                        <DateInput classes={{root: input.root}}/>
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
    )
}

export default Manager;