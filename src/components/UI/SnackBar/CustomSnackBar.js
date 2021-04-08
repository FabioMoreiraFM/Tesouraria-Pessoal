import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomSnackBar = (props) => {    
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.error) {
            setOpen(true)
        }
    }, [props.error])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <Snackbar anchorOrigin={props.anchorOrigin} open={open} autoHideDuration={props.autoHideDuration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
            {props.error}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackBar;
