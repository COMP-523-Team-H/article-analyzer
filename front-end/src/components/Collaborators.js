import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { generateKeyPair } from "crypto";


class Collaborators extends Component {

	render() {
		var collaborators = this.props.collaborators? Object.keys(this.props.collaborators).map((name, i)=>{
			return <Button style={buttonStyle} id= {name} onClick={this.props.showByName}>
				{name}:{this.props.collaborators[name]}
			</Button>
		}):null;
		return (
			<Container>
				<Fragment>
					<div class="btn-group-vertical">
						{collaborators}
					</div>
				</Fragment>
			</Container>
		)
	}
}

const buttonStyle = {
	backgroundColor: '#add8e6',
	borderColor: "#838383",
	borderRadius: 12,
	color: "black"
}


export default Collaborators