import React from 'react';
import InputError from './InputError.jsx';

export default class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.validation = this.validation.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = {
			isEmpty: true,
			value: '',
			valid: false,
			errorMessage: 'Input is invalid',
			errorVisible: false
		};
	}
	
	handleChange(e) {
		console.log('handleChange');
		this.validation(e.target.value);
		// call parents onChange method for updating state
		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}
	
	validation(value, valid) {
		if (typeof valid === 'undefined') {
			valid = true;
		}
		
		let message = '';
		let errorVisible = false;
		
		if (!valid) {
			// user leaves filed with invalid value
			// final validation is done in parent and displayed here
			message = this.props.errorMessage;
			valid = false;
			errorVisible = true;
		} 
		else if (this.props.required && jQuery.isEmptyObject(value)) {
			// required field without text
			message = this.props.emptyMessage;
			valid = false;
			errorVisible = true;
		}
		else if (value.length < this.props.minCharacters) {
			// text is entered, length doesn't match
			message = this.props.errorMessage;
			valid = false;
			errorVisible = true;
		}
		
		if (errorVisible) {
			console.log('error!');
		}
		
		// setting state updates display, shows error messages
		this.setState({
			value: value,
			isEmpty: jQuery.isEmptyObject(value),
			valid: valid,
			errorMessage: message,
			errorVisible: errorVisible
		});
	}
	
	handleBlur(e) {
		// final parent validation
		let valid = this.props.validate(e.target.value);
		this.validation(e.target.value, valid);
	}
	
	render () {
		return (
			<div className={this.props.uniqueName}>
			  <input 
				placeholder={this.props.text}
				className={'input input-' + this.props.uniqueName}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				value={this.state.value} />
			  <InputError 
				visible={this.state.errorVisible}
				errorMessage={this.state.errorMessage} />
			</div>
		);
	}
}