import React from 'react'
import { useGetHistoriaList, useDeleteHistoria} from '../../Domain/useCases'
import {Paper, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText ,DialogActions } from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom'
import DeleteItem from "../../Components/DeleteItem"
const Historia = () => {
    const {
        data: historia,
        status: historiaStatus, 
        refetch
      } = useGetHistoriaList()
    
    const isLoading = React.useMemo(() => {
        return historiaStatus === 'loading'  
    }, [historiaStatus])

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
        <div className="historiaListContainer">
             {
                submitDelete && !finishDelete && <DeleteItem deleteFunction={useDeleteHistoria} 
                    type="evento histórico"
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
                <DialogTitle id="alert-dialog-title">{`Apagar os dados do evento histórico com o ID ${itemId}`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem a certeza que pretende eliminar os dados do evento histórico com a ID {itemId} da base de dados?
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
            <div className="historiaCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                </>}
                {!isLoading && <>
                    <Link to="/historia/form">
                        <Paper className="cardContainer addHistoria">
                            <AddCircleIcon />
                            <Typography variant="h5">ADICIONAR MARCO HISTÓRICO</Typography>
                        </Paper>
                    </Link>
                     {Object.keys(historia).map(k=>{
                            return(
                                <Paper className="cardContainer">
                                    <div className="cardHeader">
                                        <div className="iconContainer"  style={{background: `url(${historia[k].imagemURL})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
                                    </div>
                                    <div className="cardInfo">
                                        <div className="titleContainer">
                                            <Typography className="title" color="primary" variant="h6">{historia[k].titulo}</Typography>
                                            <Typography className="date"  color="primary" variant="caption">{historia[k].data}</Typography>
                                        </div>
                                        <Typography className="date"  color="primary" variant="subtitle1">{historia[k].detalhes}</Typography>
                                        <div className="cardFooter">
                                            <Button className="editSlider" ><Link to={`/historia/form/${k}`}> editar</Link></Button>
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
export default Historia