import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import loadable from '@loadable/component'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PanoramaIcon from '@material-ui/icons/Panorama';
import BrushIcon from '@material-ui/icons/Brush';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HistoryIcon from '@material-ui/icons/History';
import { Typography, Drawer,Divider  } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {useSetAccessToken} from "../../Domain/useCases"
import {useAuth0} from "@auth0/auth0-react"

const appBarHeight = 65
const Nav = loadable(() => import('../../Components/Nav'))
const Home = loadable(() => import('../Home/Home'))
const Associados = loadable(() => import('../Associados/Associados'))
const Slider = loadable(() => import('../Slider/Slider'))
const Ateliers = loadable(() => import('../Ateliers/Ateliers'))
const Eventos = loadable(() => import('../Eventos/Eventos'))
const Historia = loadable(() => import('../Historia/Historia'))
const JoinUs = loadable(() => import('../JoinUs/JoinUs'))
const ManageSlider = loadable(() => import('../ManageSlider/ManageSlider'))
const ManageAteliers = loadable(() => import('../ManageAteliers/AteliersForm'))
const ManageEventos = loadable(() => import('../ManageEventos/ManageEventos'))
const ManageHistoria = loadable(() => import('../ManageHistoria/ManageHistoria'))

const Dash = ()=> {
    const [hideMenu, setHideMenu] = React.useState(true) 
    const closeMenu = ()=> setHideMenu(true)
    const {  getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = React.useState(null) 


    const history = React.useMemo(() => {
        return createBrowserHistory()
      }, [])
   
      React.useEffect(() => {
        return history.listen(()=>{
          window.scrollTo(0,0)
        })  
      }, [ history])

     React.useEffect(()=>{
        const setAccessTokenFun = async () => {        
            try {
                const access_token = await getAccessTokenSilently();
                setAccessToken(access_token)
            } catch (e) {
              console.log(e.message);
            }
          };
          setAccessTokenFun()
     }, [])
     
     
    useSetAccessToken(accessToken) 
    return (
         <BrowserRouter history={history}>
            <Drawer
                variant="persistent"
                anchor="left"
                open={!hideMenu}
                className="drawerContainer">
                    <div className="drawerHeader">
                        <Typography variant="h4">AGIRAR</Typography>
                        <IconButton onClick={closeMenu}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="navListContainer">
                        <ul>
                            <li onClick={closeMenu}>
                                <Link to="/admin">
                                    <DashboardIcon/>
                                     Dashboard
                                </Link>
                            </li>
                            <li onClick={closeMenu}>
                                <Link to="/associados">
                                    <AccountCircleIcon/>
                                      Associados
                                </Link>
                            </li>
                            <li onClick={closeMenu}>
                                <Link to="/slider">
                                    <PanoramaIcon/>
                                      Slider
                                </Link>
                            </li>
                            <li onClick={closeMenu}>
                                <Link to="/ateliers">
                                    <BrushIcon/>
                                      Ateliers
                                </Link>
                            </li>
                            <li onClick={closeMenu}>
                                <Link to="/eventos">
                                    <CalendarTodayIcon/>
                                      Eventos
                                </Link>
                            </li>
                            <li onClick={closeMenu}>
                                <Link to="/historia">
                                    <HistoryIcon/>
                                      História
                                </Link>
                            </li>
                        </ul>
                    </div>
            </Drawer>
            <Nav hideMenu={hideMenu} setHideMenu={setHideMenu} height={appBarHeight}/>
            <div onClick={closeMenu} className={hideMenu?"blck hide": "blck"}></div>
            
            <main  style={{marginTop: appBarHeight}}>
              <Switch>
                <Route path="/admin" exact component={Home} />
                <Route path="/associados" exact component={Associados} />
                <Route path="/associados/register" exact component={JoinUs} />
                <Route path="/associados/register/:id" exact component={JoinUs} />
                <Route path="/slider" exact component={Slider} />
                <Route path="/slider/form" exact component={ManageSlider} />
                <Route path="/slider/form/:id" exact component={ManageSlider} />
                <Route path="/ateliers" exact component={Ateliers} />
                <Route path="/ateliers/form" exact component={ManageAteliers} />
                <Route path="/ateliers/form/:id" component={ManageAteliers}/> 
                <Route path="/eventos" exact component={Eventos} />
                <Route path="/eventos/form" exact component={ManageEventos} />
                <Route path="/eventos/form/:id"  component={ManageEventos}/> 
                <Route path="/historia" exact component={Historia} />
                <Route path="/historia/form" exact component={ManageHistoria} />
                <Route path="/historia/form/:id"  component={ManageHistoria}/> 
                <Route path="/*" render={() => <Redirect to="/admin" />} />
              </Switch>
            </main>
            {/* <Footer /> */}
        </BrowserRouter>
    )
}
export default  Dash