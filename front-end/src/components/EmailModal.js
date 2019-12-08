import React, { Component } from "react"
import Modal from "react-bootstrap/Modal"
import  Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import Container from "react-bootstrap/Container"

class EmailModal extends Component {
	render() {
		return (
		<Container>
			<Modal
			{...this.props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
		  	>
			<Modal.Header closeButton>
			  <Modal.Title id="contained-modal-title-vcenter">
				Send URL to Email
			  </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FormControl
					placeholder="Enter Email"
					value={this.props.email}
					onChange={this.props.handleEmailChange}

				/>
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="danger" onClick={this.props.onHide}>Close</Button>
			  <Button variant="primary" onClick={this.props.handleSubmit}>Submit</Button>
			</Modal.Footer>
		  </Modal>
		</Container>	
		)
	}
}

export default EmailModal
