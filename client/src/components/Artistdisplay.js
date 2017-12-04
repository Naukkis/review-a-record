import React, { Component } from 'react';
import { store } from '../store.js';
import axios from 'axios';

export default class Artistdisplay extends Component {
	constructor(props){
		super(props);
		this.state = {id: '', name: '', image: ''};
	}

	componentDidMount() {
		console.log(this.props);
		this.setState({id: this.props.match.params.id, name: this.props.location.state.name});
	}

  render(){
    return (
      <div id="artist-display">
        <img src={'../img/gitgud.jpg'} width="200" height="200" alt="gitgud"></img>
        <p>{this.state.name}</p>
      </div>
    );
  }
}
