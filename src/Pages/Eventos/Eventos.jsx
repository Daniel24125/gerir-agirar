import React from 'react'
import { useGetEventosList } from '../../Domain/useCases'
import {Paper, Typography, Button} from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';

 const Eventos= ()=> {
    const {
        data: eventos,
        status: eventosStatus
      } = useGetEventosList()
    
    const isLoading = React.useMemo(() => {
        return eventosStatus === 'loading'  
    }, [eventosStatus])

    
    return (
        <div className="eventosListContainer">
            <div className="eventosCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                    <Skeleton style={{margin: 10}} variant="rect" width={690} height={380} />
                </>}
                {!isLoading && <>
                    <Paper className="cardContainer addEvento">
                        <AddCircleIcon />
                        <Typography variant="h5">ADICIONAR EVENTO</Typography>
                    </Paper>
                     {Object.keys(eventos).map(k=>{
                            return(
                                <Paper className="cardContainer">
                                    <div style={{background: `url(${eventos[k].imagemURL})`, backgroundSize: "cover", backgroundPosition: "center"}}className="cardHeader"></div>
                                    <div className="cardInfo">
                                        <Typography color="primary" variant="h6">{eventos[k].titulo}</Typography>
                                        <Typography variant="subtitle1">{eventos[k].detalhes}</Typography>
                                        <div className="cardFooter">
                                            <Button className="editSlider" >editar</Button>
                                            <Button className="deleteSlider" >Apagar</Button>
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