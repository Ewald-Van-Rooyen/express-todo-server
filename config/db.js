const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/express-todo";

mongoose.connect(DB_URL,{useNewUrlParser:true},()=>{
	console.log("BOi is connected");
});