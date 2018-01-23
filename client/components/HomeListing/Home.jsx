import React from 'react';

import Photo from './Photo.jsx';
import Saves from './Saves.jsx';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.toggleSave = this.toggleSave.bind(this);
		
	}
	
	// pass to the top level of parent, where whole list resides
	toggleSave(index) {
		return this.props.onToggleSave(index);
	}
	
	render() {
		// photo and saves are seperated into new children (may have special functions)
		return (
			<div className="home">
				<span className="homeAddress">
					{this.props.address}
				</span>
				<Photo src={this.props.photo} />
				<span className="homeDescription">
					{this.props.children}
				</span>	
				<Saves 
					id={this.props.id}
					handleSave={this.toggleSave}
					isSaved={this.props.isSaved}
					numSaves={this.props.numSaves} 
				></Saves>
			</div>
		);
	}
}