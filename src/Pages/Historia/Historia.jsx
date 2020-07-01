import React from 'react'
import { useGetHistoriaList } from '../../Domain/useCases'
import {Paper, Typography, Button} from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Historia = () => {
    const {
        data: historia,
        status: historiaStatus
      } = useGetHistoriaList()
    
    const isLoading = React.useMemo(() => {
        return historiaStatus === 'loading'  
    }, [historiaStatus])

    
    return (
        <div className="historiaListContainer">
            <div className="historiaCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                    <Skeleton style={{margin: 10}} variant="rect" width={750} height={300} />
                </>}
                {!isLoading && <>
                    <Paper className="cardContainer addHistoria">
                        <AddCircleIcon />
                        <Typography variant="h5">ADICIONAR MARCO HISTÓRICO</Typography>
                    </Paper>
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
export default Historia