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
import {addpost} from './connection'
import {useForm} from 'react-hook-form'
import Avatar from '@material-ui/core/Avatar'
import {addcompany} from './connection'

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
        formData.append('img',img.file)
        formData.append('collegename',localStorage.getItem("collegename"))
        formData.append('name',body.name)
        formData.append('desc',body.desc)
        await addcompany(formData)
        .then(res=>{
          alert("company saved")
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
            <Grid item xs={12} style={{display:"flex"}}>
                <div>
                    <Avatar alt="Remy Sharp" style={{height:"105%",width:"24%"}} src={img.icon}  className={classes.large}/>
                </div>
            </Grid>
            <Grid item xs ={12}>
                <input
                    accept="image/*"
                    id="text-button-file"
                    multiple
                    type="file"
                    onChange={(event)=>setImg({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
                    style={{display:"none"}}
                />
                <label htmlFor="text-button-file">
                        <Button variant="contained" color="primary" component="span">Browse</Button>
                </label>
            </Grid>
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="name"
                variant="outlined"
                name="name"
                />
            </Grid> 
            <Grid item xs={12 }>
            <TextField
                inputRef={register}
                required
                id="outlined-required"
                label="Desc"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="desc"
                />
            </Grid>
        </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained"  color="secondary" type="submit">
            ADD Company
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
