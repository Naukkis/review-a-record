import React, { Component } from 'react';

export default class Chatarea extends Component {
  render(){
    return (
      <div>
      <div className="container">
        <p>On muuten vitun karmeeta kuraa</p>
        <span className="time-right">11:00</span>
      </div>

      <div className="container darker">
        <p>Kusta ja kakkaa</p>
        <span className="time-left">11:01</span>
      </div>

      <div className="container">
        <p>Parasta ikinä...</p>
        <span className="time-right">11:02</span>
      </div>

      <div className="container darker">
        <p>joopajoooooo</p>
        <span className="time-left">11:05</span>
      </div>
      </div>
    );
  }
}
