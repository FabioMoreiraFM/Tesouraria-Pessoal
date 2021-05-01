import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

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

import Snackbar from 'components/UI/SnackBar/CustomSnackBar'
import reactIcon from 'assets/react.png'
import * as actions from 'store/actions/index'
import * as materialStyles from './MaterialUIStyles'

import styles from './Auth.module.css'

const Auth = props => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isSignIn, setIsSignIn] = React.useState(true)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [message, setMessage] = React.useState('')

    const classes = materialStyles.useStylesIcon();
    const classesInput = materialStyles.useStylesInput();
    const classesButton = materialStyles.useStylesButton();
    const classesButtonText = materialStyles.useStylesButtonText();
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    React.useEffect(() => {
        setMessage(props.error)    
    }, [props.error, message])

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
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
        }
        />
    )

    return (
        <section className={styles.Auth}>
            {props.isAuthenticated ? <Redirect to='/home/dashboard' /> : null}

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} message={message} autoHideDuration={4000} severity="error" onClose={() => {} }/>

            <article className={styles.FormDiv}>
                <header className={styles.FormHeader}>
                    <span>{isSignIn ? 'Acesse Agora!' : 'Cadastre-se!'}</span>
                </header>

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
                                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            }
                    />
                    {isSignIn ? null : repeatPasswordField}
                </div>
                <div>
                    <Button variant="contained" classes={{root: classesButton.root}} onClick={() => {setMessage(''); return props.onTryAuthenticate(email, password, isSignIn)}}>
                        {isSignIn ? 'Entrar' : 'Cadastrar'}
                    </Button>
                </div>                    
                <div className={styles.FormFooter}>
                    <span>{isSignIn ? 'Não possui uma conta?' : 'Já possui uma conta?'}</span>
                    <Button onClick={() => setIsSignIn(!isSignIn)} color="primary" classes={{root: classesButtonText.root}} >
                        Clique aqui.
                    </Button>
                </div>
            </article>
            <footer className={styles.Copyright}>
                <CopyrightIcon className={styles.Icon}/> Fabio Moreira, todos os direitos reservados. Feito com <FavoriteIcon className={styles.HeartIcon}/> e um pouco de <img className={styles.ReactIcon} src={reactIcon} alt="React Icon"/>.                
                <div>
                    Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> - <a href="https://www.freepik.com/photos/background">Background photo created by pvproductions - www.freepik.com</a> 
                </div>
            </footer>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuthenticate: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);