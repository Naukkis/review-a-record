import React from 'react';
import Logout from './logout';

class AccountInfo extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		this.props.closeModal();
		localStorage.removeItem("token");
	}

	render() {
		return (
			<div>
	        	<p style={{color: "white"}}>Logged in as: {localStorage.getItem('username')}</p>
	        	<Logout closeModal={this.props.closeModal}/>
	    	</div>
		)
	}
}

export default AccountInfo;