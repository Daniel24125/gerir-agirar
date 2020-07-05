import React from 'react'
import { useGetEventosList, useDeleteEventos } from '../../Domain/useCases'
import {Paper, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText ,DialogActions } from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ErrorComponent from "../../Components/ErrorMessage"
import { Link } from 'react-router-dom'
import DeleteItem from "../../Components/DeleteItem"
 const Eventos= ()=> {
    const {
        data: eventos,
        status: eventosStatus, refetch
      } = useGetEventosList()
    
    const isLoading = React.useMemo(() => {
        return eventosStatus === 'loading'  
    }, [eventosStatus])

    const [showDeleteWarning, setDeleteWarning] = React.useState(false)
    const [finishDelete, setFinishDelete] = React.useState(true)
    const [submitDelete, setSubmitDelete] = React.useState(false)
    const [itemId, setItemId] = React.useState("")
    
    React.useEffect(()=>{
        if(finishDelete) refetch()
    }, [finishDelete])

    const handleSubmitDelete = ()=>{
        setSubmitDelete(true)
        setFinishDelete(false)
    }
    const handleDeleteItem = id => {
        setItemId(id)
        setDeleteWarning(true)
    };


    return (
        <div className="eventosListContainer">
            {
                submitDelete && !finishDelete && <DeleteItem deleteFunction={useDeleteEventos} 
                    type="evento"
                    setDeleteWarning={setDeleteWarning}
                    id={itemId}
                    setFormSubmited={setSubmitDelete} 
                    finishDelete={setFinishDelete} />
            }
            <Dialog
                open={showDeleteWarning}
                onClose={()=>setDeleteWarning(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{`Apagar os dados do evento com o ID ${itemId}`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem a certeza que pretende eliminar os dados do evento com a ID {itemId} da base de dados?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setDeleteWarning(false)} color="primary">
                    Cancelar
                </Button>
                {!submitDelete && finishDelete && <Button onClick={handleSubmitDelete} color="primary" autoFocus>
                    eliminar
                </Button>}
                {submitDelete && !finishDelete && <CircularProgress color="primary"/>}
                </DialogActions>
            </Dialog>
            <div className="eventosCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                </>}
                {!isLoading && !eventos && 
                  <Link to="/eventos/form">
                      <Paper className="cardContainer addEvento">
                        <AddCircleIcon />
                        <Typography variant="h5">ADICIONAR EVENTO</Typography>
                    </Paper>
                  </Link>
                }
                {!isLoading && eventos && <>
                    <Link to="/eventos/form">
                        <Paper className="cardContainer addEvento">
                            <AddCircleIcon />
                            <Typography variant="h5">ADICIONAR EVENTO</Typography>
                        </Paper>
                    </Link>

                  
                     {Object.keys(eventos).map(k=>{
                            return(
                                <Paper className="cardContainer">
                                    {/* <div style={{background: `url()`, backgroundSize: "cover", backgroundPosition: "center"}}></div> */}
                                    <img className="cardHeader" src={eventos[k].url}alt=""/>
                                    <div className="cardInfo">
                                        <Typography color="primary" variant="h6">{eventos[k].title}</Typography>
                                        <Typography variant="subtitle1">{eventos[k].description}</Typography>
                                        <div className="cardFooter">
                                            <Button className="editSlider" ><Link to={`/eventos/form/${k}`}> editar</Link></Button>
                                            <Button onClick={()=>handleDeleteItem(k)} className="deleteSlider" >Apagar</Button>
                                        </div>
                                    </div>
                                </Paper>
                            )
                     })}
                </>}
                
            </div>
        </div>
    )
}
export default  Eventos