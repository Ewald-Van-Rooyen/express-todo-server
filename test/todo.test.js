const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const mLog =  require("mocha-logger");

const Todo = require('../models/todo.model');
const server = require('../app');
const should = chai.should();


chai.use(chaiHttp);

describe('Todo CRUD tests', () => {
    beforeEach((done) => { //Before each test we empty the database
        Todo.deleteMany({}, (err) => {
           done();
        });
    });

      it('Should GET all the todos', (done) => {
        chai.request(server)
            .get('/todo')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });

  it('Should POST a todo ', (done) => {
          let todo = {
              title: "The Lord of the Rings",
              description: "J.R.R. Tolkien",
              isCompleted: false
          };

        chai.request(server)
            .post('/todo')
            .send(todo)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });

    it('Should NOT POST a todo (Post does not contain title) ', (done) => {
          let todo = {
              description: "The Lord of the Rings",
              isCompleted: false
          };

        chai.request(server)
            .post('/todo')
            .send(todo)
            .end((err, res) => {
                  res.should.have.status(500);
              done();
            });
      });

      it('Should PUT todo', (done) => {
              let todo = {
                  title: "The Lord of the Ring",
                  description: "J.R.R. Tolkien",
                  isCompleted: false
              };

              let alteredTodo = {
                  title: "The Lord of the RingZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",
                  description: "J.R.R. TolkienZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",
                  isCompleted: false
              };
              let _id = "";

              chai.request(server)
                  .post('/todo')
                  .send(todo)
                  .end((err, res) => {
                    chai.request(server)
                        .get('/todo')
                        .end((err, res) => {
                              _id = res.body[0]["_id"];
                              console.log(_id);
                              chai.request(server)
                                  .put('/todo?id='+_id)
                                  .send(alteredTodo)
                                  .end((err, res) => {
                                        res.should.have.status(200);
                                    done();
                                  });

                        });
                  });
          });

          it('Should DELETE todo', (done) => {
            let todo = {
                title: "The Lord of the Ring",
                description: "J.R.R. Tolkien",
                isCompleted: false
            };
                  let _id = "";
                  chai.request(server)
                      .post('/todo')
                      .send(todo)
                      .end((err, res) => {
                        chai.request(server)
                            .get('/todo')
                            .end((err, res) => {
                                  _id = res.body[0]["_id"];
                                  chai.request(server)
                                      .delete('/todo?id='+_id)
                                      .end((err, res) => {
                                            res.should.have.status(200);
                                        done();
                                      });
                            });
                      });
              });

});
