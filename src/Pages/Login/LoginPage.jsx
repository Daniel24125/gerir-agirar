import React from 'react'
import LoginButton from "../../Components/Login"
import {Paper, Typography} from "@material-ui/core"
const  LoginPage = ()=> {
    return (
        <div className="loginContainer">
            <Paper className="loginButtonContainer">
                <Typography variant="h5">GESTÃO DO SITE AGIRAR</Typography>
                <Typography variant="body1">Faça login para poder gerir o site da AGIRAR</Typography>
                <LoginButton/>
                <Typography variant="caption">Apenas utilizadores autorizados podem aceder a esta plataforma</Typography>
            </Paper>
        </div>
    )
}

export default LoginPage