import React, { Component } from 'react';
import axios from 'axios';
import { store } from '../store.js';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {username: "", password: ""};
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('/login',{
      username: this.state.username,
      password: this.state.password }
      )
    .then((res) => {
      this.props.closeModal();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      store.dispatch({type: "CHANGE_REDIRECT", field: "config", payload: {redirect: "false"}});
    })
    .catch(function (err) {
      alert("Username or password is wrong");
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    return (

      <form name="loginForm" onSubmit={this.onSubmit}>
        <div>
          <label>Username</label>
          <input id="formInput" type="text" name="username" onChange={this.handleChange} value={this.state.username} required/>
        </div>
        <div>
          <label>Password</label>
          <input id="formInput" type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;
