import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Artistdisplay from "./Artistdisplay";
import Reviews from "./Reviews";
import Navigationbar from "./Navigationbar";
import SearchResults from "./SearchResults";
import { Route } from 'react-router-dom';
//import Newsfeed from "./documents/Newsfeed";

export default class Layout extends Component{
    render() {
      return(
        <div className="Header">
          <Route path='/' component={Header}/>
          <Route path='/' component={Navigationbar}/>
          <Route path='/artist' component={Artistdisplay}/>
          <Route path='/artist' component={Reviews}/>
          <Route path='/search-results' component={SearchResults}/>
          <Route path='/' component={Footer}/>
        </div>
      );
    }
}
