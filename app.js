const express = require("express");
const bodyParser = require("body-parser");

require('./config/db');

const product = require('./routes/todo.routes');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', product);

app.listen(PORT,()=>{
	console.log("BoI I serve dem todos");
});