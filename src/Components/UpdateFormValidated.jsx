import React from 'react'
import Loading from "./Loading"
import ErrorMessage from "./ErrorMessage"
import {Typography, Button} from "@material-ui/core"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Link } from 'react-router-dom'

 const UpdateFormValidated = props => {
    const {
        data: response,
        status: submitStatus, 
        refetch
    } =props.retrieveFunction(props.id, props.data)

    React.useEffect(()=>{
        refetch()
    }, [props.data])

    const isLoading = React.useMemo(() => {
        return submitStatus === 'loading'  
    }, [submitStatus])
    
    if (isLoading) return <Loading msg="A submeter formulário" />

    if(response.error) return <ErrorMessage title="Erro" msg="Ocurreu um erro na submissão dos seus dados. Por favor tente mais tarde" />

    return (
        <div className="successContainer" >
            <InsertEmoticonIcon/>
            <Typography variant="h3">SUCESSO</Typography>
            <Typography variant="subtitle1">O registo foi realizado com sucesso</Typography>
            <Button variant="contained" color="primary">
    <Link to={props.redirectLink}>{props.redirectLabel}</Link> 
            </Button>
        </div>
    )
}
export default UpdateFormValidated
