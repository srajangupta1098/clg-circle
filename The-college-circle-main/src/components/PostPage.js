import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {getpost} from './connection'
import Form from './Form'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

    main_content:{
      marginTop:'30px'
    },
    buttondesign:{
      display:'flex',
      border:"2px red green",
      marginTop:"2px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      root: {
        minWidth: 275,
        marginTop:"4px"
      },
  
  
  }));
export default function PostPage(){

    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [post,setPost]=React.useState([])
    const addpost=()=>{
       setOpen(true)
    }

    const getPost = React.useCallback(()=>{
        var collegename = localStorage.getItem("collegename")
        getpost(collegename)
        .then(async(res)=>{
            // console.log(res)
            setPost(res.data.result)})
        .catch((error)=>console.log("Error:",error))
    },[localStorage.getItem("collegname")])
    React.useEffect(()=>{
        getPost()
    },[getPost])

    return(
        <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
        <div className={classes.buttondesign}>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={()=>addpost()} 
              >
               Add
            </Button>
        </div>
        <div>
            <Grid container style={{display:"flex",flexDirection:"column",width:"1000px"}}>
                {post.map((value)=>{
                    var date = new Date(value.time).getHours()+":"+new Date(value.time).getMinutes()+":"+new Date(value.time).getSeconds()+" , "+new Date(value.time).getDate()+"/"+new Date(value.time).getMonth()+"/"+new Date(value.time).getFullYear()
                return (
                  <Card key={value.post} className={classes.root}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {value.type}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {value.post}
                      </Typography>
                    </CardContent>
                      <Divider/>
                    <CardActions>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}><span>{value.name}</span><span>{date}</span></div>
                    </CardActions>
                  </Card>
                  
                )})}
            </Grid>
            <Form open={open} setOpen={setOpen}/>
            </div>
        </div>
    )
}