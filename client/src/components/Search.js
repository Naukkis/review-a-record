import React from 'react';
import {searchArtist, searchAlbum} from '../spotify';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
    	this.setState({ value: e.target.value});
  	}

  	handleSubmit(e) {
    	e.preventDefault();
    	e.target.value = '';
    	searchArtist(this.state.value);
    	searchAlbum(this.state.value);
    	this.setState({ value: ''});

  	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			<input type="text" name="searchbox" placeholder="Search..." value={this.state.value}
					onChange={this.handleChange} onSubmit={this.handleSubmit}>
			</input>
			</form>
		);
	}
}

export default Search;