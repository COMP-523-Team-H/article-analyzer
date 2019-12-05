import React, { Component } from "react"
import Container from "react-bootstrap/Container"

class ScreenSizeWarning extends Component {
	render() {
		return (
			<Container>
				<h3>Your screen is too small!</h3>
				<p>Article Annotator is designed for use on laptops and desktops, not smartphones and tablets.</p>
				<p>Please switch to a device with a larger screen.</p>
			</Container>
		)
	}
}

export default ScreenSizeWarning