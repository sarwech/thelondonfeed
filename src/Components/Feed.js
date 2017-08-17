import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import star from '../star.png';

class Feed extends Component {

	render() {
		const travel = this.props.travelSource.map((travel,i) => {
			return <p key={i}>{travel.text}</p>
		});

		const reviews = this.props.reviewsSource.map((review,i) => {
			return <p key={i}>{review.id}</p>
		});

		const gifs = this.props.gifsSource.map((gif,i) => {
			return <Image key={i} src={gif.gif_source} alt={i-1} responsive/>
		});

		return (
			<div>
				{this.props.currentTab === 0 ? 
				<div>
					<h1>Updates</h1>
					{this.props.travelSource.map((travel,i) => {
						return (
							<div key={travel.id} className="list">
								<Image src={travel.user.profile_image_url_https} alt={i-1} responsive/>
								<a>{travel.user.name}</a>
								<p><Image style={this.props.style[0] === true && this.props.style[1] ? {backgroundColor: 'yellow' } : {backgroundColor: 'none' } } src={star} className="star" data-id={travel.id} onClick={this.props.handleStar.bind(this,travel.id)} responsive/>{travel.text}</p>
							</div>
							)
					})}
				</div>
				:null}

				{this.props.currentTab === 1 ?
				<div>
					<h1>Reviews</h1>
					{this.props.reviewsSource.map((review,i) => {
						return (
							<div key={reviews.id} className="list">
								<p><Image style={this.props.style[0] === true && this.props.style[1] ? {backgroundColor: 'yellow' } : {backgroundColor: 'none' } } src={star} className="star" data-id={reviews.id} onClick={this.props.handleStar.bind(this,reviews.id)} responsive/> Restaurant: {review.name}. Type: {review.categories[0].title} {review.rating} {review.price}</p>
							</div>
							)
					})}
				</div>
				:null}

				{this.props.currentTab === 2 ?
				<div>
					<h1>Cats</h1>
					{this.props.gifsSource.map((gif,i) => {
						return ( 
							<div key={gif.id} className="list">
								<Image style={this.props.style[0] === true && this.props.style[1] ? {backgroundColor: 'yellow' } : {backgroundColor: 'none' } } src={star} className="star" data-id={gif.id} onClick={this.props.handleStar.bind(this,gif.id)} responsive/>
								<Image key={i} src={gif.gif_source} alt={i-1} responsive/>
							</div>
							)
					})}
				</div>
				:null}

				{this.props.currentTab === 3 && this.props.faves.length > 0 ?
				<div>
					<h1>My faves</h1>
					{this.props.faves.map((fave,i) => {
						return <p>{fave}</p>
					})}
					{console.log(this.props.faves)}
				</div>
				:null}
			</div>
			)
	}
}

export default Feed;