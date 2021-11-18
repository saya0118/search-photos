import React from 'react';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.handleClose();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={props.snackbar.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    { props.snackbar.type === 'added' && "Successfully Added to Favorites" }
                    { props.snackbar.type === 'removed' && "Successfully Removed from Favorites" }
                </Alert>
            </Snackbar>
        </Stack>
    );
}
