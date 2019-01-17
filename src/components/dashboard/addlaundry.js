import React from 'react';
import Styled from 'styled-components'
import GoogleMapReact  from 'google-map-react'
import Params from '../params';

let AddIcon    = Styled.img   `width:4em;margin-bottom:1em;`
let InputField = Styled.input `width:calc(100% - 2em);max-width:24em;padding:0.4em 1em;backgroundcolor:#151d20;border:1px solid #0078ff;border-radius:4px;
                                font-size:1.1em;font-family: 'Noto Sans', sans-serif;margin-bottom:0.8em;outline:none;`
let TextSpan   = Styled.span  `font-size:1.3em;font-family: 'Noto Sans', sans-serif;color:white;`;
let PlaceHold  = Styled.img   `width:4em;transform: translate(-50%,-100%);`;
let Submit     = Styled.span  `color:white;padding:1em 2.4em;font-size:1em;font-family: 'Noto Sans', sans-serif;background-color:#0078ff;
                                white-space:nowrap;margin:2em 0;border-radius:4px;cursor:pointer;float:right;`
let ErrorSpan  = Styled.span  `color:red;font-family: 'Noto Sans', sans-serif;font-size:12px;`

const AnyReactComponent = () => <PlaceHold src={require('../../assets/icons/placeholder.svg')} />;

const Error = [
  'brandname isn\'t available,try another one',
  'username isn\'t available,try another one',
  'your Phone is linked with other account, try another one',
  'your Email is linked with other account, try another one',
  'your password length must be more than 8 characters',
  'your password length must be less than 30 characters',
  'your password confirm isn\'t matched ',
  'set laundry location'
];

class AddLaundry extends React.Component {
  constructor(){
    super();
    this.state = {
      brandname     : '',
      brandnameUniq : undefined,
      username      : '',
      usernameUniq  : undefined,
      phone         : '',
      phoneUniq     : undefined,
      email         : '',
      emailUniq     : undefined,
      password      : '',
      repassword    : '',
      latitude      : 33.328109407837836,
      latitudeUniq  : undefined,
      longitude     : 44.40894791680262,
      longitudeUniq : undefined,
      permitKey     : 0 ,
      error         : []
    }
  }
  setData(e){
    switch (e.target.name) {
      case 'brandname' : this.setState({brandname  : e.target.value});this.setState({brandnameUniq  : undefined});this.fetchData('checkUniqBrandName',e.target.value,0);break;
      case 'username'  : this.setState({username   : e.target.value});this.setState({usernameUniq   : undefined});this.fetchData('checkUniqUsername',e.target.value,1);break;
      case 'phone'     : this.setState({phone      : e.target.value});this.setState({phoneUniq      : undefined});this.fetchData('checkUniqPhone',e.target.value,2);break;
      case 'email'     : this.setState({email      : e.target.value});this.setState({emailUniq      : undefined});this.fetchData('checkUniqEmail',e.target.value,3);break;
      case 'password'  : this.setState({password   : e.target.value});break;
      case 'repassword': this.setState({repassword : e.target.value});break;
      default:break;
    }
  }
  setUniq(path,val){ 
    if(path === 'checkUniqBrandName'){ this.setState({brandnameUniq : val }); }
    if(path === 'checkUniqUsername'){ this.setState({usernameUniq : val }); }
    if(path === 'checkUniqPhone'){ this.setState({phoneUniq : val }); }
    if(path === 'checkUniqEmail'){ this.setState({emailUniq : val }); }
  }
  pushError(errIndex){
    let error = this.state.error;
    error.push(errIndex);
    this.setState({ error : error });
    // console.log(this.state.error)
  }
  removeError(errIndex){
    let error = this.state.error;
    let index = error.indexOf(errIndex);
    let newArr = [];
    for (let i = 0; i < error.length; i++) {
      if(i !== index ){ newArr.push(error[i]) } 
    }
    this.setState({ error : newArr });
  }
  fetchData(path,dataFom,errIndex){
    fetch(`${Params.originServer}/order/${path}/${dataFom}`)
    .then(res => res.json()).then(data=>{
      if(data.valid === true){ this.setUniq(path,true);this.removeError(errIndex); }
      else{ if(this.state.error.indexOf(errIndex) === -1){this.pushError(errIndex)};this.setUniq(path,false); }
    })
  }
  submitingCheck(e){
    let permitKey = 0;
    if(!this.state.brandnameUniq){ if(this.state.error.indexOf(0) === -1){this.pushError(0)}; }else{ permitKey++;this.removeError(0); }
    if(!this.state.usernameUniq){ if(this.state.error.indexOf(1) === -1){this.pushError(1)}; }else{ permitKey++;this.removeError(1); }
    if(!this.state.phoneUniq){ if(this.state.error.indexOf(2) === -1){this.pushError(2)}; }else{ permitKey++;this.removeError(2); }
    if(!this.state.emailUniq){ if(this.state.error.indexOf(3) === -1){this.pushError(3)}; }else{ permitKey++;this.removeError(3); }
    if(this.state.password.length < 8) { if(this.state.error.indexOf(4) === -1){this.pushError(4)}; }else{ permitKey++;this.removeError(4); }
    if(this.state.password.length > 30) { if(this.state.error.indexOf(5) === -1){this.pushError(5)}; }else{ permitKey++;this.removeError(5); }
    if(this.state.password !== this.state.repassword) {if(this.state.error.indexOf(6) === -1){this.pushError(6)}; }else{ permitKey++;this.removeError(6); }
    if(!this.state.latitudeUniq || !this.state.longitudeUniq){ if(this.state.error.indexOf(7) === -1){this.pushError(7)}; }else{ permitKey++;permitKey++;this.removeError(7); }
    if(permitKey !== 9){ e.preventDefault(); }
    console.log(this.state.error)
  }
  render() {
    return (
      <React.Fragment>
        <form action={`${Params.originServer}/order/addlaundry`} method='post' onSubmit={this.submitingCheck.bind(this)}>
          <AddIcon src={require('../../assets/icons/orderaddcustomer.svg')} alt='add icon'/><br/>
          <InputField type='text' placeholder='Laundry name' name='brandname' defaultValue={this.state.brandname} onChange={this.setData.bind(this)}/><br/>
          <InputField type='text' placeholder='Username' name='username' defaultValue={this.state.username} onChange={this.setData.bind(this)}/><br/>
          <InputField type='text' placeholder='Phone number' name='phone' defaultValue={this.state.phone} onChange={this.setData.bind(this)}/><br/>
          <InputField type='text' placeholder='Email' name='email' defaultValue={this.state.email} onChange={this.setData.bind(this)}/><br/>
          <InputField type='password' placeholder='Password' name='password' defaultValue={this.state.password} onChange={this.setData.bind(this)}/><br/>
          <InputField type='password' placeholder='Confirm' name='repassword' defaultValue={this.state.repassword} onChange={this.setData.bind(this)}/><br/>
          <InputField type='hidden' name='latitude'  defaultValue={this.state.latitude} />
          <InputField type='hidden' name='longitude' defaultValue={this.state.longitude}/>
          <TextSpan>Location :</TextSpan>
          <div style={{ height: '20em', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCX1_2Dlr5a_GRbjCgwGup1EDb3jqVeOfc' }}
              defaultCenter={{lat : 33.328109407837836,lng : 44.40894791680262}}
              center={{lat : this.state.latitude,lng : this.state.longitude}}
              defaultZoom={13}
              onClick={({x, y, lat, lng, event})=>this.setState({ latitude : lat, longitude : lng ,latitudeUniq : lat, longitudeUniq : lng})}
            >
              <AnyReactComponent lat={this.state.latitude} lng={this.state.longitude} />
            </GoogleMapReact>
          </div>
          <InputField type='submit' id='submit' name='submit' style={{display:'none'}}/>
          <div>{this.state.error.map((err,i)=>{
              return <React.Fragment  key={i} ><ErrorSpan>* {Error[err]}</ErrorSpan><br/></React.Fragment>
            })}</div>
          <label htmlFor='submit'><Submit>Submit</Submit></label>
        </form>
      </React.Fragment>
    );
  }
}
export default AddLaundry;
