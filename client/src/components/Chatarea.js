import React, { Component } from 'react';

export default class Footer extends Component {
  render(){
    return (
      <div>
      <div class="container">
        <p>On muuten vitun karmeeta kuraa</p>
        <span class="time-right">11:00</span>
      </div>

      <div class="container darker">
        <p>Kusta ja kakkaa</p>
        <span class="time-left">11:01</span>
      </div>

      <div class="container">
        <p>Parasta ikinä...</p>
        <span class="time-right">11:02</span>
      </div>

      <div class="container darker">
        <p>joopajoooooo</p>
        <span class="time-left">11:05</span>
      </div>
      </div>
    );
  }
}
