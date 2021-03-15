import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getClubById} from './connection'
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Form from './eventForm'
import Form1 from './Register_Participant_Form'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {getClubById} from './connection'

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
        },
        club:{
            title:{
                marginBottom: '5px',
                fontSize: '32px',
                fontWeight: 700,
            },
            clubinfo:{
                marginBottom: '20px',
                fontWeight: 300,
                fontSize: '16px',
            
            span:{
                marginRight:'10px',
            },
            i:{
                marginRight:'2px',
            },
        },
        clubdescription:{
            fontWeight: 300,
            marginBottom: '30px',
        },
        },
    },
        
    

    
  }));


export default function Clubinfo(){
    
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
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
        setOpen(true)
    }

    const [data,setData] = React.useState([])

    const geteventData = React.useCallback(()=>{
        var clubid = localStorage.getItem("id")
        getClubById(clubid)
        .then(async(res)=>{
            // console.log("L",res)
            await setData(res.data.result)
        })
        .catch(err=>console.log(err))
    },[localStorage.getItem("clubid")])
    React.useEffect(()=>{
        geteventData()
    },[geteventData])

    return(
        <section id="clubDetails">
            <div className={classes.uppersection}>
                <div className="row">
                    <div className="col-md-6">
                    image={`http://localhost:3001/images/${data.imgName}`}
                    title={data.imgName}
                    </div>
                </div>
            </div>
            <div className={classes.detailsection}>
                <div className="row">
                    <div className="col-md-8">
                        <div className={classes.club}>
                            <h1 className={classes.title}>{data.name}</h1>
                            <div className={classes.clubinfo}>
                                <span><i className="fas fa-user">Faculty Head {data.facultyhead}</i></span>
                                <span><i className="fas fa-envelope-square">Faculty Email {data.facultyemail}</i></span>
                                <span><i className="fas fa-user">Student Head {data.studenthead}</i></span>
                                <span><i className="fas fa-users">Active Participants {data.participants}</i></span>
                            </div>
                            <p className={classes.clubdescription}>
                                {data.desc}
                                <br/>
                                {data.moredesc}
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
            <Form1 open={open} setOpen={setOpen}/>
        </section>
    )
    
}