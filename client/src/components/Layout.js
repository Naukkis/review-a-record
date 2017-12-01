import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Artistdisplay from "./Artistdisplay";
import Chatarea from "./Chatarea";
import Navigationbar from "./Navigationbar";
import { Route } from 'react-router-dom';
//import Newsfeed from "./documents/Newsfeed";

export default class Layout extends Component{
    render() {
      return(
        <div className="Header">
          <Route path='/' component={Header}/>
          <Route path='/' component={Navigationbar}/>
          <Route path='/artist' component={Artistdisplay}/>
          <Route path='/artist/reviews' component={Chatarea}/>
          <Route path='/' component={Footer}/>
        </div>
      );
    }
}
