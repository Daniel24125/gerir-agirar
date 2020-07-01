import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Avatar} from "@material-ui/core"

 const Logout = ()=> {
    const { logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
  return (
    <div className="navAccountContainer">
      {/* <Avatar alt="Remy Sharp" src={user.picture} /> */}
      <Button onClick={() => logout()}>Log Out</Button>
    </div>
  )
}
export default Logout