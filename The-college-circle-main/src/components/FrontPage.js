import React from 'react';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx';

const useStyles = makeStyles((theme)=>({
    conatiner:{
        height:"100vh",
        backgroundImage:"url(../../background_4.jpg)",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat"
    },
    title_row:{
        height:"10%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f44336",
        opacity:".9",
        WebkitTextFillColor:"white"
    },
    body_row:{
        height:"90%",
        display:"flex",
        flexDirection:"row",
    },
    row:{
        height:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    hover:{
        "&:hover":{
            backgroundColor:"#ffcdd2",
            cursor:"pointer",
            opacity:"0.8",
            WebkitTextFillColor:"red"
        }
    },
    column:{
        display:"flex",
        height:"100%",
        width:"50%",
        flexDirection:"column",
        justifyContent:"center",
        fontSize:"3vw",
        [theme.breakpoints.down(705)]:{
            fontSize:"5vw",
        }
    },
    
}))
function FrontPage(props){
    const classes = useStyles()
    const changePage=(form)=>{
        if(form === "RCF")
        {
            props.history.push({pathname:"/RegisterCollegeForm"})
        }
        else if(form === "LP")
        {
            props.history.push({pathname:"Login"})
        }
        else
        {
            props.history.push({pathname:"/RegisterForm"})
        }
    }
    const combined_class = clsx(classes.row,classes.hover)
    return(
        <div className={classes.conatiner}>
            <div className={classes.title_row}>
                <span>
                    <h1>The College Circle</h1>
                </span>
            </div>
            <Divider />
            <div className={classes.body_row}>
                <div className={clsx(classes.column,classes.hover)} onClick={()=>changePage("RCF")}>
                    <span style={{alignSelf:"center"}}>Register College</span>
                </div>
                <Divider orientation="vertical" flexItem/>
                <div className={classes.column}>
                    <div className={combined_class} onClick={()=>changePage("RF")}>Register</div>
                    <Divider/>
                    <div className={combined_class} onClick={()=>changePage("LP")}>Login</div>
                </div>
            </div>
        </div>
    )
}
export default FrontPage;