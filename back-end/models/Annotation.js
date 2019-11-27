const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let Annotation = new Schema({

	// URL TO THE WORKSPACE
	workspace:{
		type: String
	},

	key:{
		type: String
	},

	id: {
		type: String
	},

	// NAME OF CONTRIBUTOR
	name: {
		type: String
	},

	// TIME OF CREATION
	date: {
		type: String
	},

	// CONTENT OF ANNOTATION
	content: {
		type: String
	},

	range: {
		type: Object
	},

	color:{
		type: String
	},
	
	type:{
		type: String
	}

	// LOCATION OF ANNOTATION
	/* 
	location:{
		 type ?
	}
	*/

})


module.exports = mongoose.model('Annotation', Annotation);