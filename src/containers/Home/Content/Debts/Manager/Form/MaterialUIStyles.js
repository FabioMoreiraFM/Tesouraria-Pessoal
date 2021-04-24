import { makeStyles } from '@material-ui/core';

export const useStylesInput = makeStyles(theme => ({
    root: {
        width: '100%'
    }
}))

export const useStylesButton = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(90deg, rgba(73,207,73,1) 0%, rgba(75,188,75,1) 100%)',
        color: 'white'     
    }
}))