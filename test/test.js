const db = require("../api/models");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const LoginController = require("../api/controllers/login");
let token;
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
      it("it should fail to GET user info without successful auth", (done) => {
          chai.request(server)
              .get('/api/users/1')
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.message.should.include("Auth failed");
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
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.include("User exists already with that email!");
            done();
          });
      });
    });

    describe("POST login", () => {
      it("it should fail to /login with invalid credentials", (done) => {
      let loginInfo = {
        userEmail: "test@test.com",
        userPassword: "test"
      }
      chai.request(server)
          .post("/api/login")
          .send(loginInfo)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.include("Auth failed");
            done();
          })
      })

      it("it should succeed and login a user to /login with valid credentials", (done) => {
        let loginInfo = {
          userEmail: "billybob@gmail.com",
          userPassword: "billybob123"
        }
        chai.request(server)
            .post("/api/login")
            .send(loginInfo)
            .end((err, res) => {
              console.log(res);
              token = res.body.token;
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.include("Auth successful");
              res.body.should.have.property('token');
              done();
            })
        })
    })
  });

  //========TEST SUITE TWO = Budget MODEL========
  describe('Budget model', () => {

    describe('GET budget', () => {
      it('it should return an confirmation that no budgets exist if no budgets exist', (done) => {
        chai.request(server)
            .get('/api/budgets/1')
            .set("Authorization", "Bearer " + token)
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
      it('it should return an error message if budgetDate is missing', (done) => {
      const budget = {
        budget: 200,
        userId: 1
      }
      chai.request(server)
        .post('/api/budgets/1')
        .send(budget)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("Something went wrong posting that budget!");
          res.body.should.have.property('error');
          res.body.error.should.be.an('object');
          res.body.error.name.should.include('SequelizeValidationError');
          res.body.error.errors[0].message.should.include('Budget.budgetDate cannot be null');
          done();
        });
      });

      it('it should POST a budget with valid data', (done) => {
        const budget = {
          budget: 200,
          budgetDate: new Date(2018, 1),
          userId: 1
        }
        chai.request(server)
          .post('/api/budgets/1')
          .send(budget)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.include("Posted new budget!");
            res.body.should.have.property('budget');
            res.body.budget.should.be.an('object');
            res.body.budget.should.have.property('id');
            res.body.budget.should.have.property('budget');
            res.body.budget.should.have.property('budgetDate');
            res.body.budget.should.have.property('userId');
            res.body.budget.budget.should.be.a("number");
            res.body.budget.budgetDate.should.be.a('string');
            res.body.budget.budgetDate.should.include('2018-02-01');
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
        budgetDate: new Date(2018, 2),
        userId: 1
      }
      chai.request(server)
        .put('/api/budgets/1')
        .send(budget)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("You don't seem to have a budget to update there yet!");
          done();
        });
      });

      it("it should return a confirmation message if a PUT message succeeds", (done) => {
      const budget = {
        budget: 500,
        budgetDate: new Date(2018, 1),
        userId: 1
      }
      chai.request(server)
        .put('/api/budgets/1')
        .send(budget)
        .set("Authorization", "Bearer " + token)
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
        budgetDate: new Date(2018, 2),
        userId: 1
      }
      chai.request(server)
        .delete('/api/budgets/1')
        .send(budget)
        .set("Authorization", "Bearer " + token)
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
        budgetDate: new Date(2018, 1),
        userId: 1
      }
      chai.request(server)
        .delete('/api/budgets/1')
        .send(budget)
        .set("Authorization", "Bearer " + token)
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

    // post to Budget table before testing transation routes
    before((done) => {
      const budget = {
        budget: 200,
        budgetDate: new Date(2018, 1),
        userId: 1
      }
      db.Budget
      .create(budget)
        .then((result) => {
          done();
        })
        .catch(() => {
          done();
        });
    });

    describe('GET transaction without budget', () => {
      it('it should return no transactions with accompanying message that there are no budgets', (done) => {
        chai.request(server)
            .get('/api/transactions/1')
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('message');
              res.body.message.should.include('You have no transactions to display yet');
              done();
            });
      });
    });

    describe('POST transaction', () => {
      it('it should fail posting a new transaction without all required information', (done) => {
      const transaction = {
        transactionType: "subtract",
        transactionAmount: 50,
        transactionDate: new Date(2018, 1)
      }
      chai.request(server)
          .post('/api/transactions/1')
          .send(transaction)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.include("Something went wrong posting that transaction!");
            res.body.should.have.property('error');
            res.body.error.should.have.property("name");
            res.body.error.name.should.include("SequelizeValidationError");
            res.body.error.should.have.property("errors");
            res.body.error.errors[0].message.should.include("Transaction.transactionReceipt cannot be null");
            done();
          });
      });

      it('it should succeed posting a new transaction with all required information', (done) => {
      const transaction = {
        transactionType: "subtract",
        transactionAmount: 50,
        transactionReceipt: "groceries",
        transactionDate: new Date(2018, 1)
      }
      chai.request(server)
        .post('/api/transactions/1')
        .send(transaction)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("Posted new transaction!");
          res.body.should.have.property('budget');
          res.body.budget.should.be.an("object");
          res.body.budget.should.have.property("id");
          res.body.budget.id.should.equal(1);
          res.body.budget.should.have.property("transactionType");
          res.body.budget.transactionType.should.include("subtract");
          res.body.budget.should.have.property("transactionAmount");
          res.body.budget.transactionAmount.should.equal(50);
          res.body.budget.should.have.property("transactionReceipt");
          res.body.budget.transactionReceipt.should.include("groceries");
          res.body.budget.should.have.property("transactionDate");
          res.body.budget.transactionDate.should.equal("2018-02-01");
          res.body.budget.should.have.property("userId");
          res.body.budget.userId.should.include("1");
          done();
        });
      });
    });

    describe('GET transaction with budget', () => {
      it('it should return all existing transactions', (done) => {
        chai.request(server)
        .get('/api/transactions/1')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include('Here are your transactions: ');
          res.body.should.have.property('result');
          res.body.result.should.be.an('array');
          res.body.result[0].should.have.property("id");
          res.body.result[0].id.should.equal(1);
          res.body.result[0].should.have.property("transactionType");
          res.body.result[0].transactionType.should.include("subtract");
          res.body.result[0].should.have.property("transactionAmount");
          res.body.result[0].transactionAmount.should.equal(50);
          res.body.result[0].should.have.property("transactionReceipt");
          res.body.result[0].transactionReceipt.should.include("groceries");
          res.body.result[0].should.have.property("transactionDate");
          res.body.result[0].transactionDate.should.equal("2018-02-01");
          res.body.result[0].should.have.property("userId");
          res.body.result[0].userId.should.equal(1);
          done();
        });
      });
    });

    describe('GET specific transaction', () => {

      it('it should return transactions meeting a specific criteria', (done) => {
        chai.request(server)
        .get('/api/transactions/1/transactionType=subtract')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include('Here are your transactions: ');
          res.body.should.have.property('result');
          res.body.result.should.be.an('array');
          res.body.result[0].should.have.property("id");
          res.body.result[0].id.should.equal(1);
          res.body.result[0].should.have.property("transactionType");
          res.body.result[0].transactionType.should.include("subtract");
          res.body.result[0].should.have.property("transactionAmount");
          res.body.result[0].transactionAmount.should.equal(50);
          res.body.result[0].should.have.property("transactionReceipt");
          res.body.result[0].transactionReceipt.should.include("groceries");
          res.body.result[0].should.have.property("transactionDate");
          res.body.result[0].transactionDate.should.equal("2018-02-01");
          res.body.result[0].should.have.property("userId");
          res.body.result[0].userId.should.equal(1);
          done();
        });
      });

      it('it should return message without transaction if search unsuccessful', (done) => {
        chai.request(server)
        .get('/api/transactions/1/transactionType=add')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include('You have no transactions to display yet');
          res.body.should.have.property('result');
          done();
        });
      });
    });

    

    describe('PUT transaction', () => {

      it('it should fail at updating a transaction with missing info in PUT request', (done) => {
        const newTransaction = {
          transactionType: "subtract",
          transactionAmount: 50,
          transactionReceipt: "groceries",
          transactionDate: new Date(2018, 1)
        }
        chai.request(server)
        .put('/api/transactions/1')
        .send(newTransaction)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("We couldn\'t find a transaction to update there");
          res.body.should.have.property('result');
          done();
        });
      });

      it('it should succeed updating a transaction with full info PUT request', (done) => {
        const newTransaction = {
          id: 1,
          transactionType: "add",
          transactionAmount: 50,
          transactionReceipt: "groceries",
          transactionDate: new Date(2018, 1),
          userId: 1
        }
        chai.request(server)
        .put('/api/transactions/1')
        .send(newTransaction)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include('Transaction updated!');
          res.body.should.have.property('result');
          res.body.result.should.be.an('array');
          res.body.result[0].should.equal(1);
          done();
        });
      });
    });

    describe('DELETE transaction', () => {

      it('it should fail at deleting a transaction with incorrect target on DELETE request', (done) => {
        const delTransaction = {
          id: 3
        }
        chai.request(server)
        .delete('/api/transactions/1')
        .send(delTransaction)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("We couldn\'t find a transaction to delete there");
          res.body.should.have.property('result');
          res.body.result.should.equal(0)
          done();
        });
      });

      it('it should succeed at deleting a transaction with correct target on DELETE request', (done) => {
        const delTransaction = {
          id: 1
        }
        chai.request(server)
        .delete('/api/transactions/1')
        .send(delTransaction)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.include("Deleted transaction!");
          res.body.should.have.property('result');
          res.body.result.should.equal(1)
          done();
        });
      });
    });
  });

  //========TEST SUITE FOUR = Balances MODEL========
  // describe('Balance model', () => {
  //   describe('GET balance', () => {

  //     it('it should fail at GETting a balance with incomplete information', (done) => {
        
  //       });
  //     });
  //   });


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