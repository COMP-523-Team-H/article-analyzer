import React, { Component } from "react"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			annoX: null,
			annoY: null,
			contX: null,
			contY: null,
			color: props.color,
			mounted: false
		}
	}

	componentDidMount() {
		//get bounding rects of annotation and range start
		var annotation = document.getElementById(this.props.annoId);
		console.log(this.props.annoId);
		var annoRect = annotation.getBoundingClientRect();
		var startCon = this.props.range.startContainer;
		var startConRect = startCon.getBoundingClientRect();

		this.setState({
			annoX: annoRect.x,
			annoY: annoRect.y + (annoRect.height / 2) + window.pageYOffset,
			contX: startConRect.x,
			contY: startConRect.y + window.pageYOffset,
		})

		this.setState({ mounted: true });
	}

	render() {
		return (this.state.mounted ?
			<svg
				style={{ position: "absolute", left: "0", top: "0" }}
				width={document.body.clientWidth}
				height={document.body.clientHeight}
			>
				<line
					x1={this.state.annoX}
					y1={this.state.annoY}
					x2={this.state.contX}
					y2={this.state.contY}
					style={{stroke: this.state.color, strokeWidth: 2, zIndex: -100}}
		/>
			</svg>
			:
			null
		);
	}
}


export default Annotation