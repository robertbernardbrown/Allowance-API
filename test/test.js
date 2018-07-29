const db = require("../api/models");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('API tests', () => {

  // before hook to drop and make tables before tests run
  before((done) => {
    db.sequelize.sync({force : true})
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  });

  //========TEST SUITE ONE = USER MODEL========
  describe('User model', () => {

    describe('GET user', () => {
      it('it should GET a user based on their Id', (done) => {
          chai.request(server)
              .get('/api/users/1')
              .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.message.should.include("We can\'t find your information!");
                done();
              });
      });
    });

    describe('POST user', () => {
      it('it should POST a new user to the /register route', (done) => {
      let userInfo = {
          userName: "Billybob",
          userEmail: "billybob@gmail.com",
          userPassword: "billybob123"
      }
      chai.request(server)
          .post('/api/register')
          .send(userInfo)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.include('User created!');
            done();
          });
      });

      it('it should not POST a new user with incomplete data on /register route', (done) => {
      let userInfo = {
          userEmail: "billybob123@gmail.com",
          userPassword: "billybob123"
      }
      chai.request(server)
          .post('/api/register')
          .send(userInfo)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('error');
            res.body.message.should.include("There was an error processing your information");
            res.body.error.should.have.property("name");
            res.body.error.name.should.include("SequelizeValidationError");
            res.body.error.should.have.property("errors");
            res.body.error.errors.should.have.an("array");
            res.body.error.errors[0].message.should.include("User.userName cannot be null");
            done();
          });
      });

      it('it should not POST a new user with duplicate email as another user on /register route', (done) => {
      let userInfo = {
        userName: "Billybob2",
        userEmail: "billybob@gmail.com",
        userPassword: "billybob123"
      }
      chai.request(server)
          .post('/api/register')
          .send(userInfo)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.include("User exists already with that email!");
            done();
          });
      });
    });
  });

  //========TEST SUITE TWO = Budget MODEL========
  describe('Budget model', () => {

    describe('GET budget', () => {
      it('it should return an confirmation that no budgets exist if no budgets exist', (done) => {
        chai.request(server)
            .get('/api/budgets/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('message');
              res.body.message.should.include("You have no budgets to display yet");
              done();
            });
      });
    });

    describe('POST budget', () => {
      it('it should return an error message if budgetMonth is missing', (done) => {
      const budget = {
        budget: 200,
        userId: 1
      }
      chai.request(server)
        .post('/api/budgets/1')
        .send(budget)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("Something went wrong posting that budget!");
          res.body.should.have.property('error');
          res.body.error.should.be.an('object');
          res.body.error.name.should.include('SequelizeValidationError');
          res.body.error.errors[0].message.should.include('Budget.budgetMonth cannot be null');
          done();
        });
      });

      it('it should POST a budget with valid data', (done) => {
        const budget = {
          budget: 200,
          budgetMonth: 1,
          userId: 1
        }
        chai.request(server)
          .post('/api/budgets/1')
          .send(budget)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.include("Posted new budget!");
            res.body.should.have.property('budget');
            res.body.budget.should.be.an('object');
            res.body.budget.should.have.property('id');
            res.body.budget.should.have.property('budget');
            res.body.budget.should.have.property('budgetMonth');
            res.body.budget.should.have.property('userId');
            res.body.budget.budget.should.be.a("number");
            res.body.budget.budgetMonth.should.be.a('number');
            res.body.budget.id.should.be.a('number');
            res.body.budget.userId.should.be.a('string');
            done();
          });
        });
    });

    describe('PUT budget', () => {
      it("it should return a message if a PUT is sent to a month that doesn't exist yet", (done) => {
      const budget = {
        budget: 200,
        budgetMonth: 2,
        userId: 1
      }
      chai.request(server)
        .put('/api/budgets/1')
        .send(budget)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("You don't seem to have a budget to update there yet!");
          done();
        });
      });

      it("it should return an confirmation message if a PUT message succeeds", (done) => {
      const budget = {
        budget: 500,
        budgetMonth: 1,
        userId: 1
      }
      chai.request(server)
        .put('/api/budgets/1')
        .send(budget)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("Updated budget!");
          res.body.should.have.property('budget');
          res.body.budget.should.be.an('array').that.includes(1)
          done();
        });
      });
    });

    describe('DELETE budget', () => {

      it("it should return a message if a DELETE is sent to a month that doesn't exist yet", (done) => {
      const budget = {
        budgetMonth: 2,
        userId: 1
      }
      chai.request(server)
        .delete('/api/budgets/1')
        .send(budget)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("You don't have a budget there to delete!");
          done();
        });
      });

      it("it should return a message if a DELETE is successful", (done) => {
      const budget = {
        budgetMonth: 1,
        userId: 1
      }
      chai.request(server)
        .delete('/api/budgets/1')
        .send(budget)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("Budget deleted!");
          res.body.should.have.property('result');
          res.body.result.should.be.a("number");
          res.body.result.should.equal(1);
          done();
        });
      });
    });
  }); 

  //========TEST SUITE THREE = Transaction MODEL========
  describe('Transaction model', () => {

    describe('GET transaction', () => {
      it('it should return an confirmation that no budgets exist if no budgets exist', (done) => {
        chai.request(server)
            .get('/api/budgets/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('message');
              res.body.message.should.include("You have no budgets to display yet");
              done();
            });
      });
    });

    describe('POST transaction', () => {

    });

    describe('PUT transaction', () => {

    });

    describe('DELETE transaction', () => {


    });
  });

  //after hook to drop tables after run
  after((done) => {
    db.sequelize.sync({force : true})
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });       
  });

});