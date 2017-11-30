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
    this.props.closeModal();
    e.preventDefault();
    axios.post(
      '/login',
      this.state
    )
    .then((res) => {
      
      localStorage.setItem("token", res.data.token);
      store.dispatch({type: "CHANGE_REDIRECT", field: "config", payload: {redirect: "false"}});

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
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;
