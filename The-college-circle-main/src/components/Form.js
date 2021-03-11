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
import { classes } from 'istanbul-lib-coverage';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {addpost} from './connection'
import {useForm} from 'react-hook-form'

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
  const [type,setType] = React.useState('Club');

  const handleClose = () => {
    props.setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closemenu = (word) => {
    setAnchorEl(null);
    setType(word)
  };

  const onSubmit = (body) =>{
    var email = localStorage.getItem("email")
    var collegename = localStorage.getItem("collegename")
    body.email = email
    body.type=type
    body.collegename = collegename
    // console.log("KL:",body)
    addpost(body)
    .then(res=>{
      alert("post saved")
    handleClose()})
  }

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
            <Button aria-controls="simple-menu" variant="contained" aria-haspopup="true" onClick={handleClick}>
           Post type
            </Button>
             <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closemenu}
                >
                    <MenuItem onClick={()=>closemenu('Club')}>Club</MenuItem>
                    <MenuItem onClick={()=>closemenu('Placement')}>Placement</MenuItem>
                    <MenuItem onClick={()=>closemenu('General')}>General</MenuItem>
                </Menu>
            </Grid>
            <Grid item xs={12 }>
            <TextField
            inputRef={register}
                required
                id="outlined-required"
                label="Post"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="post"
                />
            </Grid>
        </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained"  color="secondary" type="submit">
            ADD Post
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
