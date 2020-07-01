import React from 'react'
import { useGetAteliersList } from '../../Domain/useCases'
import {Paper, Typography, Button} from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';

 const Ateliers = () => {
    const {
        data: ateliers,
        status: ateliersStatus
      } = useGetAteliersList()
    
    const isLoading = React.useMemo(() => {
        return ateliersStatus === 'loading'  
    }, [ateliersStatus])

    
    return (
        <div className="ateliersListContainer">
            <div className="ateliersCardsContainer">
                {isLoading && <>
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                    <Skeleton style={{margin: 10}} variant="rect" width={360} height={500} />
                </>}
                {!isLoading && <>
                    <Paper className="cardContainer addAtelier">
                        <AddCircleIcon />
                        <Typography variant="h5">ADICIONAR ATELIER</Typography>
                    </Paper>
                     {Object.keys(ateliers).map(k=>{
                            return(
                                <Paper className="cardContainer">
                                    <div style={{background: `url(${ateliers[k].imagemURL})`, backgroundSize: "cover", backgroundPosition: "center"}}className="cardHeader"></div>
                                    <div className="cardInfo">
                                        <Typography variant="h6">{ateliers[k].name}</Typography>
                                        <Typography variant="subtitle1">{ateliers[k].desc}</Typography>
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
export default Ateliers