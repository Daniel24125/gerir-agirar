import React from 'react';
import './styles.sass';
import { useAuth0 } from "@auth0/auth0-react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {CssBaseline} from '@material-ui/core'
import loadable from '@loadable/component'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Work Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#00A4DD'
    },
    secondary: {
      main: '#FF8600'
    }
  },
  shape: {
    borderRadius: 4
  }
})


const LoginPage = loadable(() => import('./Pages/Login/LoginPage'))
const Dash = loadable(() => import('./Pages/Dash/Dash'))
const UnAuth = loadable(() => import('./Pages/UnAuth/UnAuth'))

const App = () => {
  
  const { user, isAuthenticated } = useAuth0();

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {!isAuthenticated && <LoginPage/>}
        {isAuthenticated && user.email === process.env.REACT_APP_AUTH0_EMAIL && <Dash/>}   
        {isAuthenticated && user.email !== process.env.REACT_APP_AUTH0_EMAIL && <UnAuth/>}  */}
         <Dash/>
      </ThemeProvider>
  );
}

export default App;
