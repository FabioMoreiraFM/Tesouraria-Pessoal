import { makeStyles } from '@material-ui/core';

export const useStylesButton = makeStyles(theme => ({
    root: {
        backgroundColor: 'red',
        opacity: 0.84,
        fontSize: '15px',
        color: 'white',
        borderRadius: 100, 
        width: '70%',               
        '&:hover': {
            backgroundColor: 'green'
        }        
    }
}))