import React from 'react'
import { useGetSliderList, useDeleteSlider } from '../../Domain/useCases'
import {Paper, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText ,DialogActions } from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom'
import DeleteItem from "../../Components/DeleteItem"

const Slider = () => {
    const {
        data: sliderImages,
        status: sliderStatus, 
        refetch
      } = useGetSliderList()

    const [showDeleteWarning, setDeleteWarning] = React.useState(false)
    const [finishDelete, setFinishDelete] = React.useState(true)
    const [submitDelete, setSubmitDelete] = React.useState(false)
    const [sliderId, setSliderId] = React.useState("")

    const isLoading = React.useMemo(() => {
        return sliderStatus === 'loading'  
    }, [sliderStatus])

    React.useEffect(()=>{
        if(finishDelete) refetch()
    }, [finishDelete])

    const handleSubmitDelete = ()=>{
        setSubmitDelete(true)
        setFinishDelete(false)
    }
    const handleDeleteItem = id => {
        setSliderId(id)
        setDeleteWarning(true)
    };


    return (
        <div className="sliderListContainer">
             {
                submitDelete && !finishDelete && <DeleteItem deleteFunction={useDeleteSlider} 
                    type="slider"
                    setDeleteWarning={setDeleteWarning}
                    id={sliderId}
                    setFormSubmited={setSubmitDelete} 
                    finishDelete={setFinishDelete} />
            }
            <Dialog
                open={showDeleteWarning}
                onClose={()=>setDeleteWarning(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{`Apagar os dados do atelier com o ID ${sliderId}`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem a certeza que pretende eliminar os dados do slider com a ID {sliderId} da base de dados?
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

            <div className="sliderCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={400} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={400} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={400} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={400} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={400} />
                </>}
                {!isLoading && <>
                    <Link to="/slider/form">
                        <Paper className="cardContainer addSliderImage">
                            <AddCircleIcon />
                            <Typography variant="h5">ADICIONAR IMAGEM</Typography>
                        </Paper>
                    </Link>
                     {Object.keys(sliderImages).map(k=>{
                            return(
                                <Paper className="cardContainer">
                                    <div style={{background: `url(${sliderImages[k].url})`, backgroundSize: "cover", backgroundPosition: "center"}}className="cardHeader"></div>
                                    <div className="cardInfo">
                                        <Typography variant="h5">{sliderImages[k].title}</Typography>
                                        <Typography variant="body1">{sliderImages[k].description}</Typography>
                                        <div className="cardFooter">
                                            <Button className="editSlider" ><Link to={`/slider/form/${k}`}> editar</Link></Button>
                                            <Button className="deleteSlider" onClick={()=>handleDeleteItem(k)}>Apagar</Button>
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
export default Slider