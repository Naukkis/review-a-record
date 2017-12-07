import React from 'react';
import axios from 'axios';

class Register extends React.Component {
	constructor(props) {
    super(props);
    this.state = {username: '', password: '', available: true, validUsername: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  	}

  handleSubmit(e) {
  	e.preventDefault();
    if (this.state.validUsername && this.state.available) {
      this.props.closeModal();
    	axios.post('/users/create-user',{
    		username: this.state.username, 
    		password: this.state.password }
    		)
    		.then(function (response) {
          if (response.data.status === 'success') { 
    			 alert("Success, please login");
          } else {
            alert("Something went wrong, try again");
          }
    		})
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    if (e.target.name === 'username') this.checkUserName(e.target.value);
    if (e.target.name === 'username') this.checkValidity(e.target.value);
  }

  checkUserName(username) {
    if (username) {
      axios.get('/users/user-name-available/' + username)
           .then((res) => {
              this.setState({ available: res.data});       
            })
    }
  }

  checkValidity(username) {
    let allowed = /^[a-zöäå0-9]{3,}$/i;
    this.setState({validUsername: allowed.test(username)});
  }

  componentWillReceiveProps(nextProps) {
 	this.setState({showModal: nextProps.showModal})
  }

  render () {
  	return (
  		<div>
	  		<p>Register</p>
	  		<form onSubmit={this.handleSubmit}>
        {this.state.available ? <p style={{color: "green"}}>Username available </p> 
        :
         <p style={{color: "red"}}>Username not available  </p> }
	      {this.state.validUsername ? <p> </p>
        :
        <p style={{color: "red"}}>Username must be atleast 3 characters, only letters and numbers allowed.</p>
        }
      <label>
				Username:
				<input id="formInput" type="text" name="username" onChange={this.handleChange} required/>
			</label>
			<label>
				Password:
				<input id="formInput" type="password" name="password" onChange={this.handleChange} required/>
			</label>
			<input type="submit" value="Register" id="mySubmit"/>
			</form>				
			</div>	
  	);
  }
}
// {document.getElementById("mySubmit").disabled = true}
export default Register;