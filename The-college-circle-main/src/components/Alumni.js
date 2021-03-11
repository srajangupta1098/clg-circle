import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Form from './alumniForm'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import {getalumni} from './connection'

const useStyles = makeStyles((theme) => ({
    root:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    buttondesign:{
      display:'flex',
      border:"2px red green",
      marginTop:"2px",
    },
    card: {
        maxWidth: 345,
      },
    media: {
        height: 140,
      },
    company_card:{
        display:"flex",
        flexDirection:"row",
        marginTop:"4px",
        width:"100%",
        justifyContent:"space-evenly",
        justifyItems:"space-evenly"
    }
  }));
export default function Alumni(){

    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const addAlumni=()=>{
        var membertype = localStorage.getItem("membertype")
        if(membertype === 'Faculty')
        {
            setOpen(true)
        }
        else
        {
            alert("you are not authorized to add alumni")
        }
    }
    const [data,setData] = React.useState([])

    const getalumniData = React.useCallback(()=>{
        var collegename = localStorage.getItem("collegename")
        getalumni(collegename)
        .then(async(res)=>{
            // console.log("L",res)
            await setData(res.data.result)
        })
        .catch(err=>console.log(err))
    },[localStorage.getItem("collegename")])
    React.useEffect(()=>{
        getalumniData()
    },[getalumniData])

    return(
        <div className={classes.root}>
        <div className={classes.buttondesign}>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={()=>addAlumni()} 
              >
               Add Alumni
            </Button>
        </div>
        <div className={classes.company_card}>
            {data.map((value)=>{return(
            <Card key={value.imgName} className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={`http://localhost:3001/images/${value.imgName}`}
                    title={value.imgName}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {value.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {value.desc}
                    </Typography>
                    <Typography variant="body2" color="primary" component="h3">
                        {value.email}
                    </Typography>
                    <Typography variant="h4" color="textSecondary" component="h3">
                        {value.branch}
                    </Typography>
                    <Typography variant="h4" color="textSecondary" component="h3">
                        {value.batch}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            )})}
        </div>
        <Form open={open} setOpen={setOpen}/>
        </div>
    )
}