import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useForm} from "react-hook-form"
import {participantregistration} from './connection'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Register_Participant_Form(props){
    const classes = useStyles()
    const {register,handleSubmit} = useForm({criteriaMode:"all"})
    /*const [Type, setType] = React.useState({
        Engineering: false,
        Medical: false,
        Management: false,
      });
    const [Degree, setDegree] = React.useState({
        Graduation: false,
        Post_Graduation: false,
        PHD: false,
        Diploma:false
    });
    */
    /*const error_type = [Type.Engineering,Type.Management,Type.Medical].filter((v) => v).length <1;
    const error_degree = [Degree.Diploma,Degree.Graduation,Degree.PHD,Degree.Post_Graduation].filter((v) => v).length <1;*/

    /*const handleChangeType = (event) => {
    setType({ ...Type, [event.target.name]: event.target.checked });
    };*/
    
    /*const handleChangeDegree = (event) => {
        setDegree({ ...Degree, [event.target.name]: event.target.checked });
        };*/
    const filterObject = (obj) =>{
        var temp = []
        for(let i in obj)
        {
            if(obj[i])
            {
                temp.push(i)
            }
        }
        return temp
    }
    const onSubmit=(e)=>{
        if(!error_type && !error_degree)
        {
            setOpen(true)
            setAopen({backdrop:true})
            /*e.type = filterObject(Type)
            e.degree = filterObject(Degree)*/
            participantregistration(e)
            .catch(error =>console.log(error))
            .then(e=>setAopen({backdrop:false,snackbar:true}))
            setTimeout(()=>props.history.replace({pathname:'/'}),5000) 
        }
    }

    const [open, setOpen] = React.useState(false);
    const [aopen, setAopen] = React.useState({backdrop:false,snackbar:false});

    return(
        <div className={classes.root}>
            <Paper className={classes.container} elevation={3}>
            <span><h1 className={classes.font}>Participant Registration</h1></span>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} style={{marginTop:"2%"}}>
                    <Grid item xs = {12}>
                        <span>Requested made by</span>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                        name="studentname"
                        required
                        inputRef={register}
                        id="outlined-required"
                        label="Student Name"
                        variant="outlined"
                        style={{width:"100%"}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                        required
                        name="rollno"
                        inputRef={register}
                        id="outlined-required"
                        label="Rollno"
                        variant="outlined"
                        style={{width:"100%"}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.grid}>
                        <TextField
                        required
                        inputRef={register}
                        name="year"
                        id="outlined-required"
                        label="Year"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.grid}>
                        <TextField
                        required
                        inputRef={register}
                        name="branch"
                        id="outlined-required"
                        label="Branch"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.grid}>
                        <TextField
                        required
                        inputRef={register}
                        name="clubname"
                        id="outlined-required"
                        label="Clubname"
                        variant="outlined"
                        />
                    </Grid>
                    
                    
                    
                    
                    
                    
                    <Grid item xs = {12} className={classes.grid}>
                        <Button variant="contained" color="primary" type="submit">
                            Send for authentication
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
            <Backdrop className={classes.backdrop} open={open}>
                {aopen.backdrop?<CircularProgress color="inherit" />:aopen.snackbar?
            <Snackbar open={aopen.snackbar} autoHideDuration={6000}>
                <Alert severity="success">
                Your request has been send for validation!
                </Alert>
            </Snackbar>:null}
            </Backdrop>
        </div>
    )
}