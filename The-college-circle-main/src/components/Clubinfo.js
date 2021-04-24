import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
//import {getClubById} from './connection'
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Form from './eventForm'
import Forme from './Register_Participant_Form'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {getClubById} from './connection'
import {withRouter} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: 275,
      backgroundColor: theme.palette.background.paper,
    },
    
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    buttondesign:{
        display:'flex',
        border:"2px red green",
        marginTop:"2px"
      },
    uppersection:{
        image:{
            width: '100%'
          },
      
          marginBottom: "30px",
    },
    detailsection:{
        primary:{
            palette:{
               main:'#fafafa'
            },
        }},
        club:{
        },
        
        title:{
            marginBottom: '5px',
            fontSize: '32px',
            fontWeight: 700,
        },
        
        clubdescription:{
            fontWeight: 300,
            marginBottom: '30px',
        },
        
        clubinfo:{
            marginBottom: '20px',
            fontWeight: 300,
            fontSize: '16px',
            display:'flex',
            flexDirection:'column',
    },
    iconButton:{
        display:'flex',
        justifyContent:'space-between',
        width:"30vw",
        textAlign:'left'
    }
  }));


function Clubinfo(){
    
    const classes = useStyles()
    
    const [open, setOpen] = React.useState(false)
    const [aopen, setAopen]= React.useState(false)
    const addEvent=()=>{
        var membertype = localStorage.getItem("membertype")
        if(membertype === 'Faculty')
        {
            setOpen(true)
        }
        else
        {
            alert("you are not authorized to add event")
        }
    }
     const apply=()=>{
        setAopen(true)
        
     }

    const [data,setData] = React.useState([])

    const getclubData = React.useCallback(()=>{
        var collegename = localStorage.getItem("collegename")
        getClubById(collegename)
        .then(async(res)=>{
            await setData(res.data.result)
            console.log("L",res)
        })
        .catch(err=>console.log(err))
    },[localStorage.getItem("collegename")])
    
    useEffect(()=>{
        getclubData()
    },[])

    if(data.length === 0)
    {
        return <div>loading...</div>
    }
    else{
    return(
        <section id="clubDetails">
            <div className={classes.uppersection}>
                <div className="row">
                    <div className="col-md-6">
                        <img src={`http://localhost:3001/images/${data[0].imgName}`} />
                        {/* title={data.imgName}*/}  
                    </div>
                </div>
            </div>
            <div className={classes.detailsection}>
                <div className="row">
                    <div className="col-md-8">
                        <div className={classes.club}>
                            <h1 className={classes.title}>{data[0].name}</h1>
                            <div className={classes.clubinfo}>
                                <span className={classes.iconButton}><FontAwesomeIcon icon={faUser}/>{data[0].facultyhead}</span>
                                <span className={classes.iconButton}><FontAwesomeIcon icon={faEnvelope}/>{data[0].facultyemail}</span>
                                <span className={classes.iconButton}><FontAwesomeIcon icon={faUser}/>Student Head {data[0].studenthead}</span>
                                {/* <span><i className="fas fa-users">Active Participants {data.participants}</i></span> */}
                            </div>
                            <p className={classes.clubdescription}>
                                {data[0].desc}
                                <br/>
                                {data[0].moredesc}
                            </p>
                            <hr />
                            <div style={{display:"flex", flexDirection:"column",width:"100%",alignItems:"center"}}>
                                <div className={classes.buttondesign}>
                                <Button 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={()=>apply()} 
                                    
                                    >
                                    Apply Club
                                </Button>
                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
                            <div className={classes.buttondesign}>
                                <Button 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={()=>addEvent()} 
                                    >
                                    Add Event
                                </Button>
                            </div>
                            <div>
                                <Grid container style={{display:"flex",flexDirection:"column",width:"1000px"}}>
                                    {data.map((value)=>{
                                        return(
                                            <div className={classes.root}>
                                                    <div className={classes.section1}>
                                                        <Grid container alignItems="center">
                                                        <Grid item xs>
                                                            <Typography gutterBottom variant="h4">
                                                            {value.eventname}
                                                            </Typography>
                                                        </Grid>
                                                        
                                                        </Grid>
                                                        <Typography color="textSecondary" variant="body2">
                                                        {value.eventdesc}
                                                        </Typography>
                                                    </div>
                                                    <Divider variant="middle" />
                                                    <div className={classes.section2}>
                                                        <Typography gutterBottom variant="body1">
                                                            <span><i className="fas fa-map-marker">{value.venue}</i></span>
                                                        </Typography>
                                                        <Typography gutterBottom variant="body1">
                                                            <span><i className="far fa-calendar">{value.time}</i></span>
                                                        </Typography>

                                                    </div>
                                            </div>
                                        )})}
                                </Grid>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Form open={open} setOpen={setOpen}/>
            <Forme aopen={aopen} setAopen={setAopen}/>
             
        </section>
    )
}
    
}
export default withRouter(Clubinfo)