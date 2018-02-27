import React from 'react';

/* small error component, displayed inline within every form field form */
export default class InputError extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Input is invalid'
		}
	}
	
	render() {
		let classNames = require('classnames');
		let errorClass = classNames(this.props.className, {
			'error_container': true,
			'visible': this.props.visible,
			'invisible': !this.props.visible
		});
		
		return (
			<div className={errorClass}>
			  <span>{this.props.errorMessage}</span>
			</div>
		);
	} 
}
