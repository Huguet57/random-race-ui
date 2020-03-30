import React, {Component} from 'react';

import SignUpForm from './components/signup';
import GambleForm from './components/gamble'

import Users from './components/users';
import Live from './components/live';

import * as SignUp from './actions/signup';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: {
				users: []
			},
			users: [],
			current: {
				userid: 0,
				gamble: -1
			}
		};
		
		this.updateInfo = this.updateInfo.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	
	updateInfo(curr_id = this.state.current.userid) {
		fetch(SignUp.JSONBIN_URL + '/latest', SignUp.GET_JSON)
		.then(res => res.json())
		.then((data) => {
			this.setState({
				users: data.users,
				data: data,
				current: {
					userid: curr_id,
					gamble: this.state.current.gamble
				}
			});
			
			console.log(data);
		})
		.catch(console.log)	
	}
	
	componentDidMount() {
		this.updateInfo();
		// let RutineCheck = setInterval(this.updateInfo, 10000);
	}
	
	render () {
		return (
			<div>
				<SignUpForm data={this.state.data}
							current={this.state.current}
							update={this.updateInfo} />
				<GambleForm data={this.state.data}
							current={this.state.current}
							update={this.updateInfo} />
				<Users users={this.state.users} />
				
				<br />
				
				<Live />
			</div>
		);
	}
};

export default App;
			
