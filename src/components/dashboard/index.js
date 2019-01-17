import React from 'react';
import Styled from 'styled-components';

import MenuBar from './menu';
import Laundries from './laundries'
import Orders from './orders'
import Service from './service'
import Reports from './reports'
import Settings from './settings'
import AddCustomer from './addlaundry'

let Container  = Styled.div `position:absolute;width:100%;height:100%;top:0;left:0;background-color:#262f32;`;
let BodyCon    = Styled.div `position:absolute;left:16em;height:calc(100% - 8em);top:0;width:calc(100% - 24em);padding:4em;overflow:scroll;
                              &::-webkit-scrollbar { width:0px;background: transparent; }`
class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      body : <Orders />,
      html : <div></div>
    }
  }
  uiData(){
    if(window.innerWidth < 1400){
      return (
        <React.Fragment>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
            <img src={require('../../assets/icons/dashboard.svg')} alt='loader' style={{width:'8em',height:'8em'}} /><br/>
            <span style={{color:'white',fontSize:'20px',padding:'10px'}}>we suggest to open this page with laptop or desktop devices</span>
          </div>
        </React.Fragment>
      )
    }else {
      return (
        <React.Fragment>
          <MenuBar 
            updateCustomersFun={this.updateBodyCon.bind(this,'laundries')}
            updateOrdersFun={this.updateBodyCon.bind(this,'orders')}
            updateServiceFun={this.updateBodyCon.bind(this,'service')}
            updateReportsFun={this.updateBodyCon.bind(this,'reports')}
            updateSettingsFun={this.updateBodyCon.bind(this,'settings')}
            updateAddCustomerFun={this.updateBodyCon.bind(this,'addcustomer')}
          
          />
          <BodyCon>
            {this.state.body}
          </BodyCon>
        </React.Fragment>
      )
    }
  }
  updateBodyCon(str,e){
    if(str === 'laundries')   { this.setState({ body : <Laundries />  }) }
    if(str === 'orders')      { this.setState({ body : <Orders />     }) }
    if(str === 'service')     { this.setState({ body : <Service />    }) }
    if(str === 'reports')     { this.setState({ body : <Reports />    }) }
    if(str === 'settings')    { this.setState({ body : <Settings />   }) }
    if(str === 'addcustomer') { this.setState({ body : <AddCustomer />}) }
  }
  render() {
    return (
      <Container>
        {this.uiData()}
      </Container>
    );
  }
}
export default Dashboard;