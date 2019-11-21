import React, { Component } from "react"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			annoX: null,
			annoY: null,
			contX: null,
			contY: null,
			color: null
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