import React, { Component } from "react"

class Annotation extends Component {
	constructor(props) {
		super(props);

		//get bounding rects of annotation and range start
		var annotation = document.getElementById(props.annoId);
		var annoRect = annotation.getBoundingClientRect();
		var startCon = props.range.startContainer;
		var startConRect = startCon.getBoundingClientRect();

		this.state = {
			annoX: annoRect.x,
			annoY: annoRect.y + (annoRect.height / 2),
			contX: startConRect.x,
			contY: startConRect.y,
			color: props.color
		}
	}

	render() {
		return (
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
					style="stroke:rgb(128,128,128); stroke-width:2"
				/>
			</svg>
		);
	}
}


export default Annotation