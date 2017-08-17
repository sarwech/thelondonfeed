import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Header from './Components/Header.js'; // eslint-disable-line no-unused-vars
import Feed from './Components/Feed.js'; // eslint-disable-line no-unused-vars
import './App.css';
// import io from 'socket.io-client';
// const socket = io();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: 0,
			source: [],
			travelSource: [],
			reviewsSource: [],
			gifsSource: [],
			starred: [],
			currentStar: [],
			socketData: [],
		};
		this.handleSelect = this.handleSelect.bind(this);	
		this.handleStar = this.handleStar.bind(this);	
	}

	handleSelect(e) {
		this.setState({
			activeKey: e
		});
	}

 handleStar(e) {
 	let array = this.state.starred;
 	let index = array.indexOf(e);
 	if (index === 0 && array.length <= 1) {
 		this.setState({
 			starred: []
 		})
 	} else if (index !== -1) {
 		let unjoined = array.splice(index);
 		this.setState({
 			starred: unjoined
 		});
 	} else {
	 	let joined = this.state.starred.concat(e);
			this.setState({
				starred: joined
			});
 	}
 	let result = index === -1 ? true : false;
 	this.setState({
 		currentStar: [result,e]
 	})
 	console.log(this.state.currentStar);
	}

	componentDidMount() {
		fetch('https://the-london-feed.herokuapp.com/sync')
			.then(response => {
				return response.json();
			})
			.then(data => {
				const source = data;
				const travel = data.travel;
				const reviews = data.reviews;
				const gifs = data.gifs;
				this.setState({
					source: source,
					travelSource: travel,
					reviewsSource: reviews,
					gifsSource: gifs,
				});
			})
			.catch(e => console.error(e))
			// Create a new WebSocket.
			var socket = new WebSocket('wss://the-london-feed.herokuapp.com/websocket_ct');
			// Show a connected message when the WebSocket is opened.
			socket.onopen = function(event) {
			  console.log('it works!');
			};
			socket.onmessage = function(event) {
			  console.log(JSON.parse(event.data));
			};
			// var wsUrl = 'ws://the-london-feed.herokuapp.com';
			// var ws = new WebSocket(wsUrl + '/websocket_ct');

			// ws.onmessage = function(e) {
			//   console.log(e.data)
			// }

			// ws.onopen = function() {
			//   console.log('opening...')
			//   ws.send('hello server')
			// }

			// ws.onerror = function(error) {
			//   console.log('WebSocket error ' + error)
			//   console.dir(error)
			// }

	}

	render() {

		return (
			<div>
				<Header eventKey={this.state.activeKey} handleClick={this.handleSelect}/>
				<Feed currentTab={this.state.activeKey} travelSource={this.state.travelSource} reviewsSource={this.state.reviewsSource} gifsSource={this.state.gifsSource} handleStar={this.handleStar} style={this.state.currentStar} faves={this.state.starred} />
			</div>
		);
	}
}

export default App;