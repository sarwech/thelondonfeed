import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Feed extends Component {

	render() {
		const travel = this.props.travelSource.map((e,i) => {
			return <p key={i}>{this.props.travelSource[i].text}</p>
		});

		const reviews = this.props.reviewsSource.map((e,i) => {
			return <p key={i}>{this.props.reviewsSource[i].id}</p>
		});

		const gifs = this.props.gifsSource.map((e,i) => {
			return <Image key={i} src={this.props.gifsSource[i].gif_source} alt={i-1} responsive/>
		});

		return (
			<div>
				{this.props.currentTab === 0 ? 
				<div>
					<h1>Updates</h1>
					<button onClick={this.props.handleFeed}>Get Feed</button>
					{travel}
				</div>
				:null}

				{this.props.currentTab === 1 ?
				<div>
					<h1>Reviews</h1>
					<button onClick={this.props.handleFeed}>Get Feed</button>
					{reviews}
				</div>
				:null}

				{this.props.currentTab === 2 ?
				<div>
					<h1>Cats</h1>
					<button onClick={this.props.handleFeed}>Get Feed</button>
					{gifs}
				</div>
				:null}
			</div>
			)
	}
}

export default Feed;