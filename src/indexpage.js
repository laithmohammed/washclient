import React, { Component } from 'react';
import Index from './components/index';
import Selection from './components/selection';
// Params is a json file to define app address 'DNS'
import Params from './components/params';
// import globul functions from './functions.js'
import Fun from './functions';
// 'redirect' variable if equel to true that mean the user have permit else no have permit to pass
// 'loading' variable if equel equel to true mean checking permit action is ongoing and show loader icon else that action has been finished
export default function indexpage(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      // send 'X-auth-token' to server side to check if client side have been login
      fetch(`${Params.originServer}/checkPermit/${Fun.getCookie('X-auth-token')}`)
        .then(res => res.json()).then(data=>{
          if (data.authorized === "valid token") { this.setState({ loading: false, redirect: true }); } // if there are user account login, show selection clothes page './selection.js'
          else { this.setState({ loading: false, redirect: false }); } // if there aren't user account login, show index page './index.js'
        })
        .catch(err => { this.setState({ loading: false, redirect: true }); });
    }
    render() {
      const { loading, redirect } = this.state;
      let view = <img src={require('./assets/icons/loader.svg')} alt='loader' style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'4em',height:'4em'}}/>
      if (!loading) {
        if (redirect) { view = <Selection /> }
        else { view = <Index /> }
      }
      return <React.Fragment>{view}</React.Fragment>
    }
  }
}