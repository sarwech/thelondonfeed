import React, { Component } from 'react';

class Header extends Component {
	render() {
		return <h1>Hello World</h1>
	}
}

export default Header;



// 1. App.js (light red) - entire app

// 2. Header.js (green) - displays static and receives user selection

// 3. Feed.js (maroon) - displays and filters data based on user input (from Header)

// 4. FeedRow.js (green) - displays a row for each item in the Feed list