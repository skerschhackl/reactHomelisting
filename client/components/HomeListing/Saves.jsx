import React from 'react';

export default class Saves extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
		
	handleSubmit(e) {
		// prevent submitting form and reloading page
		e.preventDefault();
		
		//pass to parent
		var isSaved = this.props.handleSave(this.props.id);
	}
	
	render() {
		//check if user already saved home, change text to indicate
		let savedText = '';
		let submitText = 'Save';

		if (this.props.isSaved) {
			savedText = 'You\'ve saved this home.';
			submitText = 'Remove';
		}
		
		// this could be replaced by a link or image (thumbs-up / like)
		return (
			<div className="saves">
				<form onSubmit={this.handleSubmit}>
					<input type="submit" value={submitText} />
				</form>
				{this.props.numSaves} saves. {savedText}
				
			</div>
		);
	}
}