import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Artistdisplay from "./Artistdisplay";
import Chatarea from "./Chatarea";
import Navigationbar from "./Navigationbar";
//import Newsfeed from "./documents/Newsfeed";

export default class Layout extends Component{
    render() {
      return(
        <div className="Header">
          <Header/>
          <Navigationbar/>
          <Artistdisplay/>
          <Chatarea/>
          <Footer/>
        </div>
      );
    }
}
