import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Form from './companyForm'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import {getcompany} from './connection'

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
export default function Placement(){

    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const addCompany=()=>{
        var membertype = localStorage.getItem("membertype")
        if(membertype === 'Faculty')
        {
            setOpen(true)
        }
        else
        {
            alert("you are not authorized to add company")
        }
    }
    const [data,setData] = React.useState([])

    const getcompanyData = React.useCallback(()=>{
        var collegename = localStorage.getItem("collegename")
        getcompany(collegename)
        .then(async(res)=>{
            // console.log("L",res)
            await setData(res.data.result)
        })
        .catch(err=>console.log(err))
    },[localStorage.getItem("collegename")])
    React.useEffect(()=>{
        getcompanyData()
    },[getcompanyData])

    return(
        <div className={classes.root}>
        <div className={classes.buttondesign}>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={()=>addCompany()} 
              >
               Add Company
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
                    </CardContent>
                </CardActionArea>
            </Card>

            )})}
        </div>
        <Form open={open} setOpen={setOpen}/>
        </div>
    )
}