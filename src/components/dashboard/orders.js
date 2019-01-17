import React from 'react';
import Styled from 'styled-components'
import Params from '../params';

let Header      = Styled.div    `display:flex;align-items:center;justify-content:space-between;height:6em;min-width:82em;`
let AddIcon     = Styled.img    `width:4em;margin-bottom:1em;`
let SearchCon   = Styled.div    `width:24em;background-color:#151d20;border-radius:4em;display:flex;align-items:center;justify-content:center;height:3em;`
let SearchIcon  = Styled.img    `width:2em;margin:0 1em;`;
let SearchInput = Styled.input  `border:unset;background-color:#151d20;color:white;font-size:1.4em;font-family: 'Noto Sans', sans-serif;display:flex;flex:1;margin-right:1em;outline:none;`;
let SelectCon   = Styled.div    `display:flex;align-items:center;justify-content:flex-start;border-bottom:2px solid white;min-width:82em;`;
let SelectTag   = Styled.select `outline:none;background-color:#262f32;font-size:1.2em;font-family: 'Noto Sans', sans-serif;color:#5b646f;border:unset;border-right:1px solid #5b646f;`
let OptionTag   = Styled.option ``
let PaddingDiv  = Styled.div    `padding-right:4em;`
let UserCon     = Styled.div    `display:flex;align-items:center;justify-content:flex-start;border-bottom:1px solid #5b646f;height:4em;min-width:82em;`;
let UserNameCon = Styled.div    `display:flex;align-items:center;justify-content:flex-start;flex:2.4;min-width:18em;`;
let UserImg     = Styled.img    `width:2em;border-radius:50%;margin:0 1em;`
let Username    = Styled.span   `font-size:1.2em;font-family: 'Noto Sans', sans-serif;color:white;`;
let LaundryCon  = Styled.div    `display:flex;align-items:center;justify-content:flex-start;flex:2;min-width:15em;`;
let LaundryName = Styled.span   `font-size:1.2em;font-family: 'Noto Sans', sans-serif;color:#5b646f;`;
let StatusCon   = Styled.div    `display:flex;align-items:center;justify-content:flex-start;flex:1;min-width:7.5em;`;
let StatusName  = Styled.span   `font-size:1.2em;font-family: 'Noto Sans', sans-serif;color:#5b646f;`;
let ActivityCon = Styled.div    `display:flex;align-items:center;justify-content:flex-start;flex:1.5;min-width:11.25em;`;
let ActivityName= Styled.span   `font-size:1.2em;font-family: 'Noto Sans', sans-serif;color:#5b646f;`;
let QuantityCon = Styled.div    `display:flex;align-items:center;justify-content:flex-start;flex:1.5;min-width:11.25em;`;
let QuantityName= Styled.span   `font-size:1.2em;font-family: 'Noto Sans', sans-serif;color:#5b646f;`;
let DetailsIcon = Styled.img    `width:2em;padding:0 1em;cursor:pointer;`


class Orders extends React.Component {
  constructor(){
    super();
    this.state = {
      data    : []
    }
  }
  componentDidMount(){
    this.getData()
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(window.document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  getData(){
    fetch(`${Params.originServer}/order/feed/${this.getCookie('X-auth-token')}`)
    .then(res=>res.json()).then(data=>{
      this.setState({data : data})
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header>
          <AddIcon src={require('../../assets/icons/orderstate.svg')} alt='add icon'/>
          <SearchCon>
            <SearchIcon src={require('../../assets/icons/ordersearch.svg')} alt='search icon'/>
            <SearchInput type='text' placeholder='type your topic ...' defaultValue=''/>
          </SearchCon>
        </Header>
        <SelectCon>
          <SelectTag name="customers" style={{flex:2.4,minWidth:'18em'}}>
            <OptionTag value="" defaultValue>Customers</OptionTag>
            <OptionTag value="1">A - Z</OptionTag>
            <OptionTag value="2">Z - A</OptionTag>
          </SelectTag>
          <SelectTag name="laundries" style={{flex:2,minWidth:'15em'}}>
            <OptionTag value="" defaultValue>Laundries</OptionTag>
            <OptionTag value="1">Dream wash</OptionTag>
            <OptionTag value="2">Wash me</OptionTag>
            <OptionTag value="2">Superwash</OptionTag>
            <OptionTag value="2">La La wash</OptionTag>
          </SelectTag>
          <SelectTag name="status" style={{flex:1,minWidth:'7.5em'}}>
            <OptionTag value="" defaultValue>Status</OptionTag>
            <OptionTag value="2">Completed</OptionTag>
            <OptionTag value="1">Ongoing</OptionTag>
            <OptionTag value="2">Canceled</OptionTag>
          </SelectTag>
          <SelectTag name="activity" style={{flex:1.5,minWidth:'11.25em'}}>
            <OptionTag value="" defaultValue>Activity</OptionTag>
            <OptionTag value="1">11-Jan-2019</OptionTag>
            <OptionTag value="2">13-Jan-2019</OptionTag>
            <OptionTag value="2">15-Jan-2019</OptionTag>
            <OptionTag value="2">20-Jan-2019</OptionTag>
            <OptionTag value="2">25-Jan-2019</OptionTag>
          </SelectTag>
          <SelectTag name="quantity" style={{flex:1.5,minWidth:'11.25em'}}> 
            <OptionTag value="" defaultValue>Quantity</OptionTag>
            <OptionTag value="1">9 items</OptionTag>
            <OptionTag value="2">13 items</OptionTag>
            <OptionTag value="2">14 items</OptionTag>
            <OptionTag value="2">17 items</OptionTag>
            <OptionTag value="2">22 items</OptionTag>
          </SelectTag>
          <PaddingDiv/>
        </SelectCon>
        {this.state.data.map((order,i)=>{
          let itemnum = 0;
          order.clothes.map((item,i)=>{ itemnum = itemnum + item.itemQuan;return ''; })
          return (
            <UserCon key={i}>
              <UserNameCon>
                <UserImg src={require('../../assets/icons/userprofile.png')} alt='user image'/>
                <Username>{order.username}</Username>
              </UserNameCon>
              <LaundryCon><LaundryName>{order.brandname}</LaundryName></LaundryCon>      
              <StatusCon><StatusName>{order.status}</StatusName></StatusCon>      
              <ActivityCon><ActivityName>{`${order.deliveryDate.Day}-${order.deliveryDate.month}-${order.deliveryDate.year}`}</ActivityName></ActivityCon>      
              <QuantityCon><QuantityName>{itemnum} items</QuantityName></QuantityCon> 
              <DetailsIcon src={require('../../assets/icons/orderstate.svg')} alt='order details icon'/>     
            </UserCon>
          )
        })}
      </React.Fragment>
    );
  }
}
export default Orders;
