import React, { useEffect } from 'react';
import { faUser, faEnvelope, faMap, faCalendar } from '@fortawesome/free-regular-svg-icons'
//import {getClubById} from './connection'
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Form from './eventForm'
import Forme from './Register_Participant_Form'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {getClubById,getevent} from './connection'
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
    const [eventdata,seteventData] = React.useState([])

    const getclubData = React.useRef(()=>{});

    getclubData.current = async() => {
        var collegename = localStorage.getItem("collegename")
        getClubById(collegename)
        .then(async(res)=>{
            await setData(res.data.result)
            geteventData(res.data.result[0].name);
        })
        .catch(err=>console.log(err));
    };

    const geteventData = (clubName) => {
        console.log("suvansh",clubName)
        getevent(clubName)
        .then(async(res)=>{
            console.log("suvansh_a",res)
            await seteventData(res.data.result)
        })
        .catch(err=>console.log(err))
    };

    const EventComponent = () => {
    return (<div>
    <Grid container style={{display:"flex",flexDirection:"column",width:"1000px"}}>
        <h1 style={{color:'blue'}}>List Of Events</h1>
        {eventdata.map((value)=>{
            return(
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',backgroundColor:'#FFFAA0',width:'900px',borderLeft:'10px solid red',padding:'30px',margin:'20px'}}>
                    
                    <span style={{marginBottom: '5px',fontSize: '32px',fontWeight: 700,}}>{value.eventname}</span>
                    <span>{value.eventdesc}</span>
                    <span><FontAwesomeIcon icon="clock"  />{value.time}</span>
                    <span><FontAwesomeIcon icon="map-marker-alt" />{value.venue}</span>
                    
                </div>
            )})}
    </Grid>
</div>)}
    
    useEffect(()=>{
        getclubData.current();
    },[])

    if(data.length === 0)
    {
        return <div>loading...</div>
    }
    else{
    return(
        <div id="clubDetails" style={{margin:"5%"}}>
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
                                <h1 style={{color:'blue'}}>Become the active member of the club</h1>
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
                            </div>
                            {eventdata?EventComponent():null}
                        </div>
                    </div>
                </div>
            </div>
            <Form clubName={data[0].name} open={open} setOpen={setOpen}/>
            <Forme aopen={aopen} setAopen={setAopen}/>
             
        </div>
    )
}
    
}
export default withRouter(Clubinfo)