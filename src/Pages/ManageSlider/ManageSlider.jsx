import React from 'react'
import {Typography, Paper,TextField, Button} from "@material-ui/core"
import {useSubmitSlider,useUpdateSlider, useGetSliderById} from "../../Domain/useCases"
import Loading from "../../Components/Loading"
import { useParams } from "react-router";
import UpdateFormValidated from "../../Components/UpdateFormValidated"
import FormValidated from "../../Components/FormValidated"
import ErrorComponent from "../../Components/ErrorMessage"

 const ManageSlider = ()=> {
    let {id} = useParams()
    
    const {
        data: slider,
        status: sliderStatus
        } = useGetSliderById(id)

    const isLoading = React.useMemo(() => {
        return sliderStatus === 'loading'  
        }, [sliderStatus])
 
    const [formData, setFormData] = React.useState({
        sendData:{
            url: "",
            title: "",
            description:  ""
        }, 
        error:{
            url:false,
            title: false,
            description: false
        },
        validated: false
    })
    
    React.useEffect(()=>{
        if(slider) setFormData({...formData, sendData: slider})
    }, [slider])


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
    if(formData.validated && !id) return <FormValidated submitFunction={useSubmitSlider} redirectLink="/slider" redirectLabel="Gestão do Slider"  data={formData.sendData}/>  
    if(formData.validated && id) return <UpdateFormValidated retrieveFunction={useUpdateSlider} redirectLink="/slider" redirectLabel="Gestão do Slider"  id={id} data={formData.sendData}/>   
    if(isLoading) return <Loading msg={id? "A carregar dados do slider": "A carregar formulário"} />
    if(!slider && id ) return <ErrorComponent title="Erro" msg="O id que colocou não pertence a nenhum slider" />

    return (
        <div className="joinUsContainer">
            <Paper className="formContainer" elevation={1}>
            <Typography variant="h6" >GESTÃO DE SLIDER</Typography>
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
                        onChange={handleTextChange}
                        error={formData.error.description}
                        value={formData.sendData.description}
                        />
                    <Button onClick={submitData} variant="contained" color="primary">submeter</Button>
                </form>
            </Paper>
        </div>
    )
}


export default ManageSlider