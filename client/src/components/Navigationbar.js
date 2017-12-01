import React, { Component } from 'react';
import Register from './Register';
import Login from './login';
import AccountInfo from './AccountInfo';
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';

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
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/artist'>Artist</Link></li>
          <li><Link to='/artist/reviews'>Reviews</Link></li>
          <li><Link to='/'>Home</Link></li>
          <li><input type="text" name="searchbox" placeholder="Search..."></input></li>
          {localStorage.getItem("token") ?
            <li> <Button bsStyle="info" onClick={this.accountInfo}>Account info / Log out</Button></li> :
            <li> <Button bsStyle="info" onClick={this.register}>Login / Register</Button>  </li>
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
