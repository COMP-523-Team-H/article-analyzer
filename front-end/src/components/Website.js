import React, { Component } from "react"

class Website extends Component {

	render() {
		const content = this.props.content;
		return (
			<div className="content" id="content" dangerouslySetInnerHTML={{__html: content}}></div>
		)
	}
}

export default Website