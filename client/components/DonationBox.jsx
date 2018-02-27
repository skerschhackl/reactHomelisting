import React from 'react';
import DonationForm from './DonationBox/DonationForm.jsx'

export default class DonationBox extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: []
		}
	}
	
	handleDonationSubmit(donation) {
		
		console.log('donation');
		console.log(donation);
		return;
		// example to submit form
		$.ajax({
			url: this.props.url,
			dataType:'json',
			type: 'POST',
			data: donation,
			success: function(data) {
				//this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	
	render() {
		return (
		<div className="donationBox"> 
			{/* @todo list new donations here or below submit box*/}
			<DonationForm onDonationSubmit={this.handleDonationSubmit} />
		</div>
		);
	}
}







