import React from 'react';
import Styled from 'styled-components';
// import 'babel-polyfill';

import BodyBackground from './background'

let Container = Styled.div `position:absolute;top:0px;left:0px;width:100%;height:100%;`;
let Label     = Styled.div `display:flex;align-items:center;justify-content:center;width:100%;max-width:40em;flex-direction:column;
                            transform:translateX(-50%);left:50%;position:absolute;z-index:11;text-align:center;`;
let Graphic   = Styled.img `width:50%;max-width:30em;padding-top:4em;`;
let Header    = Styled.span `font-family: 'Signika', sans-serif;font-size:2em;`;
let TestDes   = Styled.span `font-family: 'Noto Sans', sans-serif;font-size:1.4;color:#6e6e70;padding:0 1.6em;max-width:30em;height:5em;`;
let Shadow    = Styled.img `position:absolute;left:0px;bottom:0px;width:30vw;z-index:10;`;
let ButtonBlue= Styled.a `color:white;padding:1em 2.4em;font-size:1em;font-family: 'Noto Sans', sans-serif;background-color:#0078ff;
                            white-space:nowrap;margin:1em 0;border-radius:4px;cursor:pointer;text-decoration:none;`


class Startup extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render() {
    return (
      <BodyBackground context={
        <Container>
          <Label>
            <Graphic src={require('../assets/icons/chooseyourclothes.svg')} alt='icon' /><br/>
            <Header>Sent Wash Order</Header><br/>
            <TestDes>thank you for choice our sevices, your wash order have been send, we will contact with you as soon as possible</TestDes><br/>
            <ButtonBlue href='/selection'>New Order</ButtonBlue>
          </Label>
          <Shadow src={require('../assets/icons/chooseyourcloths.svg')} alt='shadow' />
        </Container>
      } />
    );
  }
}
export default Startup;