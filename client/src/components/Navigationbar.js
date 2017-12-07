import React, { Component } from 'react';
import Register from './Register';
import Login from './login';
import AccountInfo from './AccountInfo';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Search from './Search';
export default class Navigationbar extends Component {
  constructor(props){
    super(props);
    this.state = {showRegister: false, showAccountInfo: false, searchField: ''};
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
      <div>
        <ul className="topnav">
          <li id="nav-left"><Link to='/'>Home</Link></li>
          <li id="nav-middle"><Search /></li>
          {localStorage.getItem("token") ?
            <li id="nav-right" onClick={this.accountInfo}><a>Account info / Log out</a></li> :
            <li id="nav-right" onClick={this.register}><a>Login / Register</a>  </li>
           }
        </ul>
        <Modal
          show={this.state.showRegister}
          onHide={this.closeRegister}
        >
        <Register closeModal={this.closeRegister}/>
        <p>Or login</p>
        <Login closeModal={this.closeRegister}/>
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
