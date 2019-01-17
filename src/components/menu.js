import React from 'react';
import Styled from 'styled-components'
import Params from './params';
import Fun from '../functions';

let Container = Styled.div `position:fixed;top:0;left:-4em;width:3em;height:100%;background-color:white;z-index:200;padding:0 0.5em;
                            display:flex;align-items:center;justify-content:flex-start;flex-direction: column;transition: left 0.25s;
                            -webkit-transition: left 0.25s;`;
let Icon      = Styled.img `width:100%;`
let MenuButton= Styled.div `position:fixed;top:20%;margin-left:3.6em;width:3em;height:3em;border-top-right-radius:1em;border-bottom-right-radius:1em;
                            background-color:white;border:1px solid black;border-left:unset;padding:0.1em;padding-right:0.3em;`;

class MenuBar extends React.Component {
  constructor(){
    super();
    this.state = {
      Icon : [],
      set  : [<Icon src={require('../assets/icons/logouthold.svg')} alt='log out' onClick={e=>this.logOut(e)}/>]
    }
  }
  componentDidMount(){
    Fun.onMove(document.getElementById('MenuBottun'));
    fetch(`${Params.originServer}/checkPermit/${Fun.getCookie('X-auth-token')}`)
    .then(res => res.json()).then(data=>{
      if (data.authorized === "valid token") { this.setState({ Icon : [this.state.set[0]] }); }
      else { this.setState({ Icon : [] }); }
    })
    .catch(err => { this.setState({ Icon : [] }); });
  }
  sliding(e){
    if(parseInt(e.target.title) === 0){
      document.getElementById('MenuBar').style.left = '-4em';
      document.getElementById('MenuBar').style.border = 'unset'
      document.getElementById('MenuBottunIcon').title = 1;
    }else{
      document.getElementById('MenuBar').style.left = '0em';
      document.getElementById('MenuBar').style.borderRight = '1px solid black'
      document.getElementById('MenuBottunIcon').title = 0;
    }
  }
  logOut() {
    fetch(`${Params.originServer}/logout/${Fun.getCookie('X-auth-token')}`)
      .then(res=>{
        if(res.status === 200){
          Fun.setCookie('X-auth-token');
          window.location.reload();
        }
      })
  }
  render() {
    return (
    <Container id='MenuBar'>
        <MenuButton id='MenuBottun' >
            <Icon src={require('../assets/icons/menulines.svg')} alt='menu lines' id='MenuBottunIcon' onClick={(e)=>{this.sliding(e)}} title='1' />
        </MenuButton>
        {this.state.Icon.map((icon,i)=>{ return <React.Fragment key={i}>{icon}</React.Fragment> })}
    </Container>
    );
  }
}
export default MenuBar;
