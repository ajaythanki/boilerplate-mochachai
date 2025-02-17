const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  // this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function(done) {
      // Don't forget the callback...
      chai
        .request(server) // 'server' is the Express App
        .get('/hello?name=x_yz') /** <=== Put your name in the query **/
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello x_yz' /** <==  Put your name here **/);
          done(); // Always call the 'done()' callback when finished.
        });
    });
    // // #3
    test('send {surname: "Colombo"}', function(done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function(err, res) {
          /** your tests here **/
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(
            res.body.name,
            'Cristoforo',
            'res.body.name should be "Christoforo"'
          );
          assert.equal(
            res.body.surname,
            'Colombo',
            'res.body.surname should be "Colombo"'
          );
    
          done(); // Never forget the 'done()' callback...
        });
    });
    // // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function(err, res) {
          /** your tests here **/
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(
            res.body.name,
            'Giovanni',
            'res.body.name should be "Giovanni"'
          );
          assert.equal(
            res.body.surname,
            'da Verrazzano',
            'res.body.surname should be "da Verrazzano"'
          );
    
          done(); // Never forget the 'done()' callback...
        });
    });
  });
});

const Browser = require('zombie');
// Browser.site = 'https://ajaythanki-organic-space-meme-q9r4x4ppww7hx557-3000.preview.app.github.dev';
// Browser.site = 'https://boilerplate-mochachai.akthanki.repl.co';
Browser.site = 'http://0.0.0.0:3000';

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser();
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname','Colombo').then(() => {
      browser.pressButton('submit',() => {
        browser.assert.success();
        browser.assert.text('span#name','Cristoforo');
        browser.assert.text('span#surname','Colombo');
        browser.assert.elements('span#dates',1);
      done();
      });
      });

    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname','Vespucci').then(() => {
      browser.pressButton('submit',() => {
        browser.assert.success();
        browser.assert.text('span#name','Amerigo');
        browser.assert.text('span#surname','Vespucci');
        browser.assert.elements('span#dates',1);
      done();
      });
      });
    });
  });
});