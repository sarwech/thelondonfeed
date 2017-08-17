import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Header from './Components/Header.js'; // eslint-disable-line no-unused-vars
import Feed from './Components/Feed.js'; // eslint-disable-line no-unused-vars
import './App.css';
import io from 'socket.io-client';
const socket_reviews = io('https://the-london-feed.herokuapp.com/reviews');
// const socket_gifs = io('https://the-london-feed.herokuapp.com/gifs');

socket_reviews.on('connect', () => socket_reviews.emit('start', { data: {}}));

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
			.then(response => response.json())
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
				socket_reviews.on('message', ({data: {price, name}} = {}) => {
					if (!name) { return }
					const review = { price, name }
					this.setState({
						reviewsSource: [{price, name}, ...this.state.reviewsSource]
					}, () => console.log(this.state.socketData))
				});
			})
			.catch(e => console.error(e));

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