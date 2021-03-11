import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import FrontPage from './FrontPage';
import RCF from './Register_College_Form';
import RF from './Register_Form'
import LF from './Login'
import VCF from './validationform'
import UFP from './userfrontpage'

export default function Main(props){


    return(
        <Router>
            <Route exact path="/" component={FrontPage} history={props.history}/>
            <div>
                <Route exact path="/RegisterCollegeForm" component={RCF} history={props.history}/>
                <Route exact path="/RegisterForm" component={RF} history={props.history}/>
                <Route exact path ="/Login" component={LF} history={props.history}/>
                <Route exact path="/validationform/:id" component={VCF} history={props.history}/>
                <Route exact path="/the_college_circle" component={UFP} history={props.history}/>
            </div>
        </Router>
    )
}