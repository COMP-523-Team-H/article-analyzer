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
import ScreenSizeWarning from "./ScreenSizeWarning"

import rangy from "../util/rangy"
import req from "../util/req"


const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";
const animalList = ['Canidae', 'Felidae', 'Cat', 'Cattle', 'Dog', 'Donkey', 'Goat', 'Guinea pig', 'Horse', 'Pig', 'Rabbit', 'Fancy rat varieties', 'laboratory rat strains', 'Sheep breeds', 'Water buffalo breeds', 'Chicken breeds', 'Duck breeds', 'Goose breeds', 'Pigeon breeds', 'Turkey breeds', 'Aardvark', 'Aardwolf', 'African buffalo', 'African elephant', 'African leopard', 'Albatross', 'Alligator', 'Alpaca', 'American buffalo (bison)', 'American robin', 'Amphibian', 'list', 'Anaconda', 'Angelfish', 'Anglerfish', 'Ant', 'Anteater', 'Antelope', 'Antlion', 'Ape', 'Aphid', 'Arabian leopard', 'Arctic Fox', 'Arctic Wolf', 'Armadillo', 'Arrow crab', 'Asp', 'Ass (donkey)', 'Baboon', 'Badger', 'Bald eagle', 'Bandicoot', 'Barnacle', 'Barracuda', 'Basilisk', 'Bass', 'Bat', 'Beaked whale', 'Bear', 'list', 'Beaver', 'Bedbug', 'Bee', 'Beetle', 'Bird', 'list', 'Bison', 'Blackbird', 'Black panther', 'Black widow spider', 'Blue bird', 'Blue jay', 'Blue whale', 'Boa', 'Boar', 'Bobcat', 'Bobolink', 'Bonobo', 'Booby', 'Box jellyfish', 'Bovid', 'Buffalo', 'African', 'Buffalo', 'American (bison)', 'Bug', 'Butterfly', 'Buzzard', 'Camel', 'Canid', 'Cape buffalo', 'Capybara', 'Cardinal', 'Caribou', 'Carp', 'Cat', 'list', 'Catshark', 'Caterpillar', 'Catfish', 'Cattle', 'list', 'Centipede', 'Cephalopod', 'Chameleon', 'Cheetah', 'Chickadee', 'Chicken', 'list', 'Chimpanzee', 'Chinchilla', 'Chipmunk', 'Clam', 'Clownfish', 'Cobra', 'Cockroach', 'Cod', 'Condor', 'Constrictor', 'Coral', 'Cougar', 'Cow', 'Coyote', 'Crab', 'Crane', 'Crane fly', 'Crawdad', 'Crayfish', 'Cricket', 'Crocodile', 'Crow', 'Cuckoo', 'Cicada', 'Damselfly', 'Deer', 'Dingo', 'Dinosaur', 'list', 'Dog', 'list', 'Dolphin', 'Donkey', 'list', 'Dormouse', 'Dove', 'Dragonfly', 'Dragon', 'Duck', 'list', 'Dung beetle', 'Eagle', 'Earthworm', 'Earwig', 'Echidna', 'Eel', 'Egret', 'Elephant', 'Elephant seal', 'Elk', 'Emu', 'English pointer', 'Ermine', 'Falcon', 'Ferret', 'Finch', 'Firefly', 'Fish', 'Flamingo', 'Flea', 'Fly', 'Flyingfish', 'Fowl', 'Fox', 'Frog', 'Fruit bat', 'Gamefowl', 'list', 'Galliform', 'list', 'Gazelle', 'Gecko', 'Gerbil', 'Giant panda', 'Giant squid', 'Gibbon', 'Gila monster', 'Giraffe', 'Goat', 'list', 'Goldfish', 'Goose', 'list', 'Gopher', 'Gorilla', 'Grasshopper', 'Great blue heron', 'Great white shark', 'Grizzly bear', 'Ground shark', 'Ground sloth', 'Grouse', 'Guan', 'list', 'Guanaco', 'Guineafowl', 'list', 'Guinea pig', 'list', 'Gull', 'Guppy', 'Haddock', 'Halibut', 'Hammerhead shark', 'Hamster', 'Hare', 'Harrier', 'Hawk', 'Hedgehog', 'Hermit crab', 'Heron', 'Herring', 'Hippopotamus', 'Hookworm', 'Hornet', 'Horse', 'list', 'Hoverfly', 'Hummingbird', 'Humpback whale', 'Hyena', 'Iguana', 'Impala', 'Irukandji jellyfish', 'Jackal', 'Jaguar', 'Jay', 'Jellyfish', 'Junglefowl', 'Kangaroo', 'Kangaroo mouse', 'Kangaroo rat', 'Kingfisher', 'Kite', 'Kiwi', 'Koala', 'Koi', 'Komodo dragon', 'Krill', 'Ladybug', 'Lamprey', 'Landfowl', 'Land snail', 'Lark', 'Leech', 'Lemming', 'Lemur', 'Leopard', 'Leopon', 'Limpet', 'Lion', 'Lizard', 'Llama', 'Lobster', 'Locust', 'Loon', 'Louse', 'Lungfish', 'Lynx', 'Macaw', 'Mackerel', 'Magpie', 'Mammal', 'Manatee', 'Mandrill', 'Manta ray', 'Marlin', 'Marmoset', 'Marmot', 'Marsupial', 'Marten', 'Mastodon', 'Meadowlark', 'Meerkat', 'Mink', 'Minnow', 'Mite', 'Mockingbird', 'Mole', 'Mollusk', 'Mongoose', 'Monitor lizard', 'Monkey', 'Moose', 'Mosquito', 'Moth', 'Mountain goat', 'Mouse', 'Mule', 'Muskox', 'Narwhal', 'Newt', 'New World quail', 'Nightingale', 'Ocelot', 'Octopus', 'Old World quail', 'Opossum', 'Orangutan', 'Orca', 'Ostrich', 'Otter', 'Owl', 'Ox', 'Panda', 'Panther', 'Panthera hybrid', 'Parakeet', 'Parrot', 'Parrotfish', 'Partridge', 'Peacock', 'Peafowl', 'Pelican', 'Penguin', 'Perch', 'Peregrine falcon', 'Pheasant', 'Pig', 'Pigeon', 'list', 'Pike', 'Pilot whale', 'Pinniped', 'Piranha', 'Planarian', 'Platypus', 'Polar bear', 'Pony', 'Porcupine', 'Porpoise', "Portuguese man o' war", 'Possum', 'Prairie dog', 'Prawn', 'Praying mantis', 'Primate', 'Ptarmigan', 'Puffin', 'Puma', 'Python', 'Quail', 'Quelea', 'Quokka', 'Rabbit', 'list', 'Raccoon', 'Rainbow trout', 'Rat', 'Rattlesnake', 'Raven', 'Ray (Batoidea)', 'Ray (Rajiformes)', 'Red panda', 'Reindeer', 'Reptile', 'Rhinoceros', 'Right whale', 'Roadrunner', 'Rodent', 'Rook', 'Rooster', 'Roundworm', 'Saber-toothed cat', 'Sailfish', 'Salamander', 'Salmon', 'Sawfish', 'Scale insect', 'Scallop', 'Scorpion', 'Seahorse', 'Sea lion', 'Sea slug', 'Sea snail', 'Shark', 'list', 'Sheep', 'list', 'Shrew', 'Shrimp', 'Silkworm', 'Silverfish', 'Skink', 'Skunk', 'Sloth', 'Slug', 'Smelt', 'Snail', 'Snake', 'list', 'Snipe', 'Snow leopard', 'Sockeye salmon', 'Sole', 'Sparrow', 'Sperm whale', 'Spider', 'Spider monkey', 'Spoonbill', 'Squid', 'Squirrel', 'Starfish', 'Star-nosed mole', 'Steelhead trout', 'Stingray', 'Stoat', 'Stork', 'Sturgeon', 'Sugar glider', 'Swallow', 'Swan', 'Swift', 'Swordfish', 'Swordtail', 'Tahr', 'Takin', 'Tapir', 'Tarantula', 'Tarsier', 'Tasmanian devil', 'Termite', 'Tern', 'Thrush', 'Tick', 'Tiger', 'Tiger shark', 'Tiglon', 'Toad', 'Tortoise', 'Toucan', 'Trapdoor spider', 'Tree frog', 'Trout', 'Tuna', 'Turkey', 'list', 'Turtle', 'Tyrannosaurus', 'Urial', 'Vampire bat', 'Vampire squid', 'Vicuna', 'Viper', 'Vole', 'Vulture', 'Wallaby', 'Walrus', 'Wasp', 'Warbler', 'Water Boa', 'Water buffalo', 'Weasel', 'Whale', 'Whippet', 'Whitefish', 'Whooping crane', 'Wildcat', 'Wildebeest', 'Wildfowl', 'Wolf', 'Wolverine', 'Wombat', 'Woodpecker', 'Worm', 'Wren', 'Xerinae', 'X-ray fish', 'Yak', 'Yellow perch', 'Zebra', 'Zebra finch', 'Animals by number of neurons', 'Animals by size', 'Common household pests', 'Common names of poisonous animals', 'Alpaca', 'Bali cattle', 'Cat', 'Cattle', 'Chicken', 'Dog', 'Domestic Bactrian camel', 'Domestic canary', 'Domestic dromedary camel', 'Domestic duck', 'Domestic goat', 'Domestic goose', 'Domestic guineafowl', 'Domestic hedgehog', 'Domestic pig', 'Domestic pigeon', 'Domestic rabbit', 'Domestic silkmoth', 'Domestic silver fox', 'Domestic turkey', 'Donkey', 'Fancy mouse', 'Fancy rat', 'Lab rat', 'Ferret', 'Gayal', 'Goldfish', 'Guinea pig', 'Guppy', 'Horse', 'Koi', 'Llama', 'Ringneck dove', 'Sheep', 'Siamese fighting fish', 'Society finch', 'Yak', 'Water buffalo']


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
			color: "red",
			selectedAnnotation: null,
			showAllAnnotation: true,
			annotationsByName: null,
			currentAnnotationName: "",
			hasError: false,
			hide:false
		}
		this.createAnnotation = this.createAnnotation.bind(this);
		this.addCollabName = this.addCollabName.bind(this);
		this.finishAnnotation = this.finishAnnotation.bind(this);
		this.setColor = this.setColor.bind(this);
		this.selectAnnotation = this.selectAnnotation.bind(this);
		this.imageAnnotation = this.imageAnnotation.bind(this);
		this.showAnnotationsByName = this.showAnnotationsByName.bind(this);
	}

	componentDidCatch(error, info){
		this.setState({hasError: true});
	}

	resize() {
		if (this.state.hide || window.innerWidth <= 760) {
			this.setState({hide: true});
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
		if(window.innerWidth<=760){
			return;
		}

		$(window).scroll(function() {
			var winScrollTop = $(window).scrollTop();
			var winHeight = $(window).height();
			var floaterHeight = $('#create').outerHeight(true);
			var fromBottom = 20;
			var top = winScrollTop + winHeight - floaterHeight - fromBottom;
			$('#create').css({'top': top + 'px'});
			$('#colorPanel').css({'top': top-180 + 'px'});
			
		});
		$(window).trigger("scroll", "1px");
		$("#red").addClass("selected");

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
		let name = this.randomAnimal()
		this.setState({collabName: "Anonymous " + name});
	}

	addCollabName(name) {
		this.setState({
			collabName: name,
			nameSet: true
		})
	}

	setColor(c) {
		$(".color.selected").removeClass("selected");
		$("#"+c).addClass("selected");
		this.setState({ color: c });
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
			rangy.removeOverlay(selected, selected.color);
			rangy.addOverlay(annotation);
			
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
					new_highlight = $("#"+annotation.range).offset().top;
				}
				var str = $("#"+annotation.id).css("top");
				$(".annotation").css("top", 0);
				var original = $("#"+annotation.id).offset().top;
				$(".annotation").css("top", str);
				animation_move = new_highlight - original;
			}
		}else{
			if(annotation.type === "text"){
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
		$(".annotation").stop().animate({"top": animation_move+"px"}, {
			duration: 500,
			easing: "linear",
			step: () => {
				this.setState({annotations: this.state.annotations.map(a => ({ ...a, animated: !a.animated}))});
			}
		});
	}

	showAnnotationsByName = e =>{
		let nameAnnotations = []
		console.log(this.state.annotations)
		this.state.annotations.forEach((a) => {
			if(e.target.id == a.name){
				nameAnnotations.push(a)
			}
		});
		if(this.state.showAllAnnotation){
			e.target.style.backgroundColor = "#72bcd4"
			this.setState({
				annotationsByName: nameAnnotations,
				showAllAnnotation: false,
				currentAnnotationName: e.target.id
				})
		}else if(!this.state.showAllAnnotation && e.target.id == this.state.currentAnnotationName ){
			e.target.style.backgroundColor = '#add8e6'
			this.setState({
				showAllAnnotation: true,
				currentAnnotationName: ""
			})
		}
		
	}

	getDate(){
		let date = new Date();
		let dateTime = date.toLocaleString();
		return dateTime;
	}

	randomAnimal(){
		let animalsLength = animalList.length
		let animal = ''
		if(this.collaborators != null){
			let CollabNames = Object.keys(this.state.collaborators);
			let finish = false;
			while(!finish){
				let index = Math.floor(Math.random() * animalsLength);
				animal = animalList[index];
				if(!CollabNames.includes(animal)){
					finish = true;
				}
			}
			return animal;
		}else{
			let index = Math.floor(Math.random() * animalsLength);
			animal = animalList[index];
			return animal;
		}
	}

	render() {
		
		if(this.state.hasError){
			return <ErrorPage/>
		}

		var nameAnnotations = this.state.showAllAnnotation ?
			<AnnotationList
				workspace={this.state.workspace}
				annotations={this.state.annotations}
				selectAnnotation={this.selectAnnotation}
			/> :
			<AnnotationList
				workspace={this.state.workspace}
				annotations={this.state.annotationsByName}
				selectAnnotation={this.selectAnnotation}
			/>

		var pendingAnnotation = this.state.pendingAnnotation ?
			<PendingAnnotation
				name={this.state.collabName}
				id={uuidv4()}
				finishAnnotation={this.finishAnnotation}
				color={this.state.color}
				range={this.state.pendingRange}
				type ={this.state.pendingType}
			/> : null;
		if (window.innerWidth < 760) return (<ScreenSizeWarning />);
		else return (
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
						
						<Collaborators
							collaborators={this.state.collaborators}
							showByName={this.showAnnotationsByName}
						/>
						<div id="annotationSection">
							{nameAnnotations}
							{pendingAnnotation}
						</div>
					</Col>
				</Row>
				<CreateButton
					createAnnotation={this.createAnnotation}
				/>
				<ColorSelection
					onClick={this.setColor}
				/>
			</Container>
			
		)
	}
}

export default Workspace