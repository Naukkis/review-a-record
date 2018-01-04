import React, { Component } from 'react';
import '../css/home.css';

export default class Home extends Component {
  render(){
    return (
      <div className="main-wrapper">
		    <div className="container container-wrapper">
				  <h1> Review App</h1>
				  <h3>Review and listen to your favorite artists</h3>
          <h2>Start by searching your favorite artist from the searchbar </h2>
		</div>
	</div>
    );
  }
}
