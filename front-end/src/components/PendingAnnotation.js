import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


class PendingAnnotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: props.type,
			name: props.name,
			content: "",
			id: props.id,
			color:props.color,
			range:props.range,
			collapsed: false
		}
		this.handleChange = this.handleChange.bind(this);
		
	}


	handleChange(e) {
		console.log(this.state.type);
		this.setState({
			content: e.target.value,
			collapsed: e.target.value.length>140
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
				<h5>{this.state.name}</h5>
				{content}
			</Container>
		);
	}
}



export default PendingAnnotation;