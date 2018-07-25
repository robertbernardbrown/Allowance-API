const db = require("../api/models");

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Users', () => {

    before((done) => {
        db.sequelize.sync({force : true})
          .then(() => {
            done();
          })
          .catch(() => {
            done();
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
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.message.should.include("We can\'t find your information!");
              done();
            });
      });
  });

});