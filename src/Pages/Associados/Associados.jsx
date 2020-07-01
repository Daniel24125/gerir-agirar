import React from 'react'
import {useGetUsers} from "../../Domain/useCases"
import {Paper, Typography, IconButton,Menu ,MenuItem, Button} from "@material-ui/core"
import { Skeleton } from '@material-ui/lab'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'

const Associados = () => {
    const {
        data: users,
        status: usersStatus
      } = useGetUsers()

    const isLoading = React.useMemo(() => {
        return usersStatus === 'loading'  
        }, [usersStatus])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userID, setUserID] = React.useState(null);
    const [showDetails, setShowDetails] = React.useState(false);
    
    const handleClick = (event) => {
        setUserID(event.currentTarget.id)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

   

    const deleteUser = () => {
        delete users[userID]
        handleClose()
    };

    const viewDetails = e => {
        setShowDetails(true)
        handleClose()
    };

    const getFreqPagamentoText = freq =>{
        return freq === "Trimestral"? "trimestralmente": freq === "Semestral"? "semestralmente": "anualmente"
    }

    return (
        <div className="userListContainer">
            <Paper className="userTableContainer"  elevation={1}>
                <div className="tableHeaderContainer">
                    <Typography color="primary" variant="h5"> LISTA DE ASSOCIADOS</Typography>
                    <Button color="secondary"><Link to="/associados/register">Registar manualmente</Link></Button>
                </div>
                <ul>
                   
                {isLoading && <>
                        <li>
                        <Skeleton width={40} height={40} variant="circle" />
                        <div className="infoContainer">
                            <Skeleton style={{marginBottom: 5}}variant="rect" width={100} height={10} />
                            <Skeleton variant="rect" width={50} height={10} />
                        </div>
                    </li>
                    <li>
                        <Skeleton width={40} height={40} variant="circle" />
                        <div className="infoContainer">
                            <Skeleton style={{marginBottom: 5}}variant="rect" width={100} height={10} />
                            <Skeleton variant="rect" width={50} height={10} />
                        </div>
                    </li>
                    <li>
                        <Skeleton width={40} height={40} variant="circle" />
                        <div className="infoContainer">
                            <Skeleton style={{marginBottom: 5}}variant="rect" width={100} height={10} />
                            <Skeleton variant="rect" width={50} height={10} />
                        </div>
                    </li>
                    </>}
                    {!isLoading && Object.keys(users).length === 0 && <>
                        <Typography>Não existe nenhum registo de associados</Typography>
                    </>}
                    {!isLoading  && <>
                        {Object.keys(users).map(key=>{
                            return (
                                <li className="user"> 
                                    <div className="accountContainer">
                                        <div className="iconContainer">
                                            <Typography variant="h6"> {users[key].nome[0].toUpperCase()}</Typography>
                                        </div>
                                        <div className="infoContainer">
                                            <Typography color="primary" variant="body1">{users[key].nome} </Typography>
                                            <Typography variant="caption">{users[key].email} </Typography>
                                        </div>
                                    </div>
                                    <div className="optionsContainer">
                                        <IconButton id={key} onClick={handleClick}>
                                            <MoreVertIcon/>
                                        </IconButton> 
                                    </div>
                                </li>
                            )
                        })}
                    </>}
                </ul>
            </Paper>
           { !isLoading && showDetails && <div className="userCardContainer">
                <div className="blck"></div>
                <Paper className="userCard" elevation={3}>
                        <div className="userCardHeader">
                            <div className="iconContainer">
                                <Typography variant="h6"> {users[userID].nome[0].toUpperCase()}</Typography>
                            </div>
                            <Typography color="inherit" variant="h6">{users[userID].nome} </Typography>
                            <Typography variant="caption">{users[userID].dataNascimento} </Typography>
                        </div>
                        <div className="userInfoContainer">
                            <Typography variant="body2">
                                O sr(a) {users[userID].nome} está neste momento a pagar <strong style={{color: "#00A4DD"}}>{users[userID].contribuicao}€</strong> <strong style={{color: "#E9523E"}}>{getFreqPagamentoText()} </strong> através de <strong style={{color: "#FF8600"}}>{users[userID].modoPagamento}</strong> {users[userID].nib !== ""? `com o NIB: ${users[userID].nib}`: ""}
                            </Typography>
                            <div className="userInfo">
                               <div className="infoContainer">
                                   <Typography className="title"  variant="caption">Telefone</Typography>
                                   {users[userID].telefone}
                               </div>
                               <div className="iconContainer">
                                    <PhoneIcon/>
                               </div>
                            </div>
                            <div className="userInfo">
                               <div className="infoContainer">
                                   <Typography className="title"  variant="caption">Email</Typography>
                                   {users[userID].email}
                               </div>
                               <div className="iconContainer">
                                    <EmailIcon/>
                               </div>
                            </div>
                            <div className="userInfo">
                               <div className="infoContainer">
                                   <Typography className="title" variant="caption">Morada</Typography>
                                   {`${users[userID].morada}, ${users[userID].codPostal} ${users[userID].localidade}`}
                               </div>
                               <div className="iconContainer">
                                    <HomeIcon/>
                               </div>
                            </div>
                            <div className="footerContainer">
                                <Button color="primary" onClick={()=>setShowDetails(false)}>Fechar</Button>
                            </div>
                        </div>
                </Paper>
            </div>}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <MenuItem  onClick={viewDetails}> <span className="details">DETALHES </span> </MenuItem>
                <MenuItem  onClick={handleClose}> <Link to={`/associados/register/${userID}`}  className="edit">EDITAR </Link> </MenuItem>
                <MenuItem  onClick={deleteUser}> <span className="delete">APAGAR </span> </MenuItem>
            </Menu>
        </div>
    )
}
export default  Associados