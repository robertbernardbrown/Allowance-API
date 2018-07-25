const db = require("../api/models");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {

    before(function() {
        db.User.sync({ force : true })
          .then(function(res) {
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });       
    });

  /*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET a user based on their id', (done) => {
        chai.request(server)
            .get('/api/users/1')
            .end((err, res) => {
              console.log(res)
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.message.should.include("We can\'t find your information!");
              done();
            });
      });
  });

});