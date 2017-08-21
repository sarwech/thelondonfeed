import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Header from './Components/Header.js'; // eslint-disable-line no-unused-vars
import Feed from './Components/Feed.js'; // eslint-disable-line no-unused-vars
import './App.css';
import io from 'socket.io-client';

const socket_travel = io('https://the-london-feed.herokuapp.com/travel');
const socket_reviews = io('https://the-london-feed.herokuapp.com/reviews');
const socket_gifs = io('https://the-london-feed.herokuapp.com/gifs');

socket_travel.on('connect', () => socket_travel.emit('start', { data: {}}));
socket_reviews.on('connect', () => socket_reviews.emit('start', { data: {}}));
socket_gifs.on('connect', () => socket_gifs.emit('start', { data: {} }));

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
				socket_travel.on('message', ({data} = {}) => {
					if (!data.text) { return; }
					this.setState({
						travelSource: [data, ...this.state.travelSource]
					});
				});
				socket_reviews.on('message', ({data} = {}) => {
					if (!data) { return; }
					this.setState({
						reviewsSource: [data, ...this.state.reviewsSource]
					});
				});
				socket_gifs.on('message', ({data} = {} ) => { 
					if  (!data.gif_source) { return; }
					this.setState({
						gifsSource: [data, ...this.state.gifsSource]
					}/*, () => console.log(this.state.gifsSource)*/);
				});

			})
			.catch(e => console.error(e));
	}

	handleStar(e) {
		console.log(e);
		this.setState({
			starred: [e, ...this.state.starred]
		});	

		const type = e.id_str ? 'travel' : e.name ? 'reviews' : e.gif_source ? 'gifs' :null;
		const starId = type === 'travel' ? e.id_str : type === 'reviews' ? e.id : type === 'gifs' ? e.id :null;

		fetch('https://the-london-feed.herokuapp.com/star', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    data_type: type,
		    data_id: starId,
		  })
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(e => console.error(e));
	}

	render() {

		return (
			<div>
				<Header eventKey={this.state.activeKey} handleClick={this.handleSelect}/>
				<Feed currentTab={this.state.activeKey} travelSource={this.state.travelSource} 
					reviewsSource={this.state.reviewsSource} gifsSource={this.state.gifsSource} 
					handleStar={this.handleStar} style={this.state.currentStar} faves={this.state.starred} />
			</div>
		);
	}
}

export default App;