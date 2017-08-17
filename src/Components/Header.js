import React, { Component } from 'react';
import skyline from '../skyline.png';
import { Nav, NavItem , Image } from 'react-bootstrap';

const tabs = ['Updates','Reviews','Cats!','Starred'];

class Header extends Component {

	render() {
		return (
			<div>
				<div className='header'>
					<ul>
						<li><h1>The Feed</h1></li>
						<li><Image src={skyline} alt='banner' responsive /></li>
					</ul>
     <Nav bsStyle='tabs' activeKey={this.props.eventKey} >
       {tabs.map((e, i) => {
       	return <NavItem key={i} eventKey={i} onClick={this.props.handleClick.bind(this,i)}>{e}</NavItem>
       })}
     </Nav>
				</div>
			</div>
			)
	}
}

export default Header;



// 1. App.js (light red) - entire app

// 2. Header.js (green) - displays static and receives user selection

// 3. Feed.js (maroon) - displays and filters data based on user input (from Header)

// 4. FeedRow.js (green) - displays a row for each item in the Feed list