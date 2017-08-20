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
						const unique = `${travel.id}${i}`
						return (
							<div key={unique} className="list">
								<Image src={travel && travel.user && travel.user.profile_image_url} alt={i} responsive/>
								<a>{travel.user && travel.user.name}</a>
								<p>
									<Image style={this.props.style[0] === true && this.props.style[1] ? 
										{backgroundColor: 'yellow' } : {backgroundColor: 'none' } } 
										src={star} 
										className="star" 
										data-id={travel.id} 
										onClick={this.props.handleStar.bind(this,travel)} responsive/>
									{travel.text}
								</p>
							</div>
							)
					})}
				</div>
				:null}

				{this.props.currentTab === 1 ?
				<div>
					<h1>Reviews</h1>
					{this.props.reviewsSource.map((review,i) => {
						const unique = `${review.id}${i}`
						return (
							<div key={unique} className='list'>
							<p>
								<Image style={this.props.style[0] === true && this.props.style[1] ? 
								{backgroundColor: 'yellow' } : {backgroundColor: 'none' } } 
								src={star} 
								className="star" 
								data-id={review.id} 
								onClick={this.props.handleStar.bind(this,review)} responsive/>
									Restaurant: {review.name}. 
									Type: {review.categories && review.categories[0] && review.categories[0].title} 
									{review.rating} {review.price}
								</p>
							</div>
							)
					})}
				</div>
				:null}

				{this.props.currentTab === 2 ?
				<div>
					<h1>Cats</h1>
					{this.props.gifsSource.map((gif,i) => {
						const unique = `${gif.id}${i}`
						return ( 
							<div key={unique} className="list">
								<Image style={this.props.style[0] === true && this.props.style[1] ? 
									{backgroundColor: 'yellow' } : {backgroundColor: 'none' } } 
									src={star} 
									className="star" 
									data-id={gif.id} 
									onClick={this.props.handleStar.bind(this,gif)} responsive/>
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
						return (
							<div key={i} className="list">
								{fave.text ? (
									<div>
										<Image src={fave && fave.user && fave.user.profile_image_url} alt={i} responsive/>
										<a>{fave.user && fave.user.name}</a>
										<p>{fave.text}</p>
									</div>
									)
								: fave.name ? 
								<p>Restaurant: {fave.name}. 
								Type: {fave.categories && fave.categories[0] && fave.categories[0].title} 
								{fave.rating} {fave.price}
								</p>
								:<Image src={fave.gif_source} responsive/>	}
							</div>
							)
					})}
				</div>
				:null}
			</div>
			)
	}
}

export default Feed;