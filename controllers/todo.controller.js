const Todo = require('../models/todo.model');

	function getTodos(request,result){
		Todo.find({}, function (err, todo) {
			result.setHeader('Content-Type', 'application/json');
	        result.sendStatus(todo);
	    });
	}

	function createTodo(request,result){
		let todo = new Todo(
	        {
	            title: request.body.name,
	            description: request.body.description,
	            isCompleted: request.body.isCompleted
	        });
	            
	    todo.save((error)=> {
	     	if (error) console.log(error);
	      	result.send(200);
	    	});
		}

	function updateTodo(request,result){

		console.log(request.params.id);

	    Todo.findOneAndUpdate(request.params.id, {$set: request.body},(error, product) => {
	     	if (error) console.log(error);
	      	 result.send(200);
	    	});
		}

	function deleteTodo(request,result){

		console.log(request.params.id);

	    Todo.findOneAndDelete(request.params.id,(error, product) => {
	     	if (error) console.log(error);
	      	 result.send(200);
	    	});
		}		

module.exports = {
	getTodos:getTodos,
	createTodo:createTodo,
	updateTodo:updateTodo,
	deleteTodo:deleteTodo
}
