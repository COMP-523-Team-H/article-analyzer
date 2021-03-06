import React, { Component } from "react"


import Annotation from "./Annotation"


class AnnotationList extends Component {
	
	render() {
		const annotations = this.props.annotations? 
			this.props.annotations.map((annotation) => 
				<Annotation 
					workspace={annotation.workspace}
					id={annotation.id}
					key={annotation.id}
					name={annotation.name}
					content={annotation.content}
					color={annotation.color}
					range={annotation.range}
					selectAnnotation={this.props.selectAnnotation}
					collapsed={annotation.collapsed}
					animated={annotation.animated}
					type={annotation.type}
					new={annotation.new}
					deleteAnnotation={this.props.deleteAnnotation}
				/>
			)
		:null;
		
		return (
				annotations
		);
	}
}

export default AnnotationList