import React from 'react'
import {Typography, Paper,TextField, Button} from "@material-ui/core"
import {useSubmitAteliers,useUpdateAtelier, useGetAteliersById} from "../../Domain/useCases"
import Loading from "../../Components/Loading"
import { useParams } from "react-router";
import UpdateFormValidated from "../../Components/UpdateFormValidated"
import FormValidated from "../../Components/FormValidated"
import ErrorComponent from "../../Components/ErrorMessage"

 const AteleirsForm = ()=> {
    let {id} = useParams()
    
    const {
        data,
        status,
        } = useGetAteliersById(id)

    const isLoading = React.useMemo(() => {
        return status === 'loading'  
        }, [status])
 
    const [formData, setFormData] = React.useState({
        sendData:{
            imagemURL: "",
            name: "",
            desc:  "", 
            dias: "", 
            horas: ""
        }, 
        error:{
            imagemURL:false,
            name: false,
            desc: false, 
            dias: false, 
            horas: false
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
    if(formData.validated && !id) return <FormValidated submitFunction={useSubmitAteliers} redirectLink="/ateliers" redirectLabel="Gestão de Ateliers"  data={formData.sendData}/>  
    if(formData.validated && id) return <UpdateFormValidated retrieveFunction={useUpdateAtelier} redirectLink="/ateliers" redirectLabel="Gestão de Ateliers"  id={id} data={formData.sendData}/>   
    if(isLoading) return <Loading msg={id? "A carregar dados do atelier": "A carregar formulário"} />
    if(!data && id ) return <ErrorComponent title="Erro" msg="O id que colocou não pertence a nenhum atelier" />
    return (
        <div className="joinUsContainer">
            <Paper className="formContainer" elevation={1}>
            <Typography variant="h6" >GESTÃO DE ATELIERS</Typography>
                <form  onSubmit={handleSubmit} >                  
                    <TextField 
                        fullWidth={true}
                        id="imagemURL" 
                        label="URL da imagem" 
                        onChange={handleTextChange}
                        error={formData.error.imagemURL}
                        value={formData.sendData.imagemURL}
                        helperText="Escolher imagens de www.pexels.com "
                        />

                     <TextField 
                        fullWidth={true}
                        id="name" 
                        label="Título" 
                        onChange={handleTextChange}
                        error={formData.error.name}
                        value={formData.sendData.name}
                        />

                    <TextField 
                        fullWidth={true}
                        id="desc" 
                        label="Descrição" 
                        onChange={handleTextChange}
                        error={formData.error.desc}
                        value={formData.sendData.desc}
                        />

                    <TextField 
                        fullWidth={true}
                        id="dias" 
                        label="Dias" 
                        onChange={handleTextChange}
                        error={formData.error.dias}
                        value={formData.sendData.dias}
                        />

                    <TextField 
                        fullWidth={true}
                        id="horas" 
                        label="Horário" 
                        onChange={handleTextChange}
                        error={formData.error.horas}
                        value={formData.sendData.horas}
                        />
                    <Button onClick={submitData} variant="contained" color="primary">submeter</Button>
                </form>
            </Paper>
        </div>
    )
}


export default AteleirsForm