import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@material-ui/core"
 const Login = () => {
    const { loginWithRedirect } = useAuth0();
   
    return <Button variant="contained" onClick={() => loginWithRedirect()}> <span className="logo">G</span> Login com o Google</Button>;
}
export default Login