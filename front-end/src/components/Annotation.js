import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Line from "./Line"
import constant from "../util/constant"
import color from "../util/color"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: props.type,
			name: props.name,
			content: props.content,
			id: props.id,
			color: props.color,
			range: props.range,
			collapsed: props.collapsed,
			animated: props.animated,
			new: props.new
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({ collapsed: !this.state.collapsed }, () => { this.props.selectAnnotation(this.state) })
	}

	render() {
		var content = this.state.collapsed && this.state.content.length > 140 ? this.state.content.substr(0, 140) + " ..." : this.state.content;
		var deleteButton = this.state.new ? <Button variant="secondary" onClick={(e) => {this.props.deleteAnnotation(this.state.id)}}>Delete</Button> : null;
		return (
			<Fragment>
				<Container
					id={this.state.id}
					className="annotation"
					onClick={this.handleClick}
					style={{ backgroundColor: color.rgba(constant.COLOR[this.state.color], 0.55) }}
				>
					<b className="annotationHeader">{this.state.name}</b><br />
					<span className="annotationContent">{content}</span>
					{deleteButton}
				</Container>
				<Line 
					annoId={this.state.id}
					range={this.state.range}
					color={this.state.color}
					type={this.state.type}
				/>
			</Fragment>
		);
	}
}


export default Annotation