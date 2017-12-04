import React, { Component } from 'react';

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
        <img src={this.props.location.state.image[0].url} width="200" height="200" alt="gitgud"></img>
        <p>{this.props.location.state.name}</p>
      </div>
    );
  }
}
