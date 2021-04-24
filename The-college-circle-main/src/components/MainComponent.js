import React, { useEffect } from 'react'
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import FrontPage from './FrontPage';
import RCF from './Register_College_Form';

import RF from './Register_Form'
import LF from './Login'
import VCF from './validationform'
import UFP from './userfrontpage'
import Appbar from './Appbar'
import PostPage from './PostPage'
import Placement from './Placement'
import Alumni from './Alumni'
import Club from './Club'
import Clubinfo from './Clubinfo'

export default function Main(props){

    const [view,setView] = React.useState(null)

    const changeView = () =>{
        
        if(localStorage.getItem('email'))
        {
            setView(<Appbar changeView={changeView}/>)
            console.log("asdf")
        }
        else
        {
            setView(null);
        }
    }
    
    useEffect(() => {
        changeView()
    },[localStorage.length])

    return(
        <>
        {view}
        
        <Switch> 
            <Route exact path="/" component={() => <FrontPage changeView={changeView}/>}/>
            <Route exact path="/RegisterCollegeForm" component={RCF} history={props.history}/>
            
            <Route exact path="/RegisterForm" component={RF} history={props.history}/>
            <Route exact path ="/Login" component={() => <LF changeView={changeView}/>}/>
            <Route exact path="/validationform/:id" component={VCF} history={props.history}/>
            <Route exact path="/The_College_Circle" component={()=><PostPage changeView={changeView}/>} history={props.history} />
            <Route exact path="/The_College_Circle/Placement" component={Placement} history={props.history}/>
            <Route exact path="/The_College_Circle/Alumni" component={Alumni} history={props.history}/>
            <Route exact path="/The_College_Circle/Club" component={Club} history={props.history}/>
            <Route exact path="/The_College_Circle/Clubinfo/:id" component={Clubinfo} history={props.history}/>
         </Switch> 
        
    
    </>
    )
}