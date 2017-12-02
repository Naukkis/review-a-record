import React, { Component } from 'react';
import { store } from '../store.js';

class Logout extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.closeModal();
    localStorage.removeItem('token');
    store.dispatch({type: "CHANGE_REDIRECT", field: "config", payload: {redirect: "true"}});
  }

  render() {
    return(
      <div>
        <button className="nav" type="button" onClick={this.onSubmit}>Logout</button>
      </div>
    );
  }
}

export default Logout
