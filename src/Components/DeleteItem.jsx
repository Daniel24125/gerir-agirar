import React from 'react'
import {Snackbar} from "@material-ui/core"
import {  Alert} from '@material-ui/lab'

const DeleteItem = props => {
    const {
        data: deleteResponse,
        status: deleteStatus
    } = props.deleteFunction(props.id)

    const isLoading = React.useMemo(() => {
    return deleteStatus === 'loading'
    }, [deleteStatus])

    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.finishDelete(true)
        props.setFormSubmited(false)
        props.setDeleteWarning(false)
        setOpen(false);
        };

    if(isLoading) return <></>  
    return (
        <Snackbar 
            open={open } 
            autoHideDuration={3000}
            onClose={handleClose} 
            >
            <Alert 
            variant="filled"
            severity={!deleteResponse.error? 'success': "error"} 
            onClose={handleClose}>
                {!isLoading && deleteResponse.error && <span > Ocorreu um erro ao tentar eliminar os dados. Por favor tente mais tarde.  </span>}
                {!isLoading && !deleteResponse.error && <span >Os dados do {props.type} com ID {props.id} foram eliminados </span>}
            </Alert>
        </Snackbar>
      )
}
export default DeleteItem