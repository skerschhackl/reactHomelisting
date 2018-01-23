import React from 'react';
import Home from './HomeListing/Home.jsx';

export default class HomeListing extends React.Component {
	constructor(props) {
		super(props);
		this.loadHomesFromServer = this.loadHomesFromServer.bind(this);
		this.loadSavesFromServer = this.loadSavesFromServer.bind(this);
		this.toggleSave = this.toggleSave.bind(this);
		this.state = {
			homes: [],
			saves: []
		}
	}
	
	loadHomesFromServer() {
		let homes = [
				{
					"address": "12345 Beverly Dr",
					"description": "This is a home in the city",
					"photo": "client/assets/images/home.jpg",
					"saves": 52,
					"saved": false
				},
				{
					"address": "98765 Tweety Ln",
					"description": "This is a home in the suburbs",
					"photo": "client/assets/images/home.jpg",
					"saves": 123,
					"saved": true
				},
				{
					"address": "1 Small St.",
					"description": "This is a nice little country home",
					"photo": "client/assets/images/home.jpg",
					"saves": 189,
					"saved": false
				}
			];
		this.setState({
			homes: homes
		});
	}
	
	loadSavesFromServer() {
		let saves = [
			{
				"saves": 52,
				"saved": false
			},
			{
				"saves": 123,
				"saved": true
			},
			{
				"saves": 189,
				"saved": false
			},
		];
		this.setState({
			saves: saves
		});
	}
	
	toggleSave(index) {
		let saves = this.state.saves;
		
		if(saves[index].saved) {
			saves[index].saves--;
			saves[index].saved = false;
		}
		else {
			saves[index].saves++;
			saves[index].saved = true;
		}
		
		this.setState({
			saves: saves
		});
		
		// @todo: save information to database
		
		// return whether it's saved in case child needs information
		return saves[index].saved;
	}
	
	componentDidMount() {
		this.loadHomesFromServer();
		this.loadSavesFromServer();
		console.log(this.state);
		// if saves need to be updated, we can continously poll server for changes
		// setInterval(this.loadSavesFromServer, this.props.pollInterval);
	}
	
	render() {
	    var saves = this.state.saves;
	    var toggleSave = this.toggleSave;
		
		var homeNodes = this.state.homes.map(function(home, index) {
			if(typeof(saves[index]) == "undefined") {
				saves[index] = {saves: 0};
			}
			return (
				<Home
					key={index}
					id={index}
					onToggleSave={toggleSave}
					isSaved={saves[index].saved}
					photo={home.photo}
					address={home.address}
					numSaves={saves[index].saves}
					>
					{home.description}
				</Home>
			);
			
		});
		return (
			<div className="homeList"> 
				{homeNodes}
			</div>
		);
	}
}



