const Todo = require('../models/todo.model');
const express = require("express");

	function getTodos(request,result){
		Todo.find({}, function (error, todos) {
			if (error) return result.status(500).send(error);
					result.setHeader('Content-Type', 'application/json');
	        result.send(todos);
	    });
	}

	function createTodo(request,result,next){
		let todo = new Todo(
	        {
	            title: request.body.title,
	            description: request.body.description,
	            isCompleted: request.body.isCompleted
	        });

	    todo.save((error)=> {
	     if (error) return result.status(500).send(error);
	      	result.sendStatus(200);
	    	});
		}

	function updateTodo(request,result,next){

	    Todo.findOneAndUpdate(request.params.id, {$set: request.body},(error) => {
			     if (error) return result.status(500).send(error);
	      	 	result.sendStatus(200);
	    	});
		}

	function deleteTodo(request,result,next){

	    Todo.findOneAndDelete(request.params.id,(error) => {
	     	 	if (error) return result.status(500).send(error);
	      	result.sendStatus(200);
	    	});
		}

module.exports = {
	getTodos:getTodos,
	createTodo:createTodo,
	updateTodo:updateTodo,
	deleteTodo:deleteTodo
}
