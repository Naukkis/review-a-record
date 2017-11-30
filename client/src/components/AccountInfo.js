import React from 'react';

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
	        	<button onClick={this.logout}>Log out</button>
	    	</div>
		)
	}
}

export default AccountInfo;