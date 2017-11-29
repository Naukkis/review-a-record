import React, { Component } from 'react';

export default class Header extends Component {
  render(){
    return (
      <div class="navigation-bar">
        <ul>
          <li><a class="active" href="#">This is testbar</a></li>
          <li><a href="#">Test</a></li>
          <li><a href="#">Test</a></li>
          <li><a href="#">Test</a></li>
          <li><input type="text" name="searchbox" placeholder="Search..."></input></li>
        </ul>
      </div>
    );
  }
}
