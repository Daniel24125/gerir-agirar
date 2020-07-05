import React from 'react'
import { useGetAteliersList, useDeleteAtelier } from '../../Domain/useCases'
import {Paper, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText ,DialogActions } from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom'
import DeleteItem from "../../Components/DeleteItem"

 const Ateliers = () => {
    const {
        data: ateliers,
        status: ateliersStatus, 
        refetch
      } = useGetAteliersList()
    
    const isLoading = React.useMemo(() => {
        return ateliersStatus === 'loading'  
    }, [ateliersStatus])

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
        <div className="ateliersListContainer">
              {
                submitDelete && !finishDelete && <DeleteItem deleteFunction={useDeleteAtelier} 
                    type="atelier"
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
                <DialogTitle id="alert-dialog-title">{`Apagar os dados do atelier com o ID ${itemId}`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem a certeza que pretende eliminar os dados do atelier com a ID {itemId} da base de dados?
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
            <div className="ateliersCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                </>}
                {!isLoading && <>
                    <Link to="/ateliers/form">
                        <Paper className="cardContainer addAtelier">
                            <AddCircleIcon />
                            <Typography variant="h5">ADICIONAR ATELIER</Typography>
                        </Paper>
                    </Link>
                     {Object.keys(ateliers).map(k=>{
                            return(
                                <Paper className="cardAtelierContainer">
                                    <div style={{background: `url(${ateliers[k].imagemURL})`, backgroundSize: "cover", backgroundPosition: "center"}}className="cardHeader"></div>
                                    <div className="cardInfo">
                                        <Typography variant="h6">{ateliers[k].name}</Typography>
                                        <Typography variant="subtitle1">{ateliers[k].desc}</Typography>
                                        <div style={{margin: "10px 0"}} className="horarioContainer">
                                            <Typography style={{marginRight: "10px"}} color="primary" variant="caption">{ateliers[k].dias}</Typography>
                                            <Typography color="primary" variant="caption">{ateliers[k].horas}</Typography>
                                        </div>
                                        <div className="cardFooter">
                                            <Button className="editSlider" ><Link to={`/ateliers/form/${k}`}> editar</Link></Button>
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
export default Ateliers