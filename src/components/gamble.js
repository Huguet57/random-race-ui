import React from 'react'
import {JSONBIN_URL, POST_JSON} from '../actions/signup.js'

class GambleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { checked : -1 };
		this.handleChange = this.handleChange.bind(this);
	}
	
	userSignUp(data) {
		return fetch(JSONBIN_URL, POST_JSON(data)).then(res => {
			return res;
		}).catch(err => err);
	}

	handleChange(event) {
		console.log("Tocat!", event.target.id);
		
		this.setState({
			checked: event.target.id
		});

		let data = this.props.data;
		
		// Change user gamble information
		data.users = data.users.map(user => {
			if (user.id === this.props.current.userid) {
				console.log(event.target.id);
				return {
					id: user.id,
					name: user.name,
					gamble: parseInt(event.target.id)
				};
			}
			
			return user;
		});

		// Add user to database
		this.userSignUp(data).then((json) => {
			// Change state to updated 
			this.props.update(this.props.current.userid);
			console.log("Update!");
		});
	}

  render() {
	return (
		<form onSubmit={this.handleSubmit}>
			<input type="radio" id="0" checked={this.state.checked == 0} onChange={this.handleChange} /><label for="0">Vermell</label>
			<input type="radio" id="1" checked={this.state.checked == 1} onChange={this.handleChange} /><label for="1">Verd</label>
			<input type="radio" id="2" checked={this.state.checked == 2} onChange={this.handleChange} /><label for="2">Groc</label>
		</form>
	);
  }
}

export default GambleForm;
