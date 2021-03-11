import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {useForm} from "react-hook-form"
import {staffregistration} from './connection'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    root:{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        backgroundColor:"#ffcdd2"
    },
    container:{
        margin:"4%",
        padding:"2%",
        width:"50%",
        minWidth:"700px",
        [theme.breakpoints.down(700)]:{
            minWidth:"90% !important"
        },
        [theme.breakpoints.down(500)]:{
        overflow:"scroll",
        },
        border:"2px black solid"
    },
    grid:{
        display:"flex",
        justifyContent:"center"
    },
    font:{
        fontSize:"3vw",
        [theme.breakpoints.down(700)]:{
            fontSize:"6vw"
        }
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
        width:"100%"
      },
      backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        }
}))
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function Register_Form(props){
    const classes = useStyles()
    const {register,handleSubmit,errors,getValues} = useForm({criteriaMode:"all"})
    const [membertype,setMembertype] = React.useState("Student");
    const [collegename,setCollegeName] = React.useState();
    // const [list_college_name,setList_college_name] = React.useState([])
    const list_college_name = ["Japyee University Of Engineering And Technology","Lovely Professional University","Amity University"]

    const handleChangeCollegeName = (e) =>{
        setCollegeName(e.target.value)
    }

    const handleChangeMemberType = (e) =>{
        setMembertype(e.target.value)
    }

    const [aopen, setAopen] = React.useState({backdrop:false,snackbar:false});
    const [open,setOpen] = React.useState(false)

    const onSubmit = (e) =>{
        setOpen(true)
        setAopen({backdrop:true})
        delete e["confirmpassword"]
        e.membertype = membertype
        staffregistration(e)
        .catch(error=>{
            console.log(error)
            setAopen({backdrop:false})
        })
        .then(e=>{
            setAopen({backdrop:false,snackbar:true})
            setTimeout(()=>props.history.replace({pathname:'/'}),5000)
            })
    }

    const sameAs = (field, getValues) => (value) => {
        const compareTo = getValues()[field];
        return (compareTo === value?true:"Password does not match");
      }

    //   React.useEffect(()=>{
    //       getcollegename()
    //       .then(async(result)=>{console.log(result);await setList_college_name(result.data.result)})
    //       .catch(error=>console.log("error",error))
    //   })



    return(
        <div className={classes.root}>
            <Paper className={classes.container} elevation={3}>
            <span><h1 className={classes.font}>Registration</h1></span>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} style={{marginTop:"4%"}}>
                    <Grid item xs={4} sm={4}>
                        <TextField
                        inputRef={register({pattern: /^[A-Za-z]+$/i})}
                        name="firstname"
                        required
                        id="firstname"
                        label="Firstname"
                        variant="outlined"
                        />
                        {errors.firstname && errors.firstname.type==="pattern" && (<p style={{WebkitTextFillColor:"red"}}>Input is wrong</p>)}
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <TextField
                        inputRef={register({pattern: /^[A-Za-z]+$/i})}
                        name="middlename"
                        id="middlename"
                        label="Middlename"
                        variant="outlined"
                        />
                    </Grid>
                        {errors.middlename && errors.middlename.type==="pattern" && (<p style={{WebkitTextFillColor:"red"}}>Input is wrong</p>)}
                    <Grid item xs={4} sm={4}>
                        <TextField
                        required
                        inputRef={register({pattern: /^[A-Za-z]+$/i})}
                        name="lastname"
                        id="lastname"
                        label="Lastname"
                        variant="outlined"
                        />
                        {errors.lastname && errors.lastname.type==="pattern" && (<p style={{WebkitTextFillColor:"red"}}>Input is wrong</p>)}
                    </Grid>
                    <Grid item xs={12}>
                    <FormLabel component="legend" style={{fontWeight:"bold",WebkitTextFillColor:"black"}}>Member Type</FormLabel>
                    <RadioGroup ref={register} style={{display:"flex",flexDirection:"row"}} aria-label="Member_type" name="membertype" value={membertype} onChange={handleChangeMemberType}>
                        <FormControlLabel value="Student" control={<Radio />} label="Student" />
                        <FormControlLabel value="Faculty" control={<Radio />} label="Faculty" />
                    </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="college-name-required">College Name</InputLabel>
                            <Select
                            inputRef={register}
                            native
                            value={collegename}
                            onChange={handleChangeCollegeName}
                            name="collegename"
                            inputProps={{
                                id: 'college-name-required',
                            }}
                            >
                            <option aria-label="None" value="" />
                            {list_college_name.map((value)=>{return(
                                <option value={value} key={value}>{value}</option>
                            )})}
                            </Select>
                        </FormControl>  
                    </Grid>
                    <Grid item xs ={12} sm = {6}>
                        <TextField
                        name = "enrollmentno"
                        inputRef = {register}
                        required
                        id="enrollmentno"
                        label="Enrollment no"
                        variant="outlined"
                        className={classes.grid}
                        />
                    </Grid>
                    <Grid item xs ={12} sm = {6}>
                        <TextField
                        name = "email"
                        inputRef = {register({pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
                        required
                        id="email"
                        label="Email id"
                        variant="outlined"
                        className={classes.grid}
                        />
                        {errors.email && errors.email.type==="pattern" && (<p style={{WebkitTextFillColor:"red"}}>Input is wrong</p>)}
                    </Grid>
                    <Grid item xs ={12} sm = {6}>
                        <TextField
                        name = "password"
                        inputRef = {register({minLength:10})}
                        required
                        type="password"
                        id="password"
                        label="password"
                        variant="outlined"
                        className={classes.grid}
                        />
                        {errors.password && errors.password.type==="minLength" && (<p style={{WebkitTextFillColor:"red"}}>Atleast 10 in length</p>)}
                    </Grid>
                    <Grid item xs ={12} sm = {6}>
                        <TextField
                        name = "confirmpassword"
                        inputRef = {register({minLength:10,validate:{sameAs:sameAs('password',getValues)}})}
                        required
                        type="password"
                        id="confirm password"
                        label="confirm password"
                        variant="outlined"
                        className={classes.grid}
                        />
                        {errors.confirmpassword && errors.confirmpassword.type==="minLength" && (<p style={{WebkitTextFillColor:"red"}}>Atleast 10 in length</p>)}
                        {errors.confirmpassword && errors.confirmpassword.type==="sameAs" && (<p style={{WebkitTextFillColor:"red"}}>Password does not match</p>)}
                    </Grid>
                    <Grid item xs = {12} className={classes.grid}>
                        <Button type="submit" variant="contained" color="primary">
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
                You have been registered
                </Alert>
            </Snackbar>:null}
            </Backdrop>
        </div>
    )
}