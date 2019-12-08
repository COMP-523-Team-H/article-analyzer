import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"


class Collaborators extends Component {
	

	render() {
		var collaborators = this.props.collaborators? Object.keys(this.props.collaborators).map((name, i)=>{
			return <Button style={buttonStyle} id= {name} key ={name} onClick={this.props.showByName}>
				{name}:{this.props.collaborators[name]}
			</Button>
		}):null;
		return (
			<Container>
				<Fragment>
					<div className="btn-group-vertical">
						{collaborators}
					</div>
				</Fragment>
			</Container>
		)
	}
}

const buttonStyle = {
	display: "inline-block",
	backgroundColor: '#add8e6',
	borderColor: "#838383",
	borderRadius: 12,
	color: "black",
	height: "100px"
}


export default Collaborators