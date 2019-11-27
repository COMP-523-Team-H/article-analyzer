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
	}

	componentDidMount() {
		req.get(hostname + '/api/workspace/' + this.state.workspace)
			.then((response) => response.json().then(data => {
				this.setState({
					id: this.state.id,
					date: data.date,
					original_url: data.original_url,
					content: data.content
				}, ()=>{
					$(".imageWrap").click((e)=>{
						var id = e.currentTarget.id;

					})
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
						annotation.animated = false;
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

	imageAnnotation(id){
		$("#"+id).addClass("image-"+this.state.color);
		var annotation = {
			id,
			time: "now",
			content:"",
			color:this.state.color,
			type: "image"
		}

		// Paused here. Need to figure out how to refactor annotation class for both image and annotation
		this.setState({
			pendingAnnotation: annotation
		})
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
		// DARKENED HIGHLIGHT AREA
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
		
		var animation_move;
		var new_highlight;
		if(selected){
			if(selected.id === annotation.id){
				animation_move = 0;
				new_highlight = 400;
			}else{
				new_highlight = $(annotation.range.startContainer).offset().top;
				var str = $("#"+annotation.id).css("top");
				$(".annotation").css("top", 0);
				var original = $("#"+annotation.id).offset().top;
				$(".annotation").css("top", str);
				animation_move = new_highlight - original;
				
			}
		}else{
			new_highlight = $(annotation.range.startContainer).offset().top;
			animation_move = new_highlight - $("#"+annotation.id).offset().top;
		}

		if(animation_move<0){
			animation_move = 0;
		}
		$('html, body').stop().animate({ scrollTop: new_highlight -300}, 500);
		$(".annotation").stop().animate({"top": animation_move+"px"}, 500, "linear");

		// annimation_move = 
		// console.log(annotation_move)
		
		// console.log($("#"+annotation.id).offset().top);
		// var jump = $(this).attr('href');
		// var new_position = $(jump).offset();
		// 
		// e.preventDefault();
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
					<Col xs={4} id="rightColumn">
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
						<div id="annotationSection">
							<AnnotationList
								workspace={this.state.workspace}
								annotations={this.state.annotations}
								selectAnnotation={this.selectAnnotation}
							/>
							{pendingAnnotation}
						</div>
						
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