import React from 'react'
import {AppBar, Toolbar } from '@material-ui/core';
import LogoutButton from "./Logout"
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const Nav = (props)=> {

    return (
            <AppBar className={props.hideMenu? "navContainer": "navContainer openMenuNav"} color="inherit" height={props.height} position="fixed">
                <Toolbar className="contentContainer">
                <IconButton onClick={()=>props.setHideMenu(false)} className={!props.hideMenu? "hide": ""}>
                    <MenuIcon  className="openMenu" />
                </IconButton>   
                <LogoutButton/>
                </Toolbar>
            </AppBar>
    )
}
export default Nav