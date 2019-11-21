import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import $ from "jquery"
import uuidv4 from "uuid/v4"


import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'
import AnnotationList from './AnnotationList'
import NameInput from './NameInput'
import ColorSelection from "./ColorSelection"
import PendingAnnotation from "./PendingAnnotation"
import CreateButton from "./CreateButton"

import rangy from "../util/rangy"
import req from "../util/req"


const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";

class Workspace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workspace: this.props.match.params.id,
			date: null,   // fix date 
			original_url: null,
			content: "",
			collabName: "stupidFish",
			collaborators: null,
			annotations: null,
			nameSet: false,
			pendingAnnotation: null,
			pendingRange: null,
			color: "gray",
			selectedAnnotation: null
		}
		this.createAnnotation = this.createAnnotation.bind(this);
		this.addCollabName = this.addCollabName.bind(this);
		this.finishAnnotation = this.finishAnnotation.bind(this);
		this.setColor = this.setColor.bind(this);
		this.selectAnnotation = this.selectAnnotation.bind(this);
		this.collapseAnnotation = this.collapseAnnotation.bind(this);
	}

	componentDidMount() {
		req.get(hostname + '/api/workspace/' + this.state.workspace)
			.then((response) => response.json().then(data => {
				this.setState({
					id: this.state.id,
					date: data.date,
					original_url: data.original_url,
					content: data.content
				});
			})
			);

		req.get(hostname + '/api/annotation/all/' + this.state.workspace)
			.then((response) => response.json()
				.then(data => {
					var annotations = data.annotations;
					annotations.forEach(annotation => {
						var range = new Range();
						var startNode = document.getElementById(annotation.range.start);
						var endNode = document.getElementById(annotation.range.end);
						annotation.range = range;
						range.setStart(startNode, 0);
						range.setEnd(endNode, 0);
						rangy.highlight(range, annotation.color);
						rangy.addTarget(range, annotation.id);
						annotation.collapsed = false;
					})
					this.setState({
						annotations: annotations.map(v => ({ ...v, finished: true }))
					});
				})
				.then(() => {
					this.state.annotations.forEach((annotation) => {
						$("#" + annotation.id).click(this.selectAnnotation);
					})
					// rangy.addClick(range);
				})
			);


		req.get(hostname + '/api/collaborators/' + this.state.workspace)
			.then((response) => response.json().then(data => {
				this.setState({
					collaborators: data
				});
			})
			);
	}

	addCollabName(name) {
		this.setState({
			collabName: name,
			nameSet: true
		})
	}

	setColor(color) {
		this.setState({ color });
	}

	createAnnotation(annotation) {
		var selectedText;
		var range;
		if (window.getSelection) {
			selectedText = window.getSelection();
		}
		if (selectedText.rangeCount > 0) {
			range = selectedText.getRangeAt(0);
			if (range.collapsed) {
				return;
			}
			if (range.commonAncestorContainer.id !== "content") {
				alert("Illegal Annotation Selection");
				return;
			}
			rangy.highlight(range, this.state.color);
			this.setState({
				pendingAnnotation: annotation,
				pendingRange: range
			})
		} else {
			alert("No text selected");
		}
	}

	finishAnnotation(annotation) {
		var range = rangy.compress(this.state.pendingRange);
		rangy.addTarget(this.state.pendingRange, annotation.id);
		// rangy.addClick(this.state.pendingRange);
		fetch(hostname + '/api/annotation/insert', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...annotation,
				range,
				workspace: this.state.workspace
			})
		}).then((response) => {
			// add response validation
			var newCollaborators = this.state.collaborators;
			var collabName = this.state.collabName;
			newCollaborators[collabName] = !this.state.collaborators || !this.state.collaborators[collabName] ? 1 : newCollaborators[collabName] + 1;

			$("#" + annotation.id).click(this.selectAnnotation);
			this.setState({
				pendingAnnotation: null,
				collaborators: newCollaborators,
				pendingRange: null,
				annotations: [...this.state.annotations, annotation]
			})
		});

	}

	selectAnnotation(annotation) {
		if (annotation.type === "click") {
			return;
		}
		// console.log(annotation);
		var selected = this.state.selectedAnnotation;
		if (!selected) {
			rangy.addOverlay(annotation.range, annotation.color);
			this.setState({ selectedAnnotation: annotation });
		} else if (selected.id !== annotation.id) {
			rangy.addOverlay(annotation.range, annotation.color);
			rangy.removeOverlay(selected.range, selected.color);
			this.setState({ selectedAnnotation: annotation });
		} else {
			rangy.removeOverlay(selected.range, selected.color);
			this.setState({ selectedAnnotation: null });
		}
	}

	collapseAnnotation(annotation) {
		this.setState({
			annotations: this.state.annotations.map((a) => {
				if (a.id === annotation.id) {
					a.collapsed = !a.collapsed;
				}
				return a;
			})
		})
	}

	renderAllConnections() {
		this.state.annotations.forEach((a) => {
			this.renderConnection(a.id);
		});
	}

	//getBoundingClientRect() provides coordinates in the viewport
	//scrolling will change these coordinates!
	renderConnection(annoId) {
		var annotation = document.getElementById(annoId);
		var annoRect = annotation.getBoundingClientRect();
		var annoX = annoRect.x;
		var annoY = annoRect.y + (annoRect.height / 2);

		var stateAnno = this.state.annotations.find((a) => a.id == annoId);
		var startCon = stateAnno.range.startContainer;
		var startConRect = startCon.getBoundingClientRect();
		var startConX = startConRect.x + startConRect.width;
		var startConY = startConRect.y;

		console.log(startConX + ", " + startConY + " : " + annoX + ", " + annoY);

		var c = document.getElementById("connCanv");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(startConX, startConY);
		ctx.lineTo(annoX, annoY);
		ctx.stroke();
	}

	render() {
		var pendingAnnotation = this.state.pendingAnnotation ?
			<PendingAnnotation
				name={this.state.collabName}
				id={uuidv4()}
				finishAnnotation={this.finishAnnotation}
				color={this.state.color}
				range={this.state.pendingRange}
			/> : null;

		return (
			<Container>
				<Row>
					<h1>{this.state.original_url}</h1>
					<Col xs={8}>
						<Share
							urlID={this.state.workspace}
							content={this.state.content}
						/>
						<Website content={this.state.content} />
					</Col>
					<Col xs={4}>
						<NameInput
							nameSet={this.state.nameSet}
							addCollabName={this.addCollabName}
						/>
						<ColorSelection
							onClick={this.setColor}
						/>
						<Collaborators
							collaborators={this.state.collaborators}
						/>
						<CreateButton
							createAnnotation={this.createAnnotation}
						/>
						<button onClick={() => {this.renderAllConnections()}}>conns</button>
						<AnnotationList
							workspace={this.state.workspace}
							annotations={this.state.annotations}
							selectAnnotation={this.selectAnnotation}
							collapseAnnotation={this.collapseAnnotation}
						/>
						{pendingAnnotation}
					</Col>
				</Row>
				<canvas
					style={canvasStyle} 
					id="connCanv"
					width={window.innerWidth}
					height={window.innerHeight} />
			</Container>
		)
	}
}

const canvasStyle = {
	position: "absolute",
	top: "0",
	left: "0",
	zIndex: "-100"
}

export default Workspace