import React, { Component } from 'react';
import { store } from '../store';
import Login from './login';
import Logout from './logout';
import axios from 'axios';

store.dispatch({type: "CHANGE_REDIRECT", field: "config", payload: {redirect: "true"}});

class Main extends Component {
  constructor(props){
    super(props);
    this.auth = this.auth.bind(this);
  }

  auth() {
    axios.post(
      "/test-token",
      {token: localStorage.getItem("token")})
        .then((res) => {
          if(res.data){
            store.dispatch({type: "CHANGE_REDIRECT", field: "config", payload: {redirect: "false"}});
          } else {
            store.dispatch({type: "CHANGE_REDIRECT", field: "config", payload: {redirect: "true"}});
          }
        })
  }

  componentDidMount() {
    this.auth();
  }

  render() {
    if(store.getState().config.redirect === "true") {
      return(
        <div className="login-screen">
          <Login/>
        </div>
      )
    } else {
      return(
        <div className="logout-screen">
         <Logout/>
        </div>
      )
    }

  }
}

export default Main
