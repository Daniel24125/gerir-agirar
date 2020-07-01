import React from 'react'
import {Typography, Paper,TextField, Button} from "@material-ui/core"
import {useSubmitSlider, useGetSliderById} from "../../Domain/useCases"
import Loading from "../../Components/Loading"
import ErrorMessage from "../../Components/ErrorMessage"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import Dropzone from 'react-dropzone'
import BackupIcon from '@material-ui/icons/Backup';


 const JoinUs = ()=> {
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

    if(formData.validated) return <FormValidated data={formData.sendData}/>  

    if(isLoading) return <Loading msg={id? "A carregar dados do slider": "A carregar formulário"} />

    return (
        <div className="joinUsContainer">
            <Paper className="formContainer" elevation={1}>
            <Typography variant="h6" >GESTÃO DE SLIDER</Typography>
                <form  onSubmit={handleSubmit} >
                   
                    <Dropzone onDrop={acceptedFiles => {
                        console.log(acceptedFiles)
                            setFormData({...formData, sendData:{...formData.sendData, url: acceptedFiles}})}
                        }>
                        {({getRootProps, getInputProps}) => (
                            <div style={{background: formData.sendData.url !== ""?`url(${formData.sendData.url[0].path})` :""}} className="fileUploadContainer" {...getRootProps()}>
                                <input accept="image/png, image/jpeg" {...getInputProps()} />
                                <BackupIcon/>
                                <Typography>IMAGEM</Typography>
                                {
                                   formData.sendData.url !== "" && <div className="cancelImage">
                                     <Button  onClick={()=>setFormData({...formData, sendData:{...formData.sendData, url: ""}})}>CANCELAR</Button>
                                   </div> 
                                }
                            </div>
                        )}
                        </Dropzone>

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
                        type="number"
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

const FormValidated = data =>{
    const {
        data: response,
        status: submitStatus
    } =  useSubmitSlider(data)

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
                <Link to="/slider">slider</Link> 
            </Button>
        </div>
    )
}
export default JoinUs