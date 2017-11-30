import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//import { Button } from 'react-bootstrap';
//import Main from './components/main.js';
import { getAccessToken} from './spotify';
import Layout from './components/Layout.js';



>>>>>>> 2983974e98fa283ced8aa029484861bc1561c804

class App extends Component {
  constructor(props) {
    super(props)
    getAccessToken();
  }
  render() {
    return (
        <div className="Layout">
          <Layout/>
        </div>
    );
  }
}

export default App;
