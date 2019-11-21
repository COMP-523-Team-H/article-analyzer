import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


class PendingAnnotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			content: props.content,
			id: props.id,
			color:props.color,
			range:props.range,
		}
		this.handleChange = this.handleChange.bind(this);
		
	}


	handleChange(e) {
		this.setState({
			content: e.target.value,
		});
	}

	render() {
		const content = 
			<Fragment>
				<Form.Control
					as="textarea"
					rows="3"
					onChange={(e) => this.handleChange(e)}
				/>
				<Button
					variant="secondary"
					onClick={(e) => {this.props.finishAnnotation(this.state)}}
				>
					Submit
				</Button>
			</Fragment>

		return (
			<Container id={this.state.id} className="annotation">
				<b>{this.state.name}</b>
				{content}
			</Container>
		);
	}
}



export default PendingAnnotation;