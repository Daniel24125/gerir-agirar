import React from 'react'
import { useGetSliderList } from '../../Domain/useCases'
import {Paper, Typography, Button} from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom'

const Slider = () => {
    const {
        data: sliderImages,
        status: sliderStatus
      } = useGetSliderList()
    
    const isLoading = React.useMemo(() => {
        return sliderStatus === 'loading'  
    }, [sliderStatus])

    const [sliderID, setID] = React.useState("")
    
    return (
        <div className="sliderListContainer">
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
export default Slider