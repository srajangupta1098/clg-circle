import React from 'react'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from "./Form"

const useStyles = makeStyles((theme) => ({
 
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,0.1)',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  paper:{
    padding:'50px 30px 55px',
    marginTop:'20px'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop:'30px'
  },
  main_content:{
    marginTop:'30px'
  },
  buttondesign:{
    display:'flex'
  }


}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function Cardpage() {

  const [open, setOpen] = React.useState(false);
  const addpost=()=>{
     setOpen(true)
  }
  const classes = useStyles();
    return (
      <>
        <div className="main_content">
          <div className="buttondesign">
              <Button 
                variant="contained" 
                color="secondary"
                onClick={()=>addpost()} 
                style={{marginTop:'20px',float:'right',marginRight:'30px'}}>
                 Add
              </Button>
          </div>    
            <Container maxWidth="lg" style={{marginTop:'30px'}}>
               {/* <Paper className={classes.paper}> */}
               <Grid container spacing={4}>
               
            {cards.map((card) => (
               <Grid item key={card} xs={12} sm={6} md={4}>
                 <Card className={classes.card}>
                 <CardMedia
                   className={classes.cardMedia}
                   image="https://source.unsplash.com/random"
                   title="Image title"
                 />
                 <CardContent className={classes.cardContent}>
                   <Typography gutterBottom variant="h5" component="h2">
                     Heading
                   </Typography>
                   <Typography>
                     This is a media card. You can use this section to describe the content.
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button size="small" color="primary">
                     View
                   </Button>
                   <Button size="small" color="primary">
                     Edit
                   </Button>
                 </CardActions>
               </Card>
               {/* <h1>SACHIN</h1> */}
             </Grid>
              ))}
              </Grid>
               {/* </Paper> */}
            </Container>
            <Form open={open} setOpen={setOpen}/>
        </div>
         <footer className={classes.footer}>
         <Typography variant="h6" align="center" gutterBottom>
           Footer
         </Typography>
         <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
           Something here to give the footer a purpose!
         </Typography>
       </footer>
       </>
    )
}

export default Cardpage
