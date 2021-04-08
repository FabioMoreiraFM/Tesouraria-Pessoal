import { makeStyles } from '@material-ui/core';

export const useStylesIcon = makeStyles(theme => ({
    root: {
        color: 'grey'
    }
}))

export const useStylesInput = makeStyles(theme => ({
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

export const useStylesButton = makeStyles(theme => ({
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

export const useStylesButtonText = makeStyles(theme => ({
    root: {
        textTransform: 'none'    
    }
}))