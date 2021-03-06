import React from 'react'
import {getparticipantregistrationform,deleteparticipantRegistration,approveparticipantRegistration} from './connection'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import {withRouter} from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) => ({
    root:{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        backgroundColor:"#ffcdd2"
    },
    container:{
        padding:"2%",
        marginTop:"4%",
        width:"50%",
        minWidth:"700px",
        [theme.breakpoints.down(700)]:{
            minWidth:"90% !important",
            minHeight:"500px",
            overflow:"scroll"
        },
        border:"2px black solid"
    },
    grid:{
        display:"flex",
        justifyContent:"center",
    },
    font:{
        fontSize:"3vw",
        [theme.breakpoints.down(700)]:{
            fontSize:"6vw"
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }
}))
function ValidationParticipationForm(props){

    const [body,setBody] = React.useState({})
    const classes = useStyles()
    const [open,setOpen] = React.useState(false)
    const [aopen,setAopen] = React.useState({approve:false,decline:false})
    
    const extractFormData=React.useCallback(async()=>{
        let id = props.match.params.id
        console.log("id",id)
        await getparticipantregistrationform(id)
        .catch(e=>{alert("Not Found")})
        .then(async(result)=>{
            console.log("ASD",result)
            if(result)
            {
                await setBody(result.data.result);
            }
        })
    },[props.match.params.id])


    React.useEffect(()=>{
        extractFormData()
    },[extractFormData])

    const onSubmit = async (word)=>{
        if(word === "decline")
        {
            deleteparticipantRegistration(props.match.params.id)
            setOpen(true);
            setAopen({decline:true})
            setTimeout(()=>props.history.replace({pathname:"/"}),5000)
        }
        else
        {
            await approveparticipantRegistration(props.match.params.id)
            .then(result=>{
                setOpen(true);
                setAopen({approve:true})
                setTimeout(()=>props.history.replace({pathname:"/"}),5000)
            })
            .catch(e=>alert(e))
        }
    }

    if(body === null || Object.keys(body).length === 0)
    {
        console.log("ASD",body)
        return(
            <div style={{display:"flex",justifyContent:"center"}}>
                <h1>NOT FOUND</h1>
            </div>
        )
    }
    else
    {
        console.log("id",body)
        return(
            <div className={classes.root}>
                <Paper className={classes.container} elevation={3}>
                <span><h1 className={classes.font}>Participant Registration</h1></span>
                    <Grid container spacing={2} style={{marginTop:"2%"}}>
                        {/* <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={body.collegename}
                            name="collegename"
                            id="outlined-required"
                            label="College Name"
                            variant="outlined"
                            style={{width:"100%"}}
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={body.studentname}
                            name="studentname"
                            id="outlined-required"
                            label="Student name"
                            variant="outlined"
                            style={{width:"100%"}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.grid}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={body.rollno}
                            name="rollno"
                            id="outlined-required"
                            label="Roll no"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.grid}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={body.year}
                            name="year"
                            id="outlined-required"
                            label="Year"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.grid}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={body.branch}
                            name="branch"
                            id="outlined-required"
                            label="Branch"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.grid}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={body.clubname}
                            name="clubname"
                            id="outlined-required"
                            label="Club Name"
                            variant="outlined"
                            />
                        </Grid>
                        {/* <Grid item xs = {6} sm = {6}>
                            <span><b>Type</b></span>
                            <List>
                            {body.type.map((value)=>{return(
                                <ListItem key={value}><span>{value}</span></ListItem>
                            )})}
                            </List>
                        </Grid> */}
                        
                        
                        
                        
                        <Grid item xs = {6} sm={6} className={classes.grid}>
                            <Button variant="contained" style={{backgroundColor:"red",color:"white"}} onClick={()=>onSubmit("decline")}>
                                Decline
                            </Button>
                        </Grid>
                        <Grid item xs = {6} sm={6} className={classes.grid}>
                            <Button variant="contained" style={{backgroundColor:"green",color:"white"}} onClick={()=>onSubmit("Approve")}>
                                Approve
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Backdrop className={classes.backdrop} open={open}>
                    {aopen.approve?<Snackbar open={aopen.approve} autoHideDuration={6000}>
                        <Alert severity="success">
                        Approved
                        </Alert>
                    </Snackbar>:aopen.decline?<Snackbar open={aopen.decline} autoHideDuration={6000}>
                        <Alert severity="error">
                        Declined
                        </Alert>
                    </Snackbar>:null}
                </Backdrop>
            </div>
        )
    }
}


export default withRouter(ValidationParticipationForm);