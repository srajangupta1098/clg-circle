import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { classes } from 'istanbul-lib-coverage'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';
import {useForm} from 'react-hook-form'
import Avatar from '@material-ui/core/Avatar'
import {participantregistration} from './connection'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog:{
      width:'50%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(3),
  },
  large: {
    width: "34%",
    height: "105%",
  },
});
function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />; 
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function FormTable(props) {

  const {register,handleSubmit} = useForm()
  const handleClose = () => {
    setOpen(false)
    //setImg({icon:"",file:""})
  };

  const onSubmit = async(body) =>{
    var formData=new FormData();
        
        formData.append('collegename',localStorage.getItem("collegename"))
        formData.append('studentname',body.studentname)
        formData.append('rollno',body.rollno)
        formData.append('year',body.year)
        formData.append('branch',body.branch)
        formData.append('clubname',body.clubname)
        handleClose();
        setAopen({backdrop:true});
        await participantregistration(formData)
        .then(res=>{
          alert("participant need to wait")})
        .catch(err=>{alert("try again");console.log("Error:",err.response)})
        setAopen({backdrop:false})
        setAopen({snackbar:true})
        
  }
  // const { aopen, setAopen } = props
  const [open, setOpen] = React.useState(false);
  const [aopen, setAopen] = React.useState({backdrop:false,snackbar:false});

  useEffect(()=>{
    setOpen(props.aopen)
  },[props])

  return (
    <div>
      <Dialog 
           onClose={handleClose} 
           TransitionComponent={Transition}
           aria-labelledby="customized-dialog-title" 
            open={open}
            className={classes.dialog}
        >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Participant Registration
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container direction="column" spacing={3} style={{width:'568px'}}>
            
            
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="Student name"
                variant="outlined"
                name="studentname"
                />
            </Grid> 
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="Roll no"
                variant="outlined"
               
                name="rollno"
                />
            </Grid>
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="Year"
                variant="outlined"
                name="year"
                />
            </Grid>
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="Branch"
                variant="outlined"
                name="branch"
                />
            </Grid>
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="Clubname"
                variant="outlined"
                name="clubname"
                />
            </Grid>
            
        </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button  variant="contained"  color="primary" type="submit">
            Send for authentication
          </Button>
        </DialogActions>
        </form>
      </Dialog>
      <Backdrop className={classes.backdrop} open={aopen.backdrop}>
          <CircularProgress color="inherit" />
      </Backdrop>
        <Snackbar open={aopen.snackbar} autoHideDuration={6000}>
            <Alert severity="success">
                Your request has been send for validation
            </Alert>
        </Snackbar>
    </div>
  );
}
