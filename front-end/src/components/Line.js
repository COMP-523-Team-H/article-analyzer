import React, { Component } from "react"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xOffset: null,
			yOffset: null,
			annoX: null,
			annoY: null,
			contX: null,
			contY: null,
			color: props.color,
			mounted: false,
			type:this.props.type,
		}
	}

	componentDidMount() {
		//get offset from right column
		var colRect = document.getElementById("rightColumn").getBoundingClientRect();

		//get bounding rects of annotation and range start
		var annotation = document.getElementById(this.props.annoId);
		var annoRect = annotation.getBoundingClientRect();
		var startConRect;
		if(this.state.type==="text"){
			var startCon = this.props.range.startContainer;
			startConRect = startCon.getBoundingClientRect();
		}else{
			startCon = document.getElementById(this.props.range);
			startConRect = startCon.getBoundingClientRect();
		}
		var annoY = annoRect.y + (annoRect.height / 2) + window.pageYOffset;
		var contY = startConRect.y + window.pageYOffset;
	

		this.setState({
			xOffset: colRect.x,
			yOffset: colRect.y + window.pageYOffset,
			annoX: annoRect.x,
			annoY: annoRect.y + (annoRect.height / 2) + window.pageYOffset,
			contX: startConRect.x + startConRect.width -10,
			contY: startConRect.y + window.pageYOffset
		})

		this.setState({ mounted: Math.abs(annoY-contY)<1000 });
	}

	componentDidUpdate(prevProps, prevState) {
		//get bounding rects of annotation and range start
		var annotation = document.getElementById(this.props.annoId);
		var annoRect = annotation.getBoundingClientRect();

		if (annoRect.y + (annoRect.height / 2) + window.pageYOffset !== this.state.annoY) {
			this.setState({
				annoX: annoRect.x,
				annoY: annoRect.y + (annoRect.height / 2) + window.pageYOffset,
				mounted: Math.abs(annoRect.y + (annoRect.height / 2) + window.pageYOffset-this.state.contY)<700
			});
		}
		
	}

	render() {
		return (this.state.mounted ?
			<svg
				id={"svg-" + this.props.annoId}
				style={{
					position: "absolute",
					left: 0 - this.state.xOffset,
					top: 0 - this.state.yOffset,
					zIndex: -100
				}}
				width={document.body.clientWidth}
				height={document.body.clientHeight}
			>
				<line
					x1={this.state.annoX}
					y1={this.state.annoY}
					x2={this.state.contX}
					y2={this.state.contY}
					style={{ stroke: this.state.color, strokeWidth: 2 }}
				/>
			</svg>
			:
			null
		);
	}
}


export default Annotation