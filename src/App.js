import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withPermit from './withPermit';
// function that import from './withPermit' for check that user have been login before pass to target page
// withPermit finction for pages that required user account
import withoutLog from './withoutLog';
// function that import from './withoutLog' for check that user have not login before pass to target page
// withoutLog finction for pages that not required user account
import indexpage from './indexpage';
// function that import from './indexpage' return selection clothes page if we have login user account or welcome page if not
import Login from './components/login';
import Register from './components/register';
import Startup from './components/startup';
import Selection from './components/selection';
import GeoLocation from './components/location';
import Dashboard from './components/dashboard/index';
import Final from './components/final';
import Fun from './functions';


// main class for this front end application
// this class will render at ./index.js
class App extends Component {
  componentWillMount(){
    if(window.location.search.length > 20){
      let pathname = window.location.pathname;
      if(pathname === '/' || pathname === '/startup/'){
        let token = window.location.search.substring(1);
        Fun.setCookie('X-auth-token',token)
        window.location.search = ''
      }
    }
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path='/' component={indexpage()}/>
          <Route path='/login' component={withoutLog(Login)}/>
          <Route path='/register' component={withoutLog(Register)}/>
          <Route path='/startup' component={withPermit(Startup)}/>
          <Route path='/selection' component={withPermit(Selection)}/>
          <Route path='/location' component={withPermit(GeoLocation)}/>
          <Route path='/dashboard' component={withPermit(Dashboard)}/>
          <Route path='/final' component={withPermit(Final)}/>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
