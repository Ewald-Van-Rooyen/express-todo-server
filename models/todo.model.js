const mongoose = require("mongoose");

let TodoSchema = mongoose.Schema({
	title:{
		type:String,
		required: [true, 'YOU need da TITLES']
	},
	description:{
		type:String
	},
	isCompleted: {
		type:Boolean
	}
});

module.exports = mongoose.model("Todo",TodoSchema);