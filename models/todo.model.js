const mongoose = require("mongoose");

let TodoSchema = mongoose.Schema({
	title:{
		type:String
	},
	description:{
		type:String
	},
	isCompleted: {
		type:Boolean
	}
});

module.exports = mongoose.model("Todo",TodoSchema);