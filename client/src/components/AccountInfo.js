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
	        	<p>{this.props.username}</p>
	        	<Logout closeModal={this.props.closeModal}/>
	    	</div>
		)
	}
}

export default AccountInfo;