import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// Params is a json file to define app address 'DNS'
import Params from './components/params';
// import globul functions from './functions.js'
import Fun from './functions';
// 'redirect' variable if equel to true that mean the user have permit else no have permit to pass
// 'loading' variable if equel equel to true mean checking permit action is ongoing and show loader icon else that action has been finished
export default function withoutLog(ComponentToProtect) {
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
      // this action is same as './withPermit' but with reverse meaning
      fetch(`${Params.originServer}/checkPermit/${Fun.getCookie('X-auth-token')}`)
        .then(res => res.json()).then(data=>{
          console.log(data)
          if (data.authorized === "valid token") { this.setState({ loading: false, redirect: true }); }
          else { this.setState({ loading: false, redirect: false }); }
        })
        .catch(err => { this.setState({ loading: false, redirect: true }); });
    }
    render() {
      const { loading, redirect } = this.state;
      let view = <img src={require('./assets/icons/loader.svg')} alt='loader' style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'4em',height:'4em'}}/>
      if (!loading) {
        if (redirect) { view = <Redirect to="/" /> }
        else { view = <ComponentToProtect {...this.props} /> }
      }
      return <React.Fragment>{ view }</React.Fragment>
    }
  }
}