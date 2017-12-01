import React from 'react';
import axios from 'axios';

class Register extends React.Component {
	constructor(props) {
    super(props);
    this.state = {username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  	}

  handleSubmit(e) {
  	this.close();
  	e.preventDefault();
  	axios.post('/users/create-user',{
  		username: this.state.username, 
  		password: this.state.password }
  		)
  		.then(function (response) {
  			console.log(response.data);
  		})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
 	this.setState({showModal: nextProps.showModal})
  }

  render () {
  	return (
  		<div>
	  		<p>Register</p>
	  		<form onSubmit={this.handleSubmit}>
			<label>
				Username:
				<input type="text" name="username" onChange={this.handleChange}/>
			</label>
			<label>
				Password:
				<input type="password" name="password" onChange={this.handleChange} />
			</label>
			<input type="submit" value="Submit" />
			</form>				
			</div>	
  	);
  }
}

export default Register;