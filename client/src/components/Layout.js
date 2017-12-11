import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Artistdisplay from "./Artistdisplay";
import Navigationbar from "./Navigationbar";
import SearchResults from "./SearchResults";
import AlbumDisplay from "./Albumdisplay";
import RecentReviews from "./RecentReviews";
import Notfound from './Notfound.js';
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";


export default class Layout extends Component{
    render() {
      return(
        <div>
          <Header/>
          <Navigationbar/>
          <Switch>
            <Route path='/artist/:id' component={Artistdisplay}/>
            <Route path='/album/:id' component={AlbumDisplay}/>
            <Route path='/search-results' component={SearchResults}/>
            <Route path='/latest' component={RecentReviews}/>
            <Route exact path='/' component={Home}/>
            <Route component={Notfound}/>
          </Switch>
          <Footer/>
        </div>
      );
    }
}
