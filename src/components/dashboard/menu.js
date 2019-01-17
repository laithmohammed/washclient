import React from 'react';
import Styled from 'styled-components'

let Container = Styled.div  `position:absolute;height:100%;top:0;left:0;width:12em;background-color:#151d20;padding:0 2em;display:flex;align-items:center;
                              justify-content:space-between;flex-direction:column;`
let Logo      = Styled.img  `width:100%;margin:2em 0;`
let List      = Styled.div  ``;
let ListDiv   = Styled.div  `display:flex;align-items:center;justify-content:flex-start;cursor:pointer;border-radius:4px;color:#5b646f;margin:1em 0;
                            &:hover { background-color:#0c427d;color:white; }`
let ListIcon  = Styled.img  `width:2em;padding:0.5em;margin-right:1em;`
let ListName  = Styled.span `font-size:1em;font-family: 'Noto Sans', sans-serif;`


let NewCustomer = Styled.span `color:white;padding:1em 2.4em;font-size:1em;font-family: 'Noto Sans', sans-serif;background-color:#0078ff;
                                white-space:nowrap;margin:2em 0;border-radius:4px;cursor:pointer;`

class MenuBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    
  }
  
  render() {
    return (
      <Container>
        <div>
        <Logo src={require('../../assets/icons/washlogo.png')} alt='wash logo'/>
        <List>
          <ListDiv onClick={this.props.updateCustomersFun.bind()}>
            <ListIcon src={require('../../assets/icons/ordercustomer.svg')} />
            <ListName>Laundries</ListName>
          </ListDiv>
          <ListDiv onClick={this.props.updateOrdersFun.bind()}>
            <ListIcon src={require('../../assets/icons/orderstate.svg')} />
            <ListName>Orders</ListName>
          </ListDiv>
          <ListDiv onClick={this.props.updateServiceFun.bind()}>
            <ListIcon src={require('../../assets/icons/orderservicezone.svg')} />
            <ListName>Service Zones</ListName>
          </ListDiv>
          <ListDiv onClick={this.props.updateReportsFun.bind()}>
            <ListIcon src={require('../../assets/icons/orderreport.svg')} />
            <ListName>Reports</ListName>
          </ListDiv>
          <ListDiv onClick={this.props.updateSettingsFun.bind()}>
            <ListIcon src={require('../../assets/icons/ordersetting.svg')} />
            <ListName>Settings</ListName>
          </ListDiv>
        </List>
        </div>
        <NewCustomer onClick={this.props.updateAddCustomerFun.bind()}>Add Laundry</NewCustomer>
      </Container>
    );
  }
}
export default MenuBar;
