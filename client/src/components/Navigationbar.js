import React, { Component } from 'react';
import Register from './Register';
import Login from './login';
import AccountInfo from './AccountInfo';

import { Modal } from 'react-bootstrap';

export default class Navigationbar extends Component {
  constructor(props){
    super(props);
    this.state = {showRegister: false, showAccountInfo: false};
    this.accountInfo = this.accountInfo.bind(this);
    this.closeAccountInfo = this.closeAccountInfo.bind(this);

    this.register = this.register.bind(this);
    this.closeRegister = this.closeRegister.bind(this);
  }

  register() { this.setState({showRegister: true}) }
  closeRegister() { this.setState({showRegister: false}) }
  accountInfo() { this.setState({showAccountInfo: true}) }
  closeAccountInfo() { this.setState({showAccountInfo: false}) }

  render(){
    return (
      <div className="navigation-bar">
        <ul>
          <li><a className="active" href="">This is testbar</a></li>
          <li><a href="">Test</a></li>
          <li><a href="">Test</a></li>
          <li><a href="">Test</a></li>
          <li><input type="text" name="searchbox" placeholder="Search..."></input></li>
          {localStorage.getItem("token") ?
            <li style={{color: "white"}} onClick={this.accountInfo}>Account info / Log out</li> :
            <li style={{color: "white"}} onClick={this.register}>Login / Register </li>
           }
        </ul>
        <Modal
          show={this.state.showRegister}
          onHide={this.closeRegister}
        >
        <Register closeModal={this.closeRegister}/>
        <p>Or login</p>
        <Login closeModal={this.props.closeModal}/>
        </Modal>

        <Modal
          show={this.state.showAccountInfo}
          onHide={this.closeAccountInfo}
        >
        <AccountInfo closeModal={this.closeAccountInfo}/>
        </Modal>
      </div>
    );
  }
}
