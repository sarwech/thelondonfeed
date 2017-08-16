import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Header from './Components/Header.js'; // eslint-disable-line no-unused-vars
import Feed from './Components/Feed.js'; // eslint-disable-line no-unused-vars
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: 0,
			updates: true,
			reviews: false,
			cats: false,
			source: [],
			travelSource: [],
			reviewsSource: [],
			gifsSource: []
		};
		this.handleSelect = this.handleSelect.bind(this);	
	}

	handleSelect(e) {
		this.setState({
			activeKey: e
		});
	}

	componentDidMount() {
		fetch('https://the-london-feed.herokuapp.com/sync')
			.then(response => {
				return response;
			})
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
			.catch(e => e);
	}

	render() {

		return (
			<div>
				<Header eventKey={this.state.activeKey} handleClick={this.handleSelect}/>
				<Feed currentTab={this.state.activeKey} travelSource={this.state.travelSource} reviewsSource={this.state.reviewsSource} gifsSource={this.state.gifsSource}/>
			</div>
		);
	}
}

export default App;