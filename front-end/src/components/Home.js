import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

import ErrorPage from "./ErrorPage"
import aboutSvg from "../img/about.svg"
import urlSvg from "../img/url.svg"
import startSvg from "../img/start.svg"

const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			hasError: false,
			aboutX: null,
			aboutY: null,
			urlX: null,
			urlY: null,
			startX: null,
			startY: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getDate = this.getDate.bind(this);
	}

	componentDidCatch(error, info) {
		this.state.setState({ hasError: true });
	}

	componentDidMount() {
		this.positionSvgs();
	}

	handleChange(e) {
		this.setState({ value: e.target.value })
		this.positionSvgs();
	}

	handleSubmit(e) {
		fetch(hostname + '/api/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: this.getDate(),
				original_url: this.state.value
			})
		}).then((response) => {
			console.log(response);
			response.json().then(data => {
				if (!data.id && data.message) {
					//invalid url entered
				}
				else {
					window.location.pathname = data.id;
				}
			})
		}).catch(error => {
			this.setState({ hasError: true });
		});
	}

	getDate() {
		let date = new Date();
		let dateTime = date.toLocaleString();
		return dateTime;
	}

	positionSvgs() {
		var urlBox = document.getElementById("urlBox");
		var ubRect = urlBox.getBoundingClientRect();
		var startButton = document.getElementById("startButton");
		var sbRect = startButton.getBoundingClientRect();

		this.setState({
			aboutX: 200,
			aboutY: 75,
			urlX: ubRect.x - 150,
			urlY: ubRect.y + ubRect.height + 10,
			startX: sbRect.x + (sbRect.width / 2),
			startY: sbRect.y + sbRect.height + 10
		});
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage />
		}
		return (
			<Container>
				<InputGroup style={homeStyle} className="mb-3">
					<FormControl
						id="urlBox"
						placeholder="lorem-ipsum.demo"
						value={this.state.value}
						onChange={this.handleChange}
						aria-label="Website URL"
						aria-describedby="submitURL"
						onKeyPress={(e) => {if(e.key === "Enter") this.handleSubmit()}}
					/>
					<InputGroup.Append>
						<Button
							id="startButton"
							variant="secondary"
							onClick={(e) => this.handleSubmit()}
						>
							Annotate
            			</Button>
					</InputGroup.Append>
				</InputGroup>
				<img src={aboutSvg} alt="about" style={{ ...svgStyle, left: this.state.aboutX, top: this.state.aboutY }} />
				<img src={urlSvg} alt="about" style={{ ...svgStyle, left: this.state.urlX, top: this.state.urlY }} />
				<img src={startSvg} alt="about" style={{ ...svgStyle, left: this.state.startX, top: this.state.startY }} />
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

const svgStyle = {
	position: "absolute",
	width: "200px"
}

export default Home