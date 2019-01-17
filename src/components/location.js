import React from 'react';
import GoogleMapReact  from 'google-map-react'
import Styled from 'styled-components';
import MenuBar from './menu'
import Params from './params';
import Fun from '../functions';

let TrackCon  = Styled.div	`position:absolute;top:16px;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:space-around;background-color:rgba(0,0,0,0.5);
															boder:1px solid #efefef;box-shadow:0px 0px 10px rgba(0,0,0,0.5);z-index:200;border-radius:6em;width:70%;max-width:26em;`;
let IconCon   = Styled.div  `border-radius:50%;padding:0.4em;margin:0.5em;background-color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;`
let Icon      = Styled.img  `width:3em;`

let Container = Styled.div 	`position:fixed;bottom:0em;left:0;width:96%;background-color:rgba(255,255,255,0.8);font-family: 'Noto Sans', sans-serif;margin:0;padding:1em 2%;z-index:200;`;
let TitleSpan = Styled.span `font-family: 'Signika', sans-serif;display:block;color:black;text-transform:capitalize;`;
let DayTimeCon= Styled.div  `overflow:scroll;display:flex;font-family: 'Noto Sans', sans-serif;margin:0;
                              &::-webkit-scrollbar { width:0px;background: transparent; }`;
let Time      = Styled.div  `background-color:#4d90fd;margin:0.2em 0;margin-right:0.3em;text-align:center;border-radius:0.5em;color:white;border:1px solid #0f75bc;padding:0.3em 0.5em;cursor:pointer;
															user-select: none;font-family: 'Noto Sans', sans-serif;font-size:1em;white-space:nowrap`;
let Day       = Styled.div 	`padding:0.4em;background-color:#4d90fd;font-size:1em;text-align:center;font-weight:bold;margin-right:0.3em;
															border-radius:0.5em;color:white;border:1px solid #0f75bc;cursor:pointer;user-select: none; `
let MonNum    = Styled.span `font-size:0.6em;padding-left:4px;white-space:nowrap`;
let DayNum    = Styled.span `width:40px;`;
let DayStr    = Styled.span `width:40px;`;
let AddressCon= Styled.div  `width:100%;display:flex;`
let Address   = Styled.input`padding:0.5em 2%;font-size:1.3em;border-radius:0.5em;border:unset;outline:none;display:flex;flex:1;margin:0.2em 0em;border:1px solid #4d90fd;`

let PlaceHold = Styled.img  `width:4em;transform: translate(-50%,-100%);
                              &:hover { cursor: default; }`;
let LaundryDiv= Styled.div  `background-color:red;transform: translate(-50%,-100%);`
let LaundryIcon = Styled.img  `width:4em;
                              &:hover { cursor: default; }`;
let LaundryName = Styled.span `white-space:nowrap;background-color:black;width:4em;transform: translateX(-100%);color:white;margin-bottom:4px;`

function InputForm(props){
// function return form that use by user to select time,date and address for pickup and delivery actions
/* props are : 
type                        => pickup or delivery that must be returned
times                       => array of pickup or delivery times
selectTime                  => string of pickup or delivery time
setTimeFun(e,props.type)    => function for set selectTime value 'pickupTime or deliveryTime within class state'
dates                       => array of pickup or delivery dates within income 30 days
selectDate                  => object of pickup or delivery date
setDateFun(e,props.type)    => function for set selectDate object 'pickupDate or deliveryDate within class state'
setAddressFun(e,props.type) => onclick over map foe set geo location for pickup or delivery actions 'pickupLoc or deliveryLoc'
addressVal                  => return deo location for pickup or delivery actions that have been selected
*/
  return(
  <React.Fragment>
    <TitleSpan>{props.type} time :</TitleSpan>
    <DayTimeCon>
        {props.times.map((time,i)=>{
          let choiceStyle = {}
          if (props.selectTime === time){ choiceStyle = {backgroundColor: '#13a892'} }
          return <Time key={i} style={choiceStyle} onClick={e=>props.setTimeFun(e,props.type)} title={i}>{time}</Time>
        })}
    </DayTimeCon>
    <TitleSpan>{props.type} date :</TitleSpan>
    <DayTimeCon>
        {props.dates.map((date,i)=>{
          let daynum = date.Day;
          if(daynum < 10){ daynum = '0'+daynum; }
          let choiceStyle = {}
          if (props.selectDate.Day === date.Day){ choiceStyle = {backgroundColor: '#13a892'} }
          return (
            <Day style={choiceStyle} key={i} title={i} onClick={e=>props.setDateFun(e,props.type)}>
              <DayNum title={i}>{daynum}</DayNum>
              <MonNum title={i}>/ {date.month}</MonNum><br/>
              <DayStr title={i}>{date.day}</DayStr>
            </Day>
          )
        })}
    </DayTimeCon>
    <TitleSpan>{props.type} Address :</TitleSpan>
    <AddressCon>
      <Address type='text' placeholder={`type your ${props.type} address`} dir='auto' onChange={e=>props.setAddressFun(e,props.type)} value={props.addressVal}/>
    </AddressCon>
  </React.Fragment>
  )
}
//this componetent for red icon over google map
const RedPlaceholder = () => <PlaceHold src={require('../assets/icons/placeholder.svg')} />;
const BlackPlaceholder = (props) => {
  return(
    <React.Fragment>
    <LaundryDiv>
      <LaundryName>{props.brandname}</LaundryName>
      <LaundryIcon src={require('../assets/icons/laundrylocation.svg')} />
    </LaundryDiv>
    </React.Fragment>
  )
};

class GeoLocation extends React.Component {
  constructor(){
		super();
		this.state = {
      Date    : [],
      Time    : ['10:00 AM - 12:00 PM','12:00 PM - 02:00 PM','02:00 PM - 04:00 PM','04:00 PM - 06:00 PM','06:00 PM - 08:00 PM','08:00 PM - 10:00 PM'],
      laundry : [],
      loclat  : 33.328109407837836,
      loclng  : 44.40894791680262,
      zoom    : 14,
      headerIcon      : [1,0.2,0.2],
      defaultForm     : 0,
      pickupTime      : '',
      pickupDate      : {year:'0000',month:'00',Day:'00'},
      pickupLoc       : { lat : 33.328109407837836, lng : 44.40894791680262  },
      pickupAddress   : '',
      deliveryTime    : '',
      deliveryDate    : {year:'0000',month:'00',Day:'00'},
      deliveryLoc     : { lat : 33.328109407837836,  lng : 44.40894791680262 },
      deliveryAddress : '',
      laundryName     : ''
		}
	}
	componentDidMount(){
    this.getDate()
    this.getLaundries()
  }
  // get all laundries locations over map as array of objects {lat : float,lng: float}
  getLaundries(){
    fetch(`${Params.originServer}/order/laundries/${Fun.getCookie('X-auth-token')}`)
    .then(res=>res.json()).then(data=>this.setState({laundry:data}))
  }
  // return date of income 30 days as array of objects {year:number, month:number, Day:number, day:string}
	getDate(){
		let now   = Date.now();
		let date  = [];
		let i     = 0;
		let set, time;
		let Days  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
		do{
			time = now + (24*60*60*1000*i);
			set = new Date(time)
			date.push({year : set.getFullYear(),month : set.getMonth()+1,day : Days[set.getDay()],Day : set.getDate(),time: time});
			i++;
		}while(i < 30)
		this.setState({Date : date})
  }
  // onclick over map this function return longtude and latitude of geolocation and set selected  longtude and latitude for pickupLoc or deliveryLoc
	setGeoLocation(x, y, lat, lng, event){
    this.setState({loclat : lat,loclng : lng})
    let objLoc = {lat : lat, lng : lng}
    if(this.state.defaultForm === 0){ this.setState({pickupLoc : objLoc}) }
    if(this.state.defaultForm === 1){ this.setState({deliveryLoc : objLoc}) }
  }
  // onclick over target times of InputForm this function set selected time for pickupTime or deliveryTime
  setTime(e,type){
    let index = e.target.title;
    let time  = this.state.Time;
    if(type === 'pickup'){ this.setState({pickupTime : time[index]}) }
    if(type === 'delivery'){ this.setState({deliveryTime : time[index]}) }
  }
  // onclick over target dates of InputForm this function set selected date for pickupDate or deliveryDate
  setDate(e,type){
    let index = e.target.title;
    let date  = this.state.Date;
    if(type === 'pickup'){ this.setState({pickupDate : date[index]}) }
    if(type === 'delivery'){ this.setState({deliveryDate : date[index]}) }
  }
  // onchange address input field value this function set pickupAddress or deliveryAddress
  setAddress(e,type){
    let address = e.target.value;
    if(type === 'pickup'){ this.setState({pickupAddress : address}) }
    if(type === 'delivery'){ this.setState({deliveryAddress : address}) }
  }
  setLaundry(e){
    localStorage.setItem('laundryName',e.target.value)
    this.setState({laundryName : e.target.value})
  }
  // this function return which data should be shown when client go nest step or back step
  setForm(){
    let form = [];
    form[0] = <InputForm type='pickup'    addressVal={this.state.pickupAddress}  selectTime={this.state.pickupTime}   selectDate={this.state.pickupDate}   times={this.state.Time} dates={this.state.Date} setTimeFun={this.setTime.bind(this)} setDateFun={this.setDate.bind(this)} setAddressFun={this.setAddress.bind(this)}  />
    form[1] = <InputForm type='delivery'  addressVal={this.state.deliveryAddress}selectTime={this.state.deliveryTime} selectDate={this.state.deliveryDate} times={this.state.Time} dates={this.state.Date} setTimeFun={this.setTime.bind(this)} setDateFun={this.setDate.bind(this)} setAddressFun={this.setAddress.bind(this)}  />
    form[2] = <React.Fragment>
                <TitleSpan>Laundry :</TitleSpan>
                  <AddressCon>
                    <Address type='text' placeholder={`type laundry name`} dir='ltr' onChange={this.setLaundry.bind(this)} defaultValue={this.state.laundryName}/>
                  </AddressCon>
              </React.Fragment>
    return form[this.state.defaultForm];
  }
  // onclick on next or back arrow steps this function show which action must be do
  changeForm(e){
    let index = this.state.defaultForm + parseInt(e.target.title);
    if(index > 3){ index = 3 }
    if(index < 0){ index = 0 }
    if(index === 0){ this.setState({defaultForm : 0 , loclat : this.state.pickupLoc.lat,loclng : this.state.pickupLoc.lng,headerIcon : [1,0.2,0.2]}) }
    if(index === 1){ this.setState({defaultForm : 1 , loclat : this.state.deliveryLoc.lat,loclng : this.state.deliveryLoc.lng,headerIcon : [1,1,0.2]}) }
    if(index === 2){ 
      localStorage.setItem('pickupTime'     ,this.state.pickupTime);
      localStorage.setItem('pickupDate'     ,JSON.stringify(this.state.pickupDate));
      localStorage.setItem('pickupLoc'      ,JSON.stringify(this.state.pickupLoc));
      localStorage.setItem('pickupAddress'  ,this.state.pickupAddress);
      localStorage.setItem('deliveryTime'   ,this.state.deliveryTime);
      localStorage.setItem('deliveryDate'   ,JSON.stringify(this.state.deliveryDate));
      localStorage.setItem('deliveryLoc'    ,JSON.stringify(this.state.deliveryLoc));
      localStorage.setItem('deliveryAddress',this.state.deliveryAddress);
      this.setState({defaultForm : 2 ,headerIcon : [1,1,1],zoom : 12});

    }
    if(index === 3){ //submit form with javascript
      let laundryName = localStorage.getItem('laundryName');
      let permit      = false;
      this.state.laundry.map((laundry)=>{ if(laundry.brandname === laundryName){permit = true; };return " ";})
      if(permit){
        let dataObj ={
          clothes         : localStorage.getItem('clothes'),
          pickupTime      : localStorage.getItem('pickupTime'),
          pickupDate      : localStorage.getItem('pickupDate'),
          pickupLoc       : localStorage.getItem('pickupLoc'),
          pickupAddress   : localStorage.getItem('pickupAddress'),
          deliveryTime    : localStorage.getItem('deliveryTime'),
          deliveryDate    : localStorage.getItem('deliveryDate'),
          deliveryLoc     : localStorage.getItem('deliveryLoc'),
          deliveryAddress : localStorage.getItem('deliveryAddress'),
          laundryName     : localStorage.getItem('laundryName'),
          token           : Fun.getCookie('X-auth-token')
        }
        let form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", `${Params.originServer}/order/neworder`);
        for(var key in dataObj) {
            if(dataObj.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", dataObj[key]);
                form.appendChild(hiddenField);
            }
        }
        document.body.appendChild(form);
        form.submit();
      }else{
        alert('please check laundry name is not valid !!')
      }
    }
  }
  //this function isn't worked if you done have ssl cert.
  //for get getlocation data permition from device of client
  getGeoLocation(e){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>{
        let objLoc = {lat : pos.coords.latitude, lng : pos.coords.longitude};
        if(this.state.defaultForm === 0){ this.setState({pickupLoc : objLoc,loclat : objLoc.lat, loclng : objLoc.lng}) }
        if(this.state.defaultForm === 1){ this.setState({deliveryLoc : objLoc,loclat : objLoc.lat, loclng : objLoc.lng}) }
      });
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  // this fuction return which data that should be see over google map when client go next step or back step 
  mapdata(){
    if(this.state.defaultForm === 0){ return <RedPlaceholder lat={this.state.loclat} lng={this.state.loclng} /> }
    if(this.state.defaultForm === 1){ return <RedPlaceholder lat={this.state.loclat} lng={this.state.loclng} /> }
    if(this.state.defaultForm === 2){console.log(this.state.laundry)
      let location = this.state.laundry.map((laundry,i)=>{
        return <BlackPlaceholder key={i} lat={laundry.location.latitude} lng={laundry.location.longitude} brandname={laundry.brandname}/>
      })
      return location
    }
  }
  render() {
		return (
			<React.Fragment>
				<TrackCon>
					<IconCon><Icon src={require('../assets/icons/schedulepickup.svg')} alt='pickup icon' style={{opacity : this.state.headerIcon[0]}}/></IconCon>
					<IconCon><Icon src={require('../assets/icons/fastdelivery.svg')} alt='delivery icon' style={{opacity : this.state.headerIcon[1]}}/></IconCon>
					<IconCon><Icon src={require('../assets/icons/checklist.svg')} alt='checked icon'  style={{opacity : this.state.headerIcon[2]}}/></IconCon>
				</TrackCon>
				<Container>
          <MenuBar />
					<Icon src={require('../assets/icons/nextarrow.svg')} alt='next icon' onClick={e=>this.changeForm(e)} title='1' style={{width:'3.8em',opacity:1,margin:'0.6em',right:'0',position:'absolute',marginTop:'-5.45em'}}/>
          <Icon src={require('../assets/icons/nextarrow.svg')} alt='back icon' onClick={e=>this.changeForm(e)} title='-1' style={{width:'3.8em',opacity:1,margin:'0.6em',left:'0',position:'absolute',marginTop:'-5.45em',transform:'rotateZ(180deg)'}}/>
          <Icon src={require('../assets/icons/compass.svg')} alt='compass icon' onClick={e=>this.getGeoLocation(e)} style={{width:'3.8em',opacity:1,margin:'0.6em',left:'0',position:'absolute',marginTop:'-10em'}}/>
          {this.setForm()}
				</Container>
				<div style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: 'AIzaSyCX1_2Dlr5a_GRbjCgwGup1EDb3jqVeOfc' }}
            defaultCenter={{lat : 33.328109407837836,lng : 44.40894791680262}}
            center={{lat : this.state.loclat,lng : this.state.loclng}}
						defaultZoom={this.state.zoom}
						onClick={({x, y, lat, lng, event})=>this.setGeoLocation(x, y, lat, lng, event)}
					>
						{this.mapdata()}
					</GoogleMapReact>
				</div>
			</React.Fragment>
			
		)
  }
}
export default GeoLocation;