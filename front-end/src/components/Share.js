import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import EmailModal from "./EmailModal"
import req from "../util/req"

const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";


class Share extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			email: ''
		}
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	sendEmail(userEmail, copiedURL){
		req.post(hostname + '/api/email', {
			email: userEmail,
			url: copiedURL
		}).then((response) => {
			// add response validation
			alert("Your email was sent!");
			
		});

	}

	onClickHandler = event => {
		const buttonID = event.target.id;
		//copy button
		if (buttonID === 'copyButton') {
			//set what you want to copy here
			let copyContent = hostname + "/" + this.props.urlID;
			this.copyToClipboard(copyContent);
			alert("'" + copyContent + "' was copied to the clip board")

		}
		//download button
		else if (buttonID === 'downloadButton') {
			window.print();	
		}		
	}
	
	copyToClipboard = text => {
		var dummy = document.createElement("textarea");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand("copy");
		document.body.removeChild(dummy);
	}

	handleSubmit = e => {
		let url = hostname + "/" + this.props.urlID;
		let inputEmail = this.state.email;
		//valid email checks
		if(inputEmail == null){
			return;
		}
		if(inputEmail.search("@") === -1 || inputEmail === ""){
			alert("Invalid Email. Please Try Again.")
		}else{
			this.sendEmail(inputEmail, url);
			this.modalClose()
		}	
	  };

	handleEmailChange(e) {
		this.setState({email: e.target.value })
	}

	modalClose = () => this.setState({modalShow:false});

	render() {
		//let modalClose = () => this.setState({modalShow:false});
		return (
			<Container>

				<DropdownButton id="dropdown-basic-button" title="Share" size="lg">
					<Dropdown.Item id="copyButton" href="#/action-1" onClick={this.onClickHandler}>Copy URL</Dropdown.Item>
					<Dropdown.Item id="downloadButton" href="#/action-2" onClick={this.onClickHandler}>Print PDF</Dropdown.Item>
					<Dropdown.Item id="emailButton" href="#/action-3" onClick={()=> this.setState({modalShow: true})}>Email</Dropdown.Item>
				</DropdownButton>

				<EmailModal 
					show = {this.state.modalShow}
					onHide = {this.modalClose}
					handleEmailChange={this.handleEmailChange}
					handleSubmit={this.handleSubmit}
					/>
			</Container>
		)
	}
}

export default Share