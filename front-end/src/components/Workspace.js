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
import ErrorPage from "./ErrorPage"

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
			pendignType:null,
			color: "gray",
			selectedAnnotation: null,
			hasError: false
		}
		this.createAnnotation = this.createAnnotation.bind(this);
		this.addCollabName = this.addCollabName.bind(this);
		this.finishAnnotation = this.finishAnnotation.bind(this);
		this.setColor = this.setColor.bind(this);
		this.selectAnnotation = this.selectAnnotation.bind(this);
		this.imageAnnotation = this.imageAnnotation.bind(this);
	}

	componentDidCatch(error, info){
		this.setState({hasError: true});
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
						this.imageAnnotation(id);
					})
				});
			})
			).catch(error=>{
				this.setState({hasError:true});
			});

		req.get(hostname + '/api/annotation/all/' + this.state.workspace)
			.then((response) => response.json()
				.then(data => {
					var annotations = data.annotations;
					annotations.forEach(annotation => {
						if(annotation.type === "text"){
							var range = new Range();
							var startNode = document.getElementById(annotation.range.start);
							var endNode = document.getElementById(annotation.range.end);
							if(!startNode || !endNode){
								alert("Error during loading the workspace. Try refresh the page")
								return;
							}
							range.setStart(startNode, 0);
							range.setEnd(endNode, 0);
							rangy.highlight(range, annotation.color);
							annotation.collapsed = false;
							annotation.range = range;
						}else{
							rangy.highlight_image(annotation.range, annotation.color);
						}
						
					})
					this.setState({
						annotations: annotations.map(v => ({ ...v, finished: true }))
					});
				})
				.then(() => {
					this.state.annotations.forEach((annotation) => {
						$("#" + annotation.id).click(this.selectAnnotation);
					})
				})
			).catch(error=>{
				this.setState({hasError:true});
			});


		req.get(hostname + '/api/collaborators/' + this.state.workspace)
			.then((response) => response.json().then(data => {
				this.setState({
					collaborators: data
				});
			})
		).catch(error=>{
			this.setState({hasError:true});
		});
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

	imageAnnotation(image){
		$("#"+image).addClass("image-"+this.state.color);
		var annotation = {
			id: uuidv4(),
			time: "now",
			content:"",
			color:this.state.color,
			type: "image",
			range: image
		}

		this.createAnnotation(annotation);
		this.setState({
			pendingAnnotation: annotation,

		})
	}

	createAnnotation(annotation) {
		if(annotation.type === "text"){
			var selectedText;
			var range;
			console.log(annotation);
			if (window.getSelection) {
				selectedText = window.getSelection();
			}
			if (selectedText.rangeCount > 0) {
				range = selectedText.getRangeAt(0);
				if (range.collapsed) {
					return;
				}
				if(!$("#content").has($(range.commonAncestorContainer))
				   || range.startContainer.id === "content"
				   || range.endContainer.id === "content"){
					alert("Illegal Annotation Selection");
					return;
				}
				var startNode = document.getElementById(range.startContainer.parentElement.id);
				var endNode = document.getElementById(range.endContainer.parentElement.id);
				range.setStart(startNode, 0);
				range.setEnd(endNode, 0);
				rangy.highlight(range, this.state.color);
				this.setState({
					pendingAnnotation: annotation,
					pendingRange: range,
					pendingType: "text",
				})
			} else {
				alert("No text selected");
			}
		}
		else{
			rangy.highlight_image(annotation.range, this.state.color);
			this.setState({
				pendingAnnotation:annotation,
				pendingRange: annotation.range,
				pendingType:"image",
			})
		}
		
	}

	finishAnnotation(annotation) {
		var range;
		if(annotation.type ==="text"){
			range = rangy.compress(this.state.pendingRange);
		}else{
			range = annotation.range;
		}
		req.post(hostname + '/api/annotation/insert', 
			{
				...annotation,
				range: range,
				workspace: this.state.workspace
			}
		).then((response) => {
			var newCollaborators = this.state.collaborators;
			var collabName = this.state.collabName;
			newCollaborators[collabName] = !this.state.collaborators || !this.state.collaborators[collabName] ? 1 : newCollaborators[collabName] + 1;

			$("#" + annotation.id).click(this.selectAnnotation);
			this.setState({
				pendingAnnotation: null,
				collaborators: newCollaborators,
				pendingRange: null,
				pendingType:null,
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
			rangy.addOverlay(annotation);
			this.setState({ selectedAnnotation: annotation });
		} else if (selected.id !== annotation.id) {
			rangy.addOverlay(annotation);
			rangy.removeOverlay(selected.range, selected.color);
			this.setState({ selectedAnnotation: annotation });
		} else {
			rangy.removeOverlay(selected);
			this.setState({ selectedAnnotation: null });
		}

		var animation_move;
		var new_highlight;
		if(selected){
			if(selected.id === annotation.id){
				animation_move = 0;
				new_highlight = 400;
			}else{
				if(annotation.type === "text"){
					new_highlight = $(annotation.range.startContainer).offset().top;	
				}else{
					new_highlight = $("#"+annotation.range).offset.top;
				}
				var str = $("#"+annotation.id).css("top");
				$(".annotation").css("top", 0);
				var original = $("#"+annotation.id).offset().top;
				$(".annotation").css("top", str);
				animation_move = new_highlight - original;
			}
		}else{
			if(annotation.type === "text"){
				console.log($(annotation.range.startContainer))
				new_highlight = $(annotation.range.startContainer).offset().top;	
			}else{
				new_highlight = $("#"+annotation.range).offset().top;
			}
			animation_move = new_highlight - $("#"+annotation.id).offset().top;
		}

		if(animation_move<0){
			animation_move = 0;
		}
		$('html, body').stop().animate({ scrollTop: new_highlight -300}, 500);
		$(".annotation").stop().animate({"top": animation_move+"px"}, 500, "linear");
	}

	render() {

		if(this.state.hasError){
			return <ErrorPage/>
		}
		var pendingAnnotation = this.state.pendingAnnotation ?
			<PendingAnnotation
				name={this.state.collabName}
				id={uuidv4()}
				finishAnnotation={this.finishAnnotation}
				color={this.state.color}
				range={this.state.pendingRange}
				type ={this.state.pendingType}
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