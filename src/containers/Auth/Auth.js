import React from 'react'

import Input from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import reactIcon from './../../assets/react.png'

import styles from './Auth.module.css'
import { makeStyles } from '@material-ui/core';

import axios from 'axios'

const useStylesIcon = makeStyles(theme => ({
    root: {
        color: 'grey'
    }
}))

const useStylesInput = makeStyles(theme => ({
    root: {
        width: '330px',
        height: '41px',
        borderRadius: 100, 
        fontSize: '15px',
        border: '1px solid',
        borderColor: '#b8b6b6',
        boxShadow: '0 3px #e3e1e1',
        fontFamily: 'Bahnschrift'
    }
}))

const useStylesButton = makeStyles(theme => ({
    root: {
        backgroundColor: 'black',
        opacity: 0.84,
        fontSize: '20px',
        color: 'white',
        borderRadius: 100,        
        width: '330px',
        '&:hover': {
            backgroundColor: 'grey'
        }        
    }
}))

const useStylesButtonText = makeStyles(theme => ({
    root: {
        textTransform: 'none'    
    }
}))

const Auth = props => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isSignIn, setIsSignIn] = React.useState(true)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const classes = useStylesIcon();
    const classesInput = useStylesInput();
    const classesButton = useStylesButton();
    const classesButtonText = useStylesButtonText();
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const signIn = () => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4is8YGhSPHzagN-9XlgxOB07aNqrqj9c', authData)
            .then(response => console.log(response.data))
    }
    
    const signUp = () => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4is8YGhSPHzagN-9XlgxOB07aNqrqj9c', authData)
            .then(response => console.log(response.data))
    }

    let repeatPasswordField = (
        <Input classes={{root: classesInput.root}} variant="outlined" placeholder={"Repetir Nova Senha"} type={showPassword ? 'text' : 'password'} 
        value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
        startAdornment={
            <InputAdornment classes={{root: classes.root}} position="start">
                <LockIcon />
            </InputAdornment>
        }
        endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
        }
        />
    )

    return (
        <div className={styles.Auth}>
            <div className={styles.FormDiv}>
                <div className={styles.FormHeader}>
                    <span>{isSignIn ? 'Acesse Agora!' : 'Cadastre-se!'}</span>
                </div>

                <div className={styles.InputContainer}>
                    <Input classes={{root: classesInput.root}} variant="outlined" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)}
                            startAdornment={
                                <InputAdornment classes={{root: classes.root}} position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }                            
                    />

                    <Input classes={{root: classesInput.root}} variant="outlined" placeholder={isSignIn ? "Senha" : "Nova Senha"} type={showPassword ? 'text' : 'password'} 
                            value={password} onChange={(event) => setPassword(event.target.value)}
                            startAdornment={
                                <InputAdornment classes={{root: classes.root}} position="start">
                                    <LockIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            }
                    />

                    {isSignIn ? null : repeatPasswordField}
                </div>
                <div>
                    <Button variant="contained" classes={{root: classesButton.root}} onClick={isSignIn ? signIn : signUp}>
                        {isSignIn ? 'Entrar' : 'Cadastrar'}
                    </Button>
                </div>                    
                <div className={styles.FormFooter}>
                    <span>{isSignIn ? 'Não possui uma conta?' : 'Já possui uma conta?'}</span><Button onClick={() => setIsSignIn(!isSignIn)} color="primary" classes={{root: classesButtonText.root}} >Clique aqui.</Button>
                </div>
            </div>
            <div className={styles.Copyright}>
                <CopyrightIcon className={styles.Icon}/> Fabio Moreira, todos os direitos reservados. Feito com <FavoriteIcon className={styles.HeartIcon}/> e um pouco de <img className={styles.ReactIcon} src={reactIcon} alt="React Icon"/>.                
            </div>
        </div>
    )
}

export default Auth;