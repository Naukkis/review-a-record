import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { searchAlbum, searchArtist, getAccessToken} from './spotify';
import { Button } from 'react-bootstrap';
import Main from './components/main.js';
import Layout from './components/Layout.js'

class App extends Component {
  render() {
    return (
        <div className="Layout">
          <Layout/>
        </div>
    );
  }
}

export default App;
