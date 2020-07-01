import React from 'react'
import {Typography, Paper,TextField, Select, MenuItem,FormControl, InputLabel,FormHelperText,Button} from "@material-ui/core"
import {useSubmitAssociate, useGetUserById} from "../../Domain/useCases"
import Loading from "../../Components/Loading"
import ErrorMessage from "../../Components/ErrorMessage"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";

 const JoinUs = ()=> {
    let {id} = useParams()
    
    const {
        data: user,
        status: userStatus
        } = useGetUserById(id)

    const isLoading = React.useMemo(() => {
        return userStatus === 'loading'  
        }, [userStatus])
    const getFomatedDate = date=>{
        const d = date.split("/")
        return `${d[2]}/${d[1]}/${Number(d[0])+1}`
    }

    const [formData, setFormData] = React.useState({
        sendData:{
            codPostal:   "",
            contribuicao:  "",
            dataNascimento:  "",
            email:  "",
            freqPagamento:  "Trimestral",
            localidade: "",
            modoPagamento:  "Transferência bancária",
            morada: "",
            nib:  "",
            nif: "",
            nome: "",
            telefone:  ""
        }, 
        error:{
            codPostal:false,
            contribuicao: false,
            dataNascimento: false,
            email: false,
            localidade: false,
            morada: false,
            nib: false,
            nif:false,
            nome: false,
            telefone: false
        },
        validated: false
    })
    
    React.useEffect(()=>{
        if(user) {
            let temp_user = user
            temp_user.dataNascimento = new Date(getFomatedDate(user.dataNascimento)).toISOString().substring(0,10)
            setFormData({...formData, sendData: temp_user})} 
    }, [user])

    
    const handleSubmit = e=>{
        e.preventDefault()
    }

    const checkContribuicao = ()=>{
        let error = false
        if(formData.sendData.freqPagamento === "Trimestral" && formData.sendData.contribuicao < 6){
            setFormData({
                ...formData, 
                error:{
                    ...formData.error, 
                    contribuicao: true
                }
            })
            error = true
        }else if(formData.sendData.freqPagamento === "Semestral" && formData.sendData.contribuicao< 12){
            setFormData({
                ...formData, 
                error:{
                    ...formData.error, 
                    contribuicao: true
                }
            })
            error = true

        }else if(formData.sendData.freqPagamento === "Anual" && formData.sendData.contribuicao< 24){
            setFormData({
                ...formData, 
                error:{
                    ...formData.error, 
                    contribuicao: true
                }
            })
            error = true
        } else {
            setFormData({
                ...formData, 
                error:{
                    ...formData.error, 
                    contribuicao: false
                }
            })
        }
        return error
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

    const handleSelectChange = e =>{
        let tempData = formData.sendData
        tempData[e.target.name] = e.target.value
        setFormData({
            ...formData, 
            sendData: tempData
        })
    }

    const submitData = ()=>{
        let temp_error = formData.error
        let hasError = false
        Object.keys(formData.sendData).map(id=>{
            if(formData.sendData[id] === "" && id !== "nib") {
                temp_error[id] = true; 
                hasError = true
            }
            setFormData({
                ...formData, error: temp_error
            })
        })
        if(formData.sendData.modoPagamento === "Débito Direto" && formData.sendData.nib === "" ){
            hasError = true
            setFormData({
                ...formData, 
                error:{
                    ...formData.error,
                    nib: true
                }
            })
        }
        if(checkContribuicao()) hasError = true


        if(!hasError) setFormData({...formData, validated: true})
    }

    if(formData.validated) return <FormValidated data={formData.sendData}/>  

    if(isLoading) return <Loading msg={id? "A carregar dados do associado": "A carregar formulário"} />

    return (
        <div className="joinUsContainer">
            <Paper className="formContainer" elevation={1}>
            <Typography variant="h6" >FORMULÁRIO DE ASSOCIADO</Typography>
                <form  onSubmit={handleSubmit} >
                    <TextField 
                        fullWidth={true}
                        id="nome" 
                        label="Nome Completo" 
                        onChange={handleTextChange}
                        error={formData.error.nome}
                        value={formData.sendData.nome}
                        />

                     <TextField 
                        fullWidth={true}
                        id="email" 
                        label="Email" 
                        onChange={handleTextChange}
                        error={formData.error.email}
                        value={formData.sendData.email}
                        />

                    <TextField 
                        fullWidth={true}
                        id="telefone" 
                        type="number"
                        label="Número de telefone" 
                        onChange={handleTextChange}
                        error={formData.error.telefone}
                        value={formData.sendData.telefone}
                        />

                    <TextField 
                        fullWidth={true}
                        id="dataNascimento" 
                        type="date"
                        label="Data de nascimento" 
                        onChange={handleTextChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={formData.error.dataNascimento}
                        value={formData.sendData.dataNascimento}
                        />

                     <TextField 
                        fullWidth={true}
                        id="morada" 
                        label="Morada" 
                        onChange={handleTextChange}
                        error={formData.error.morada}
                        value={formData.sendData.morada}
                        />

                     <TextField 
                        fullWidth={true}
                        id="codPostal" 
                        label="Código postal" 
                        onChange={handleTextChange}
                        error={formData.error.codPostal}
                        value={formData.sendData.codPostal}
                        />
                    
                    <TextField 
                        fullWidth={true}
                        id="localidade" 
                        label="Localidade" 
                        onChange={handleTextChange}
                        error={formData.error.localidade}
                        value={formData.sendData.localidade}
                        />
                    
                    <TextField 
                        fullWidth={true}
                        id="nif" 
                        label="NIF" 
                        type="number"
                        onChange={handleTextChange}
                        error={formData.error.nif}
                        value={formData.sendData.nif}
                        />
                    
                    <TextField 
                        fullWidth={true}
                        id="contribuicao" 
                        label="Contribuição" 
                        type="number"
                        inputProps={{ min: "6"}}
                        onChange={handleTextChange}
                        helperText={`O valor da sua contribuição de ser no mínimo ${
                            formData.sendData.freqPagamento === "Trimestral"? "6€ por trimestre": 
                                formData.sendData.freqPagamento === "Semestral"? "12€ por semestre": "24€ por ano"     
                        }`}
                        error={formData.error.contribuicao}
                        value={formData.sendData.contribuicao}
                        />
                    <FormControl  fullWidth={true} >
                        <InputLabel id="freqLabel">Frequência de pagamento</InputLabel>    
                        <Select
                            labelId="freqLabel"
                            id="freqPagamento"
                            value={formData.sendData.freqPagamento}
                            onChange={handleSelectChange}
                            name="freqPagamento"        
                            >
                            <MenuItem value= "Trimestral">Trimestral</MenuItem>
                            <MenuItem value= "Semestral">Semestral</MenuItem>
                            <MenuItem value= "Anual">Anual</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  fullWidth={true} >
                        <InputLabel  id="modoLabel" >Modo de pagamento</InputLabel>    
                        <Select
                            labelId="modoLabel"
                            id="freqPagamento"
                            value={formData.sendData.modoPagamento}
                            onChange={handleSelectChange}
                            name="modoPagamento"
                            >
                            <MenuItem value= "Transferência bancária">Transferência bancária</MenuItem>
                            <MenuItem value= "Débito Direto">Débito Direto</MenuItem>
                        </Select>
                       {formData.sendData.modoPagamento=== "Transferência bancária" &&  <FormHelperText color="primary" >
                            Todas as transferências devem ser realizadas para o NIB: 003600519910035196781
                        </FormHelperText>}
                      
                    {formData.sendData.modoPagamento=== "Débito Direto" && <TextField 
                        fullWidth={true}
                        id="nib" 
                        label="NIB" 
                        onChange={handleTextChange}
                        helperText="Por favor insira o seu NIB para podermos realizar o débito direto."
                        error={formData.error.nib}
                        value={formData.sendData.nib}
                        />}
                    </FormControl>
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
    } =  useSubmitAssociate(data)


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
                <Link to="/associados">Página de associados</Link> 
            </Button>
        </div>
    )
}
export default JoinUs