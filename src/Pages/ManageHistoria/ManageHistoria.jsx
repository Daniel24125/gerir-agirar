import React from 'react'
import {Typography, Paper,TextField, Button} from "@material-ui/core"
import {useSubmitHistoria,useUpdateHistoria, useGetHistoriaById} from "../../Domain/useCases"
import Loading from "../../Components/Loading"
import { useParams } from "react-router";
import UpdateFormValidated from "../../Components/UpdateFormValidated"
import FormValidated from "../../Components/FormValidated"
import ErrorComponent from "../../Components/ErrorMessage"

 const ManageHistoria = ()=> {
    let {id} = useParams()
    
    const {
        data,
        status,
        } = useGetHistoriaById(id)

    const isLoading = React.useMemo(() => {
        return status === 'loading'  
        }, [status])
 
    const [formData, setFormData] = React.useState({
        sendData:{
            imagemURL: "",
            titulo: "",
            detalhes:  "", 
            data: "", 
        }, 
        error:{
            imagemURL:false,
            titulo: false,
            detalhes: false, 
            data: false, 
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
    if(formData.validated && !id) return <FormValidated submitFunction={useSubmitHistoria} redirectLink="/historia" redirectLabel="Gestão de Marcos Históricos"  data={formData.sendData}/>  
    if(formData.validated && id) return <UpdateFormValidated retrieveFunction={useUpdateHistoria} redirectLink="/historia" redirectLabel="Gestão de Marcos Históricos"  id={id} data={formData.sendData}/>   
    if(isLoading) return <Loading msg={id? "A carregar dados do marco histórico": "A carregar formulário"} />
    if(!data && id ) return <ErrorComponent title="Erro" msg="O id que colocou não pertence a nenhum marco histórico" />
    return (
        <div className="joinUsContainer">
            <Paper className="formContainer" elevation={1}>
            <Typography variant="h6" >GESTÃO DA HISTÓRIA</Typography>
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
                        id="titulo" 
                        label="Título" 
                        onChange={handleTextChange}
                        error={formData.error.titulo}
                        value={formData.sendData.titulo}
                        />

                    <TextField 
                        fullWidth={true}
                        id="detalhes" 
                        label="Descrição" 
                        onChange={handleTextChange}
                        error={formData.error.detalhes}
                        value={formData.sendData.detalhes}
                        />

                    <TextField 
                        fullWidth={true}
                        id="data" 
                        label="Data" 
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleTextChange}
                        error={formData.error.data}
                        value={formData.sendData.data}
                        />

                    <Button onClick={submitData} variant="contained" color="primary">submeter</Button>
                </form>
            </Paper>
        </div>
    )
}


export default ManageHistoria
