import React from 'react';
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

import {useForm} from 'react-hook-form'
import Avatar from '@material-ui/core/Avatar'
import {addClubById} from './connection'

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

  const {handleSubmit,register} = useForm()
  const [img,setImg] = React.useState({icon:"",file:""})

  const handleClose = () => {
    props.setOpen(false);
    setImg({icon:"",file:""})
  };

  const onSubmit = async(body) =>{
    // var collegename = localStorage.getItem("collegename")
    // body.collegename = collegename
    // body.file = img.file
    // console.log("KL:",body)
    // addcompany(body)
    // .then(res=>{
    //   alert("company saved")
    // handleClose()})
    // .catch(err=>alert("try again"))

    var formData=new FormData();
        
        formData.append('collegename',localStorage.getItem("collegename"))
        formData.append('eventname',body.eventname)
        formData.append('eventdesc',body.eventdesc)
        formData.append('venue',body.venue)
        formData.append('time',body.time)
        

        await addClubById(formData)
        .then(res=>{
          alert("event saved")
        handleClose()})
        .catch(err=>{alert("try again");console.log("Error:",err.response)})
  }

//   React.useEffect(()=>{
//       console.log("L:",pic)
//   },[pic])

  return (
    <div>
      <Dialog 
           onClose={handleClose} 
           TransitionComponent={Transition}
           aria-labelledby="customized-dialog-title" 
            open={props.open}
            className={classes.dialog}
        >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          SUBMIT 
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container direction="column" spacing={3} style={{width:'568px'}}>
            
            
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="eventname"
                variant="outlined"
                name="eventname"
                />
            </Grid> 
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="eventdesc"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="eventdesc"
                />
            </Grid>
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="venue"
                variant="outlined"
                name="venue"
                />
            </Grid>
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="time"
                variant="outlined"
                name="time"
                />
            </Grid>
            
        </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained"  color="secondary" type="submit">
            ADD Event
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
