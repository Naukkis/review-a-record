import React from 'react';
import axios from 'axios';

class Register extends React.Component {
	constructor(props) {
    super(props);
    this.state = {username: '', password: '', available: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
  	}

  handleSubmit(e) {
  	e.preventDefault();
    this.props.closeModal();
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
    if (e.target.name === 'username') this.checkUserName(e.target.value);
  }

  checkUserName(username) {
    if (username) {
      axios.get('/users/user-name-available/' + username)
           .then((res) => {
              this.setState({ available: res.data});       
            })
    }
    
  }


  componentWillReceiveProps(nextProps) {
 	this.setState({showModal: nextProps.showModal})
  }

  render () {
  	return (
  		<div>
	  		<p>Register</p>
	  		<form onSubmit={this.handleSubmit}>
        {this.state.available ? <p style={{color: "green"}}>Username available</p> 
        :
         <p style={{color: "red"}}>Username not available {document.getElementById("mySubmit").disabled = true} </p> }
			<label>
				Username:
				<input id="formInput" type="text" name="username" onChange={this.handleChange}/>
			</label>
			<label>
				Password:
				<input id="formInput" type="password" name="password" onChange={this.handleChange} />
			</label>
			<input type="submit" value="Register" id="mySubmit"/>
			</form>				
			</div>	
  	);
  }
}

export default Register;