import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { searchAlbum, searchArtist, getAccessToken} from './spotify';
import { Button } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleAlbums = this.handleAlbums.bind(this);
    this.handleArtists = this.handleArtists.bind(this);
    this.requestAccessToken = this.requestAccessToken.bind(this);
  }

  handleAlbums() {
    searchAlbum('Punainen tiili');
  }

  handleArtists() {
    searchArtist('Metallica');
  }

  requestAccessToken() {
    getAccessToken();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div><button onClick={this.handleArtists}>search Metallica</button></div>
        <div><button onClick={this.handleAlbums}>search Punainen tiili</button></div>
        <div><button onClick={this.requestAccessToken}>get token</button></div>
        <div><Button bsStyle="success">Hello</Button></div>
      </div>
    );
  }
}

export default App;
