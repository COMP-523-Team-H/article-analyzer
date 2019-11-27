import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Line from "./Line"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			content: props.content,
			id: props.id,
			color: props.color,
			range: props.range,
			collapsed: props.collapsed
		}
	}
	//	<Line annoId={this.state.id} range={this.state.range} color={this.state.color}/>
	render() {
		var content = this.state.collapsed ? this.state.content.substr(0, 140) + " ..." : this.state.content;
		return (
			<Fragment>
				<Container
					id={this.state.id}
					className="annotation"
					onClick={() => { this.setState({ collapsed: !this.state.collapsed }) }}
					style={{backgroundColor: this.state.color}}>
					<b className="annotationHeader">{this.state.name}</b><br />
					<span className="annotationContent">{content}</span>
				</Container>
			</Fragment>
		);
	}
}


export default Annotation