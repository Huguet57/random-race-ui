import React from 'react'
import {JSONBIN_URL, POST_JSON} from '../actions/signup.js'

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function cumsum(list, index) {
	return list.reduce((res, cur, i) => i <= index ? res + cur : res);	
}

class Live extends React.Component {
	constructor(props) {
		super(props);
		this.state = { time : 0 };
		
		this.length = 50;
		
		this.red = this.randomSequence(this.length);
		this.green = this.randomSequence(this.length);
		this.yellow = this.randomSequence(this.length);
		
		this.run = this.run.bind(this);
		this.advanceTime = this.advanceTime.bind(this);
		this.advancePosition = this.advancePosition.bind(this);
	}
	
	randomSequence(length) {
		let sequence = [];
		while (sequence.length < length) {
			let normNum = randn_bm();
			sequence.push(Math.round(normNum*0.75 + 1));
		}
		return sequence;
	}
	
	userSignUp(data) {
		return fetch(JSONBIN_URL, POST_JSON(data)).then(res => {
			return res;
		}).catch(err => err);
	}
	
	componentDidMount() {
		this.run();
	}

	advanceTime() {
		let actualTime = this.state.time;
		if (actualTime >= 50) return;
		
		this.setState({
			time: actualTime + 1
		}, this.advancePosition);
	}

	advancePosition() {
		const delta = window.innerWidth/this.length;
		document.getElementById("red").style.left = delta*cumsum(this.red, this.state.time) + 'px';
		document.getElementById("green").style.left = delta*cumsum(this.green, this.state.time) + 'px';
		document.getElementById("yellow").style.left = delta*cumsum(this.yellow, this.state.time) + 'px';
	}

	run() {
		let runRace = setInterval(this.advanceTime, 500);
	}

	render() {
		return (
			<div>
				<div id="red" class="racer">
					{this.red[this.state.time%this.length]}
				</div>
				<div id="green" class="racer">
					{this.green[this.state.time%this.length]}
				</div>
				<div id="yellow" class="racer">
					{this.yellow[this.state.time%this.length]}
				</div>
			</div>
		);
	}
}

export default Live;
