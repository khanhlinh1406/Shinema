import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export const Error = ({ message, status }) => {
    const [open, setOpen] = React.useState();
    React.useEffect(() => {
        setOpen(status)

    }, [status])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export const Warning = ({ message, status }) => {
    const [open, setOpen] = React.useState();
    React.useEffect(() => {
        setOpen(status)
    }, [status])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export const Infor = ({ message, status }) => {
    const [open, setOpen] = React.useState();
    React.useEffect(() => {
        setOpen(status)
    }, [status])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="infor" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export const Success = ({ message, status }) => {
    const [open, setOpen] = React.useState();
    React.useEffect(() => {
        setOpen(status)
    }, [status])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});