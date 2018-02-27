import React from 'react';
import Department from './Department.jsx';
import InputError from './InputError.jsx';
import TextInput from './TextInput.jsx';
import Radios from './Radios.jsx';
import Payment from './Payment.jsx';

export default class DonationForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setContributor = this.setContributor.bind(this);
		this.setDepartment = this.setDepartment.bind(this);
		this.setDonationValue = this.setDonationValue.bind(this);
		this.setPayment = this.setPayment.bind(this);
		this.handleErrorMsg = this.handleErrorMsg.bind(this);
		this.setErrorMsg = this.setErrorMsg.bind(this);
		this.state = {
			contributor: "",
			department: "",
			donationVal: "",
			paypal: false,
			cardnum: "",
			cardcvv: "",
			cardholder: "",
			errorMsg: "--"
		}
	}
		
	handleSubmit(e) {
		e.preventDefault();
		
		let contributor = this.state.contributor.trim();
		let department = this.state.department.trim();
		let donationVal = this.state.donationVal.trim();
		if(contributor === '' || department === '' || donationVal === ''){
			this.handleErrorMsg();
			return;
		}
		
		let cnum = this.state.cardnum.trim();
		let ccvv = this.state.cardcvv.trim();
		let cholder = this.state.cardholder.trim();
		if (cnum.trim() === '' || ccvv.trim() === '' || cholder.trim() === '') {
			return;
		}
		
		console.log('props: ' + this.props);
		
		// submit to parent component
		this.props.onDonationSubmit({
			contributor: allElements[0],
			department: allElements[1],
			donationVal: allElements[2],
			paypal: this.state.paypal,
			cardnum: cnum,
			cardcvv: ccvv,
			cardholder: cholder
		});
	}
	
	handleErrorMsg() {
		let requiredElem = {
			'contributor' : this.state.contributor.trim(),
			'department' : this.state.department.trim(),
			'donation' : this.state.donationVal.trim()
		};
		console.log('reqElem ' + this.state.donationVal.trim());
				
		var missing = "";
		for(var key in requiredElem) {
			if (requiredElem.hasOwnProperty(key) && requiredElem[key] == "") {
				missing += key + ', ';
			}  
		}
		console.log(missing);
		if (missing != "") {
			this.setErrorMsg('Missing values: ' + missing.slice(0, -2));
			return;
		}
	}
	
	validateEmail(value) {
		let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(value);
	}
	
	validateDollars(value) {
		let regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
		return regex.test(value);
	}
	
	commonValidate() {
		//do general validation here
		return true;
	}
	
	setContributor(event) {
		this.setState({
			contributor: event.target.value
		});
	}
	
	setDepartment(value) {
		this.setState({
			department: value 
		});
		console.log('change');
		this.setErrorMsg('no');
	}
	
	setDonationValue(e) {		
		this.setState({
			donationVal: e.target.value
		});
	}
	
	setPayment(e) {
		console.log(e.target.name);
		
		if (e.target.name == "paypal") {
			this.setState({
				paypal: true
			});
		} else if (e.target.name == "cardnum") {
			// @todo: validate Number!!
			
			this.setState({
				cardnum: e.target.value,
				paypal: false
			});
			
		} else if (e.target.name == "cardcvv") {
			// @todo: validate cvv Number!!
			
			this.setState({
				cardcvv: e.target.value,
				paypal: false
			});
			
		} else if (e.target.name == "cardholder") {			
			this.setState({
				cardholder: e.target.value,
				paypal: false
			});
		}

	}
	
	setErrorMsg(val) {
		this.setState({
			errorMsg: val
		});
		console.log('bla');
	}
	
	render() {
		return (
			<form className="donationForm" onSubmit={this.handleSubmit}>
				<h2>Home Donation</h2>
				
				<TextInput
				  uniqueName= "email"
				  text="Email Address"
				  required={true}
				  minCharacters={6}
				  validate={this.validateEmail}
				  onChange={this.handleEmailInput}
				  errorMessage="Email is invalid"
				  emptyMessage="Email is required" />
				
				<TextInput 
				  ref="contributor"
				  text="Your Name"
				  uniqueName="contributor"
				  required={true}
				  minCharacters={3}
				  validate={this.commonValidate}
				  onChange={this.setContributor}
				  errorMessage="Name is invalid"
				  emptyMessage="Name is required" />
				<br />
				
				{/* this Department component is specialized to include two fileds in one */}
				<h4>Where would you like your donation to go?</h4>
				<Department 
				  onChange={this.setDepartment} />
				<br />
				
				{/* this Radios component is specialized to include two fields in one */}
				<h4>How much would you like to give?</h4>
				<Radios 
				  values={[10, 25, 50]}
				  name="amount"
				  addAny={true}
				  anyLabel="Donate a custom amount"
				  anyPlaceholder="Amount (0.00)"
				  anyValidation={this.validateDollars}
				  anyErrorMessage="Amount is not a valid dollar amount"
				  itemLabel={' Donate $[VALUE]'}
				  onChange={this.setDonationValue} />
				<br />
				  
				<h4>Payment Information</h4>
				<Payment 
				  onChange={this.setPayment} />
				<br />
				  <div className="error">{this.state.errorMsg}</div>  
				<input type="submit" value="Submit" />
			</form>
		);
	}	
}

