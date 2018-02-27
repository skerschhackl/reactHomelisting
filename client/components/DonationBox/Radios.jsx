import React from 'react';
import InputError from './InputError.jsx';

export default class Radios extends React.Component {
	constructor(props) {
		super(props);
		this.handleAnyChange = this.handleAnyChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			display: 'invisible',
			displayClass: 'invisible',
			valid: false,
			errorMessage: 'Input is invalid',
			errorVisible: false
		}
	}
	
	handleClick(displayClass, e) {
		// hide "any value" text field if any other option is clicked
		if (displayClass == 'invisible') {
			this.setState({
				displayClass: displayClass,
				errorVisible: false
			});
		} else {
			this.setState({
				displayClass: displayClass
			});
		}
		
		if (e.target.value !== "any" && this.props.onChange) {
			this.props.onChange(e);
		}
	}
	
	handleAnyChange(e) {
		// special validation for optional "any value" field
		// call parent validation and set error states accordingly
		if (this.props.anyValidation(e.target.value)) {
			this.setState({
				valid: true,
				errorMessage: 'Input is invalid',
				errorVisible: false
			});
			this.props.onChange(e);
			
		} else {
			this.setState({
				valid: false,
				errorMessage: this.props.anyErrorMessage,
				errorVisible: true
			});
		}
		
	}
	
	render() {
		let rows = [];
		let label = '';
		var ia = 0;
		for (let i = 0; i < this.props.values.length; i++) {
			// we want to display the value as part of additional text
			label = this.props.itemLabel.replace('[VALUE]', this.props.values[i]);
			
			// react gives errors if <br /> filed has no key
			rows.push(<div key={this.props.name + '-div-' + i}><input
			  key={this.props.name + '-' + i}
		  	  type="radio"
			  ref={this.props.name + '-' + this.props.values[i]}
			  name={this.props.name}
			  value={this.props.values[i]}
			  onClick={this.handleClick.bind(this, 'invisible')} />
			  
			<label
			  key={this.props.name + '-label' + i}
			  htmlFor={this.props.values[i]}>{label}</label>
			  
			<br key={this.props.name + ' -br-' + i} /></div>);
			ia++;
		}
		
		  // the "any value" field complicates things a bit
		  if (this.props.addAny) {
			// passed seperate label for that option
			label = this.props.anyLabel;
			rows.push(<input
  			  key={this.props.name + '-' + ia}
  			  type="radio"
  			  ref={this.props.name + ' -any'}
			  name={this.props.name}
			  value="any"
			  onClick={this.handleClick.bind(this, 'visible')} />,
			
			  <label key={this.props.name + '-label-' + ia}
			  htmlFor={this.props.values[ia]}>{label}</label>);
			
			// add the "any value" text field with all its special vars
			rows.push(<div key={this.props.name + '-div-' + (ia+1)}
						   className={this.state.displayClass}>
			  <input
				className="anyValue"
				key={this.props.name + '-' + (ia+2)}
				type="text"
				placeholder={this.props.anyPlaceholder}
				onChange={this.handleAnyChange}
				ref={this.props.name} />
			</div>);
		  } 
		
		
		// return all rows
		return(
			<div className="radios">
			{rows}
			<InputError
			visible={this.state.errorVisible}
			errorMessaeg={this.state.errorMessage} />
			</div>
		);
	}
}