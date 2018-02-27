import React from 'react';
import InputError from './InputError.jsx';
import TextInput from './TextInput.jsx';


export default class Department extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.test = this.test.bind(this);
		this.validate = this.validate.bind(this);
		this.state = {
			displayClass: 'invisible'
		};
	}
	
	handleClick(e) {
		let displayClass = 'invisible';
		if (e.target.value == 'other') {
			displayClass = 'visible'
		}
	
		if (this.props.onChange) {
			this.props.onChange(e.target.value);
		}
	
		this.setState({
			displayClass: displayClass
		});
	}
	
	test(e) {
		if(this.props.onChange) {
			this.props.onChange('other-' + e.target.value);
		}
	}
	
	validate(e) {
		return true;
	}
	
	render() {
		return (
			<div className="department">
			  <select onChange={this.handleClick} multiple={false} ref="department">
				<option value="none">Select department</option>
				<optgroup label="College">
				  <option value="muir">Muir</option>
				  <option value="revelle">Revelle</option>
				  <option value="sixth">Sixth</option>
				</optgroup>
				<optgroup label="School">
				  <option value="jacobs">Jacobs School of Engineering</option>
				  <option value="global">School of Global Policy and Strategy</option>
				  <option value="medicine">School of Medicine</option>
				</optgroup>
				<option value="scholarships">Scholarships</option>
				<option value="other">Other</option>
			  </select>
			  <div className={this.state.displayClass}>
				<TextInput 
				  ref="any-department"
				  text="Department"
				  uniqueName="department"
				  required={true}
				  minCharacters={3}
				  validate={this.validate}
				  onChange={this.test}
				  errorMessage="Department is invalid"
				  emptyMessage="Department is required" />
			  </div>
			  <InputError 
				visible={this.state.errorVisible} 
				errorMessage={this.state.errorMessage} />
			</div>
		);
	}
}

/* 
<input className="anyValue" type="text" placeholder="Department" ref="any-department" />
*/