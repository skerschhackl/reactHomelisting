import React from 'react';
import InputError from './InputError.jsx';

export default class Payment extends React.Component {
	constructor(props) {
		super(props);
		this.handleLinkClick = this.handleLinkClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			displayClass: 'invisible'
		};
	}
	
	handleLinkClick(e) {
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}
	
	handleInputChange(e) {
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}
	
	handleClick(displayClass, e) {
		
		this.setState({
			displayClass: displayClass
		});
	}
	
	render() {
		// we take full control over the checkbox to show additional options
		let optionsClass = 'invisible';
		let isChecked = false;
		if (this.state.displayClass == 'invisible') {
			optionsClass = 'visible';
		} else {
			isChecked = true;
		}
		
		return (
			<div className="payment">
			  <a onClick={this.handleLinkClick} name="paypal">PayPal button goes here</a>
			  <br />
			<input type="checkbox" checked={isChecked} onChange={this.handleClick.bind(this, optionsClass)}
				name="card" />Pay with card <br />
			<div id="Choices" className={this.state.displayClass}>Credit Card Information <br />
			  <input type="text" placeholer="Card number" name="cardnum" 
					onChange={this.handleInputChange} /> Card number <br />
			  <input type="text" placeholer="CVV" name="cardcvv"
				 	onChange={this.handleInputChange} /> CVV <br />
			  <input type="text" placeholer="Card holder" name="cardholder"
				 	onChange={this.handleInputChange} /> Card holder <br />
			</div>
			<InputError
			  visible={this.state.errorVisible}
			  errorMessage={this.state.errorMessage} />
			</div>
		);
	}
}