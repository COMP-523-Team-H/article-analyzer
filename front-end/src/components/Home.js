import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import ErrorPage from "./ErrorPage"

const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			value: '',
			hasError:false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidCatch(error, info){
		this.state.setState({hasError:true});
	}

	handleChange(e) {
		this.setState({ value: e.target.value })
	}

	handleSubmit(e) {
		fetch(hostname + '/api/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: "outside of time",
				original_url: this.state.value
			})
		}).then((response) => {
			console.log(response);
			response.json().then(data => {
				if(!data.id && data.message){
					//invalid url entered
				}
				else{
					window.location.pathname = data.id;
				}
			})
		}).catch(error=>{
			this.setState({hasError:true});
		});
	}

	render() {
		if(this.state.hasError){
			return <ErrorPage/>
		}
		return (
			<Container>
				<InputGroup style={homeStyle} className="mb-3">
					<FormControl
						placeholder="lorem-ipsum.demo"
						value={this.state.value}
						onChange={this.handleChange}
						aria-label="Website URL"
						aria-describedby="submitURL"
					/>
					<InputGroup.Append>
						<Button
							variant="secondary"
							onClick={(e) => this.handleSubmit()}
						>
							Annotate
            			</Button>
					</InputGroup.Append>
				</InputGroup>
			</Container>
		)
	}
}

const homeStyle = {
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	width: "40%"
}

export default Home