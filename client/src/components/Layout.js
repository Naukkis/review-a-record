import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Artistdisplay from "./Artistdisplay";
import Reviews from "./Reviews";
import Navigationbar from "./Navigationbar";
import SearchResults from "./SearchResults";
import AlbumDisplay from "./Albumdisplay";
import { Route } from 'react-router-dom';
import Home from "./Home";
//import Makereview from "./Makereview";

export default class Layout extends Component{
    render() {
      return(
        <div className="Header">
          <Header/>
          <Navigationbar/>
          <Route path='/artist/:id' component={Artistdisplay}/>
          <Route path='/album/:id' component={AlbumDisplay}/>
          <Route path='/search-results' component={SearchResults}/>
          <Route exact path='/' component={Home}/>
          <Footer/>
        </div>
      );
    }
}
