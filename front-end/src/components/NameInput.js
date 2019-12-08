import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"


class NameInput extends Component {
    constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(e) {
		this.setState({ name: e.target.value })
	}
	checkName(){
		if(!this.state.name.replace(/\s/g, '').length){
			alert("Please enter a real name!");
		}
		else{
			if(this.state.name.length > 30){
				alert("Please enter a shorter name under 30 characters!")
			}else{
				this.props.addCollabName(this.state.name)
			}
			
		}
	}
    
	render() {
        const input = this.props.nameSet ?
			<div style = {{frontSize:"20pt"}}>[{this.state.name}]</div>
			:
			<Fragment>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Enter Name To Annotate"
						value={this.state.name}
						onChange={this.handleChange}
						aria-label="Website URL"
						aria-describedby="submitURL"
					/>
					<InputGroup.Append>
						<Button
							variant="secondary"
							onClick={(e) => {this.checkName()}}
						>
							Submit
							</Button>
					</InputGroup.Append>
				</InputGroup>
			</Fragment>
		return (
			<Container>
				{input}
			</Container>
		)
	}
}


export default NameInput