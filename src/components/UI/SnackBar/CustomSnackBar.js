import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomSnackBar = (props) => {    
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.message) {
            setOpen(true)
        } 
    }, [props.message])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        props.onClose();            
        setOpen(false);
    };

    return (
        <Snackbar anchorOrigin={props.anchorOrigin} open={open} autoHideDuration={props.autoHideDuration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
            {props.message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackBar;
