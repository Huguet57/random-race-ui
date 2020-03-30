import React from 'react'
import {JSONBIN_URL, POST_JSON} from '../actions/signup.js'

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value : "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.username = "Registra't!";
	}
	
	userSignUp(data) {
		return fetch(JSONBIN_URL, POST_JSON(data)).then(res => {						
			return res;
		}).catch(err => err);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	handleSubmit(event) {
		let data = this.props.data;
		console.log(this.props.current.userid);
		
		// Delete old user information
		data.users = data.users.filter(
			user => user.id !== this.props.current.userid
		);
		
		let new_id = Math.round(Math.random() * 1e6);
		
		// Add new user information
		data.users.unshift({
			"id": new_id,
			"name": this.state.value,
			"gamble": -1
		});

		// Add user to database
		this.userSignUp(data).then((json) => {
			// Change state to updated 
			this.props.update(new_id);
			
			this.username = this.state.value;
			this.setState({value: ""});
					
			console.log("Update!");
			console.log(json);
		});
				
		event.preventDefault();
	}

  render() {
	return (
		<form onSubmit={this.handleSubmit}>
		Hola! { this.username }<br />
			<label>
			  Name:
			  <input type="text" value={this.state.value} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
  }
}

export default SignUpForm;
