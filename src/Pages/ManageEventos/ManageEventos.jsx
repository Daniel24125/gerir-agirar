import React from 'react'
import {Typography, Paper,TextField, Button} from "@material-ui/core"
import {useSubmitEventos,useUpdateEventos, useGetEventosById} from "../../Domain/useCases"
import Loading from "../../Components/Loading"
import { useParams } from "react-router";
import UpdateFormValidated from "../../Components/UpdateFormValidated"
import FormValidated from "../../Components/FormValidated"
import ErrorComponent from "../../Components/ErrorMessage"

 const ManageEventos = ()=> {
    let {id} = useParams()
    
    const {
        data,
        status,
        } = useGetEventosById(id)

    const isLoading = React.useMemo(() => {
        return status === 'loading'  
        }, [status])
 
    const [formData, setFormData] = React.useState({
        sendData:{
            url: "",
            title: "",
            description:  "", 
            shareLink: "", 
        }, 
        error:{
            url:false,
            title: false,
            description: false, 
            shareLink: false, 
            
        },
        validated: false
    })
    
    React.useEffect(()=>{
        if(data) setFormData({...formData, sendData: data})
    }, [data])


    const handleSubmit = e=>{
        e.preventDefault()
    }


    const handleTextChange = e =>{
        let tempData = formData.sendData
        let error = formData.error
        tempData[e.target.id] = e.target.value
        error[e.target.id] = false
        setFormData({
            ...formData,
            sendData: tempData, 
            error
        })
    }

 

    const submitData = ()=>{
        let temp_error = formData.error
        let hasError = false
        Object.keys(formData.sendData).map(id=>{
            if(formData.sendData[id] === "" ) {
                temp_error[id] = true; 
                hasError = true
            }
            setFormData({
                ...formData, error: temp_error
            })
        })

        if(!hasError) setFormData({...formData, validated: true})
    }
    if(formData.validated && !id) return <FormValidated submitFunction={useSubmitEventos} redirectLink="/eventos" redirectLabel="Gestão de Eventos"  data={formData.sendData}/>  
    if(formData.validated && id) return <UpdateFormValidated retrieveFunction={useUpdateEventos} redirectLink="/eventos" redirectLabel="Gestão de Eventos"  id={id} data={formData.sendData}/>   
    if(isLoading) return <Loading msg={id? "A carregar dados do evento": "A carregar formulário"} />
    if(!data && id ) return <ErrorComponent title="Erro" msg="O id que colocou não pertence a nenhum evento" />
    return (
        <div className="joinUsContainer">
            <Paper className="formContainer" elevation={1}>
            <Typography variant="h6" >GESTÃO DE EVENTOS</Typography>
                <form  onSubmit={handleSubmit} >                  
                    <TextField 
                        fullWidth={true}
                        id="url" 
                        label="URL da imagem" 
                        onChange={handleTextChange}
                        error={formData.error.url}
                        value={formData.sendData.url}
                        helperText="Escolher imagens de www.pexels.com "
                        />

                     <TextField 
                        fullWidth={true}
                        id="title" 
                        label="Título" 
                        onChange={handleTextChange}
                        error={formData.error.title}
                        value={formData.sendData.title}
                        />

                    <TextField 
                        fullWidth={true}
                        id="description" 
                        label="Descrição" 
                        multiline
                        onChange={handleTextChange}
                        error={formData.error.description}
                        value={formData.sendData.description}
                        />

                    <TextField 
                        fullWidth={true}
                        id="shareLink" 
                        label="Link de Facebook" 
                        onChange={handleTextChange}
                        error={formData.error.shareLink}
                        value={formData.sendData.shareLink}
                        />

                    <Button onClick={submitData} variant="contained" color="primary">submeter</Button>
                </form>
            </Paper>
        </div>
    )
}


export default ManageEventos