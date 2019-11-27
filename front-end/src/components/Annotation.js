import React, { Component } from "react"
import Container from "react-bootstrap/Container"

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
			collapsed: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({collapsed: !this.state.collapsed},()=>{this.props.selectAnnotation(this.state)})
	}


	render() {
		var content = this.state.collapsed && this.state.content.length>140? this.state.content.substr(0,140)+" ..." : this.state.content;
		return (
			<Container id={this.state.id} className="annotation" onClick={this.handleClick} style={{backgroundColor: this.state.color}}>
				<b className="annotationHeader">{this.state.name}</b><br /> 
				<span className="annotationContent">{content}</span>
			</Container>
		);
	}
}


export default Annotation